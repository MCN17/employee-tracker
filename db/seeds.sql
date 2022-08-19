-- Creates a column called departments.
INSERT INTO departments (name)
VALUES
("Engineering"),
("Finance"), 
("Legal"), 
("Sales");

-- Creates columns for title, salary, and department_id.
INSERT INTO role (title, salary, department_id)
VALUES
("Sales Lead", 100000, 4),
("Salesperson", 80000, 4),
("Lead Engineer", 150000, 1),
("Sofware Engineer", 120000, 1),
("Account Manager", 160000, 2),
("Accountant", 125000, 2),
("Legal Team Lead", 250000, 3),
("Lawyer", 190000, 3);

-- Creates columns for first_name, last_name, rold_id, and manager_id.
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
("John", "Doe", 1, NULL),
("Mike", "Chan", 2, 1),
("Ashley", "Rodriguez", 3, NULL),
("Kevin", "Tupik", 4, 3),
("Kunal", "Singh", 5, NULL),
("Malia", "Brown", 6, 5),
("Sarah", "Lourd", 7, NULL),
("Tom", "Allen", 8, 7);