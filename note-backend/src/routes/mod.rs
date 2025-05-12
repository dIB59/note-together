use actix_web::web;

mod notes;

pub fn init(cfg: &mut web::ServiceConfig) {
    cfg.service(web::scope("/notes").configure(super::routes::notes::init));
}