use actix_web::{web, App, HttpServer};
use config::Config;

mod db;


#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let settings = db::load_settings();
    let db_url = settings.database.url;

    let pool = sqlx::SqlitePool::connect(&db_url)
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

