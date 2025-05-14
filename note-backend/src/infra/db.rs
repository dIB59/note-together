use config::Config;
use serde::Deserialize;
use sqlx::{any::install_default_drivers, AnyPool, Row};
use yrs::{updates::decoder::Decode, Doc, Transact};

use thiserror::Error;

#[derive(Error, Debug)]
pub enum DbError {
    #[error("Database error: {0}")]
    Sqlx(#[from] sqlx::Error),

    #[error("Yrs (CRDT) error: {0}")]
    Yrs(#[from] yrs::error::Error),

    #[error("Decode error: {0}")]
    DecodeError(String),

    #[error("Configuration error: {0}")]
    ConfigError(#[from] config::ConfigError),

    #[error("Decode error: {0}")]
    Decode(#[from] yrs::encoding::read::Error),

    #[error("Update error: {0}")]
    Update(#[from] yrs::error::UpdateError),
}

#[derive(Debug, Deserialize)]
pub struct Settings {
    pub database: DatabaseSettings,
}

#[derive(Debug, Deserialize)]
pub struct DatabaseSettings {
    pub url: String,
}

pub fn load_settings() -> Result<Settings, DbError> {
    let settings = Config::builder()
        .add_source(config::File::with_name("config"))
        .add_source(config::File::with_name("config.production").required(false))
        .build()?
        .try_deserialize()?;

    Ok(settings)
}

pub async fn run_migrations(pool: &AnyPool) -> Result<(), DbError> {
    sqlx::migrate!().run(pool).await.expect("Failed to run migrations");
    Ok(())
}

pub async fn load_doc(pool: &AnyPool, id: &str) -> Result<Doc, DbError> {
    let row = sqlx::query("SELECT state FROM notes WHERE id = ?")
        .bind(id)
        .fetch_optional(pool)
        .await?;

    let doc = Doc::new();

    if let Some(row) = row {
        let binary: Vec<u8> = row.get("state");
        let update = yrs::Update::decode_v2(&binary)?;
        doc.transact_mut().apply_update(update)?;
    }

    Ok(doc)
}

pub async fn save_doc(pool: &AnyPool, doc: &Doc, id: &str) -> Result<(), DbError> {
    let update = doc.transact_mut().encode_update_v2();
    let binary = update.to_vec();

    sqlx::query(
        "INSERT INTO notes (id, state) VALUES (?, ?) ON CONFLICT(id) DO UPDATE SET state = ?",
    )
    .bind(id)
    .bind(&binary)
    .bind(&binary)
    .execute(pool)
    .await?;

    Ok(())
}

pub async fn get_test_pool() -> Result<AnyPool, DbError> {
    install_default_drivers();
    let pool = sqlx::any::AnyPoolOptions::new()
        .max_connections(1)
        .connect("sqlite::memory:")
        .await?;

    run_migrations(&pool).await?;
    Ok(pool)
}

#[cfg(test)]
mod tests {
    use super::*;
    use sqlx::any::{install_default_drivers, AnyPoolOptions};

    #[actix_rt::test]
    async fn test_load_settings() {
        let settings = load_settings().expect("Failed to load settings");
        assert_eq!(settings.database.url, "sqlite:./dev.db");
    }

    #[tokio::test]
    async fn test_anypool_with_migration() -> Result<(), DbError> {
        install_default_drivers();
        let pool = AnyPoolOptions::new()
            .max_connections(1)
            .connect("sqlite::memory:")
            .await?;

        run_migrations(&pool).await?;

        let doc = Doc::new();
        let id = "test_note";
        let binary = doc.transact_mut().encode_update_v2().to_vec();

        sqlx::query("INSERT INTO notes (id, state) VALUES (?, ?)")
            .bind(id)
            .bind(&binary)
            .execute(&pool)
            .await?;

        let loaded_doc = load_doc(&pool, id).await?;
        let loaded_binary = loaded_doc.transact_mut().encode_update_v2().to_vec();

        assert_eq!(binary, loaded_binary);
        Ok(())
    }
}