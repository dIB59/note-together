use actix_web::{web, HttpRequest, HttpResponse, Error};
use actix_web_actors::ws;
use sqlx::AnyPool;
use crate::notes::ws::NoteSession;


pub fn init(cfg: &mut web::ServiceConfig) {
    cfg.route("/{id}/ws", web::get().to(ws_route));
}

async fn ws_route(
    req: HttpRequest,
    stream: web::Payload,
    pool: web::Data<AnyPool>,
    path: web::Path<String>,
) -> Result<HttpResponse, Error> {
    let id = path.into_inner();
    let session = NoteSession::new(id, pool.get_ref().clone());
    ws::start(session, &req, stream)
}