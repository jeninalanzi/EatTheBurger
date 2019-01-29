-- Initiation of "burgers_db" database and table.
CREATE DATABASE burgers_db;

-- Makes it so that all following code affects this db only.
USE burgers_db;

-- Creates the table "burgers" within db and its properties.
CREATE TABLE burgers (
    id INTEGER(4) AUTO_INCREMENT NOT NULL,
    burger_name VARCHAR(100),
    devoured BOOLEAN,
    PRIMARY KEY (id)
);