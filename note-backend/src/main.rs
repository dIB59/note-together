use actix_web::{web, App, HttpServer};
use infra::db;
use sqlx::any::install_default_drivers;


mod infra;
mod routes;
mod notes;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let settings = db::load_settings();
    let db_url = settings.expect("Failed to load settings").database.url;
    install_default_drivers();

    let pool = sqlx::AnyPool::connect(&db_url)
        .await
        .expect("Failed to create database connection pool");

    HttpServer::new(move || {
        App::new()
            .app_data(web::Data::new(pool.clone()))
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}

