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
            name: "role",
            message: "Please choose one of the following options:",
            choices:["View all Departments", "View all Roles", "View all Employees", "Add a Department", "Add a Role", "Update an Employee Role"]
        }
    ])
  }

promptOwner();
