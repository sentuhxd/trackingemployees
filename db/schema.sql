DROP DATABASE IF EXISTS trackingemployees_db;
CREATE DATABASE trackingemployees_db;

USE trackingemployees_db;

CREATE TABLE departments (
    id INT NOT NULL AUTO_INCREMENT,
    NAME VARCHAR(50) NULL,
    PRIMARY KEY(id)
);

CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(50) NULL,
    salary DECIMAL(10.5)NULL,
    department_id INT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(100) NULL,
    last_name VARCHAR(100) NULL,
    role_id INT NULL,
    manager_id INT NULL,
    PRIMARY KEY (id)
);
