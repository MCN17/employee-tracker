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
            choices:["View all Departments", "View all Roles", "View all Employees", "Add a Department", "Add a Role", "Update an Employee Role"]
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
    console.table(rows);
    promptOwner();
  });
};

// const viewEmployees = () => {
//   db.query(`SELECT * FROM employee;`, function(err, rows) {
//     console.table(rows);
//   });
// };


promptOwner();
