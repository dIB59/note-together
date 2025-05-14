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

#[cfg(test)]
mod tests {

    use crate::infra;
    use super::*;
    use actix_web::test;
    use actix_ws::Message;
    use futures_util::SinkExt;
    use awc::{ws::Frame, Client};
    

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

    #[actix_rt::test]
    async fn test_ws_ping_pong() {
        let pool = infra::db::get_test_pool().await;

        tokio::spawn(async move {
            HttpServer::new(move || {
                App::new()
                    .app_data(web::Data::new(pool.clone()))
                    .route("/test/ws", web::get().to(echo))
            })
            .bind("127.0.0.1:8081")
            .expect("Failed to bind server")
            .run()
            .await
            .expect("Failed to run server");
        });

        println!("Server running at http://localhost:8081");

        let (response, mut connection) = Client::new()
            .ws("http://localhost:8081/test/ws")
            .connect()
            .await
            .expect("Failed to connect");

        assert_eq!(response.status(), 101);

        let message = Message::Ping("ping".into());
        connection
            .send(message)
            .await
            .unwrap();

        let response = connection
            .next()
            .await
            .expect("Failed to receive message")
            .expect("Failed to receive message");

        println!("Response: {:?}", response);

        match response {
            Frame::Pong(pong) => {
                assert_eq!(pong, "ping");
            }
            _ => panic!("Expected PONG frame"),
        }

    }
}