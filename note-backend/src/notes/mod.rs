use actix_web::{rt, web, App, Error, HttpRequest, HttpResponse, HttpServer};
use actix_ws::AggregatedMessage;
use futures_util::StreamExt as _;

pub mod ws;

async fn echo(req: HttpRequest, stream: web::Payload) -> Result<HttpResponse, Error> {
    let (res, mut session, stream) = actix_ws::handle(&req, stream)?;

    let mut stream = stream
        .aggregate_continuations()
        // aggregate continuation frames up to 1MiB
        .max_continuation_size(2_usize.pow(20));

    // start task but don't wait for it
    rt::spawn(async move {
        // receive messages from websocket
        while let Some(msg) = stream.next().await {
            match msg {
                Ok(AggregatedMessage::Text(text)) => {
                    // echo text message
                    session.text(text).await.unwrap();
                }

                Ok(AggregatedMessage::Binary(bin)) => {
                    // echo binary message
                    session.binary(bin).await.unwrap();
                }

                Ok(AggregatedMessage::Ping(msg)) => {
                    // respond to PING frame with PONG frame
                    session.pong(&msg).await.unwrap();
                }

                _ => {}
            }
        }
    });

    // respond immediately with response connected to WS session
    Ok(res)
}

mod tests {
    use std::f64::consts::E;

    use crate::infra;

    use super::*;
    use actix_web::test;
    use sqlx::any::{install_default_drivers, AnyPoolOptions};

    #[actix_rt::test]
    async fn test_ws_route() {
        let pool = infra::db::get_test_pool().await;

        let app = test::init_service(
            App::new()
                .app_data(web::Data::new(pool))
                .route("/{id}/ws", web::get().to(echo)),
        )
        .await;

        let req = test::TestRequest::get()
            .uri("/test/ws")
            // add webscoket upgrade headers
            .append_header(("Connection", "Upgrade"))
            .append_header(("Upgrade", "websocket"))
            .append_header(("Sec-WebSocket-Version", "13"))
            .append_header(("Sec-WebSocket-Key", "test_key"))
            .to_request();

        let resp = test::call_service(&app, req).await;

        println!("Response: {:?}", resp);
        assert!(resp.status().is_informational());
    }
}