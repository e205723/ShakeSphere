CREATE TABLE users (
    id SERIAL NOT NULL PRIMARY KEY,
    name CHARACTER(255) NOT NULL UNIQUE,
    password CHARACTER(255) NOT NULL,
    next_destination_id INT NOT NULL DEFAULT 1
);

CREATE TABLE destinations (
    id SERIAL NOT NULL PRIMARY KEY,
    name CHARACTER(255) NOT NULL,
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    hint_image_file_path CHARACTER(255) NOT NULL,
    panorama_image_file_path CHARACTER(255) NOT NULL,
    puzzle_id INT NOT NULL
);

CREATE TABLE puzzles (
    id SERIAL NOT NULL PRIMARY KEY,
    question CHARACTER(255) NOT NULL,
    question_image_path CHARACTER(255) NOT NULL,
    answer CHARACTER(255) NOT NULL
);
