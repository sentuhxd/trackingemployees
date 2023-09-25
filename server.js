const mysql = require("mysql2");
const inquirer = require('inquirer');
const cTable = require('console.table');
const { response } = require("express");

const connection = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: 'Password123',
  database: 'trackingemployees_db',
})


connection.connect(function (err) {
    if (err) throw err;
    promptUser();
});


function promptUser(){
    inquirer.prompt([
        {
            type: 'list',
            name: 'overview',
            message: 'What would you like to do in the employee tracker program?',
            choices: ['view departments', 'view roles', 'view employees', 'add department', 'add roles', 'add employees', 'RETURN']
        }
    ]).then((response) => {
        switch (response.overview) {
            case 'view departments':
                viewDepartments();
                break;
            
            case 'view roles':
                viewRoles();
                break;
            
            case 'view employees':
                viewEmployees();
                break;

            case 'add department':
                addDepartment();
                break;
            
            case 'add roles':
                addRoles();
                break;

            case 'add employees':
                addEmployees();
                break;
            
            case 'RETURN':
                connection.end();
                console.log('\n You have exited the employee tracker \n')
                return;
            default:
                break;

        }
    })
}



