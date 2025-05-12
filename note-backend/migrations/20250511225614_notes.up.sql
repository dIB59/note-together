-- Add up migration script here
CREATE TABLE notes (
    id TEXT PRIMARY KEY,
    state BLOB NOT NULL
);