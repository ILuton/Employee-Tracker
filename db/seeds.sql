USE employee_db;

INSERT INTO department (department)
VALUES ("Marketing"),
       ("Sales"),
       ("Accounting"),
       ("Human Resources"),
       ("Warehouse");
       
INSERT INTO role (title, salary, department_id)
VALUES ("Manager", "90000", 2),
       ("Senior Accountant", "86000", 3),
       ("HR Rep 1", "80000", 4), 
       ("Junior Sales assistant", "75000", 2),
       ("Social Media Marketer", "90000", 1),
       ("Warehouse Manager", "80000", 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Michael", "Scott", 1, null), 
       ("Dwight", "Shrute", 2, 1),
       ("Darryl", "Philbin", 6, null),
       ("Ryan", "Howard", 5, 1),
       ("Toby", "Flenderson", 3, 1);
