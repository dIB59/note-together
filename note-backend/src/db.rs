use config::Config;
use serde::Deserialize;

#[derive(Debug, Deserialize)]
pub struct Settings {
    pub database: DatabaseSettings,
}

#[derive(Debug, Deserialize)]
pub struct DatabaseSettings {
    pub url: String,
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
