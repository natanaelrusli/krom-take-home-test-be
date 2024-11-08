-- Database: applicant_tracking_db

-- DROP DATABASE IF EXISTS applicant_tracking_db;

CREATE DATABASE applicant_tracking_db
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'C'
    LC_CTYPE = 'C'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

CREATE TABLE Location (
    id SERIAL PRIMARY KEY,
    location_name VARCHAR(100),
    created_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_time TIMESTAMP,
    deleted_time TIMESTAMP
);

CREATE TABLE Applicant (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    phone_number VARCHAR(15),
    location_id INT,
    profile_image VARCHAR,
    year_of_experience INT,
    created_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_time TIMESTAMP,
    updated_time TIMESTAMP,
    FOREIGN KEY (location_id) REFERENCES Location(id)
);

CREATE TABLE Role (
    id SERIAL PRIMARY KEY,
    role_name VARCHAR(100),
    created_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_time TIMESTAMP,
    updated_time TIMESTAMP
);

CREATE TABLE Application (
    id SERIAL PRIMARY KEY,
    applicants_id INT,
    role_id INT,
    resume_link VARCHAR(255),
    status VARCHAR(50),
    created_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_time TIMESTAMP,
    deleted_time TIMESTAMP,
    FOREIGN KEY (applicants_id) REFERENCES Applicant(id),
    FOREIGN KEY (role_id) REFERENCES Role(id)
);

