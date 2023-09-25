USE trackingemployees_db;

INSERT INTO departments (NAME)
VALUES
    ("Engineering"),
    ("Sales"),
    ("Legal"),
    ('Finance');

INSERT INTO roles (title, salary, department_id)
VALUES
    ("Lead Sales", 100000, 2), 
    ("Associate Sales", 80000, 2), 
    ("Lead Engineer", 150000, 1), 
    ("Engineer", 120000, 1), 
    ("Accountant", 125000, 4), 
    ("Head Lawyer", 250000, 3), 
    ("Associate Lawyer", 190000, 3);

INSERT INTO employees (first_name, last_name, role_id)
    ("Ian", "Rosey", 1)
    ("Cool", "Person", 4)
    ("Rinse", "Repeat", 2)
    ("Ben", "Wright", 3)
    ("Life", "Isgreat", 5)
    ("Wink", "Yface", 6)
    ("Rice", "Famer", 7)