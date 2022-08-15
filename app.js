const consoleTable = require('console.table');
const inquirer = require("inquirer");
const fs = require("fs");
const mysql = require('mysql2');


// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'newnewpassword',
      database: 'companyDatabase'
    },
    console.log("test")
  );

  const promptOwner = () => {
    return inquirer.prompt([
        {
            type: "list",
            name: "options",
            message: "Please choose one of the following options:",
            choices:["View all Departments", "View all Roles", "View all Employees", "Add a Department", "Add a Role", "Add an Employee", "Update an Employee Role"]
        }
    ])
    .then(userChoice => {
      switch(userChoice.options) {
        case "View all Departments":
          viewDepartments();
          break;
        case "View all Roles":
          viewRoles();
          break;  
        case "View all Employees":
          viewEmployees();
          break;
        case "Add a Department":
          addDepartment();
          break;
        case "Add a Role":
          addRole();
          break;
        case "Add an Employee":
          addEmployee();
          break;
      }
    })
  }

const viewDepartments = () => {
  db.query(`SELECT * FROM departments;`, function(err, rows) {
    console.table(rows);
    promptOwner();
  });
};

const viewRoles = () => {
  db.query(`SELECT * FROM role;`, function(err, rows) {
    console.log("test");
    console.table(rows);
    promptOwner();
  });
};

const viewEmployees = () => {
  db.query(`SELECT employee.*, role.title AS job_title, departments.name AS department, role.salary, manager.first_name AS manager
            FROM employee
            LEFT JOIN  role ON employee.role_id = role.id
            LEFT JOIN departments ON role.department_id = departments.id
            LEFT JOIN employee manager ON employee.manager_id = manager.id;`, function(err, rows) {
    console.log("test");
    console.table(rows);
    promptOwner();
  });
};

// including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to

const addDepartment = () => {
  return inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "Please enter the name of the department."
    }
  ])
  .then(input => {
    db.query(`INSERT INTO departments SET ?`,
      {
        name: input.name
      },
      function (err) {
        if (err) throw err;
        console.log("Added department successfully!");
        promptOwner();
      }
    )
  });
};

const addRole = () => {
  return inquirer.prompt([
    {
      type: "input",
      name: "name", 
      message: "Please enter the name of the role."
    },
    {
      type: "input", 
      name: "salary",
      message: "Please enter the salary for this role."
    },
    {
      type: "input",
      name: "department",
      message: "Please enter the department ID for this role."
    }
  ])
  .then(input => {
    db.query(`INSERT INTO role SET ?`,
    {
      title: input.name,
      salary: input.salary,
      department_id: input.department
    },
    function (err) {
      if (err) throw err;
      console.log("Added role successfully!");
      promptOwner();
    }
    )
  })
}
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database

const addEmployee = () => {
  return inquirer.prompt([
    {
      type: "input",
      name: "first_name",
      message: "Please enter the employee's first name."
    },
    {
      type: "input",
      name: "last_name",
      message: "Please enter the employee's last name."
    },
    {
      type: "input",
      name: "role",
      message: "Please enter thie employee's role ID."
    },
    {
      type: "input",
      name: "manager",
      message: "Please enter the employee's manager ID"
    }
  ])
  .then(input => {
    db.query(`INSERT INTO employee SET ?`,
    {
      first_name: input.first_name,
      last_name: input.last_name,
      role_id: input.role,
      manager_id: input.manager
    },
    function (err) {
      if (err) throw err;
      console.log("Added employee successfully!");
      promptOwner();
    }
    )
  });
};

// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database

promptOwner();
