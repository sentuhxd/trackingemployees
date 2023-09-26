USE trackingemployees_db;

INSERT INTO departments (NAME)
VALUES
    ("Engineering"),
    ("Sales"),
    ("Legal"),
    ('Finance');

INSERT INTO roles (title, salary, department_id)
VALUES
    ("Lead Sales", 150000, 2), 
    ("Associate Sales", 90000, 2), 
    ("Lead Engineer", 250000, 1), 
    ("Engineer", 175000, 1), 
    ("Accountant", 200000, 4),
    ("Head Accountant", 300000, 4), 
    ("Head Lawyer", 500000, 3), 
    ("Associate Lawyer", 215000, 3);

INSERT INTO employees (first_name, last_name, role_id)
VALUES
    ("Ian", "Rosey", 1),
    ("Cool", "Person", 4),
    ("Rinse", "Repeat", 2),
    ("Ben", "Wright", 3),
    ("Life", "Isgreat", 5),
    ("Wink", "Yface", 6),
    ("Rice", "Famer", 7);