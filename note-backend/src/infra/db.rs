use config::Config;
use serde::Deserialize;
use sqlx::{AnyPool, Row};
use yrs::{updates::decoder::Decode, Doc, Transact};

#[derive(Debug, Deserialize)]
pub struct Settings {
    pub database: DatabaseSettings,
}

#[derive(Debug, Deserialize)]
pub struct DatabaseSettings {
    pub url: String,
}

pub trait IntoEntity<Entity> {
    fn into_entity(self) -> Entity;
}

pub trait MergeInto<Entity> {
    fn merge_into(self, entity: &mut Entity);
}

pub trait Repository<NewEntity, UpdateEntity, Entity>
where
    NewEntity: IntoEntity<Entity>,
    UpdateEntity: MergeInto<Entity>,
{
    fn create(&self, input: NewEntity) -> Entity {
        input.into_entity()
    }

    fn read(&self, id: i32) -> Option<Entity>;

    fn update(&self, id: i32, input: UpdateEntity) -> Option<Entity> {
        if let Some(mut entity) = self.read(id) {
            input.merge_into(&mut entity);
            Some(entity)
        } else {
            None
        }
    }

    fn delete(&self, id: i32) -> Result<(), String>;
}

pub fn load_settings() -> Settings {
    Config::builder()
        .add_source(config::File::with_name("config"))
        .add_source(config::File::with_name("config.production").required(false)) // override if exists
        .build()
        .expect("Failed to load config")
        .try_deserialize()
        .expect("Invalid config format")
}

pub async fn run_migrations(pool: &AnyPool) -> Result<(), sqlx::migrate::MigrateError> {
    sqlx::migrate!().run(pool).await
}

pub async fn load_doc(pool: &AnyPool, id: &str) -> Result<Doc, sqlx::Error> {
    let row = sqlx::query("SELECT state FROM notes WHERE id = ?")
        .bind(id)
        .fetch_optional(pool)
        .await?;

    let doc = Doc::new();
    if let Some(row) = row {
        let binary: Vec<u8> = row.get("state");
        let mut txn = doc.transact_mut();
        let update = yrs::Update::decode_v2(&binary).expect("Failed to decode update");
        txn.apply_update(update);
    }

    Ok(doc)
}

pub async fn save_doc(pool: &AnyPool, doc: &Doc, id: &str) -> Result<(), sqlx::Error> {
    let mut txn = doc.transact_mut();
    let update = txn.encode_update_v2();
    let binary = update.to_vec();

    sqlx::query("INSERT INTO notes (id, state) VALUES (?, ?) ON CONFLICT(id) DO UPDATE SET state = ?")
        .bind(id)
        .bind(&binary)
        .bind(&binary)
        .execute(pool)
        .await?;

    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;
    use sqlx::any::{install_default_drivers, AnyPoolOptions};

    #[actix_rt::test]
    async fn test_load_settings() {
        let settings = load_settings();
        assert_eq!(settings.database.url, "sqlite:./dev.db");
    }

    #[tokio::test]
    async fn test_anypool_with_migration() {
        install_default_drivers();
        // Connect to in-memory SQLite database using AnyPool
        let pool = AnyPoolOptions::new()
            .max_connections(1)
            .connect("sqlite::memory:")
            .await
            .expect("Failed to create database connection pool");

        run_migrations(&pool).await.expect("Failed to run migrations");
        
        // Create a new note
        let doc = Doc::new();
        let id = "test_note";
        let mut txn = doc.transact_mut();
        let update = txn.encode_update_v2();
        let binary = update.to_vec();
        sqlx::query("INSERT INTO notes (id, state) VALUES (?, ?)")
            .bind(id)
            .bind(&binary)
            .execute(&pool)
            .await
            .expect("Failed to insert note");
        // Load the note
        let loaded_doc = load_doc(&pool, id).await.expect("Failed to load document");
        let mut loaded_txn = loaded_doc.transact_mut();
        let loaded_update = loaded_txn.encode_update_v2();
        let loaded_binary = loaded_update.to_vec();
        assert_eq!(binary, loaded_binary);
    }


}
//