const mysql = require("mysql2");
const inquirer = require('inquirer');
const cTable = require('console.table');
const { response } = require("express");
const { promiseHooks } = require("v8");

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




function viewDepartments() {
    connection.query(`SELECT * FROM departments ORDER BY id ASC;`, (err, res) => {
        if(err) throw err;
        console.table('\n', res, '\n');
        promptUser();
    })
}

function viewRoles() {
    connection.query(`SELECT roles.id, roles.title, roles.salary, departments.NAME, departments.id FROM roles JOIN departments ON roles.department_id = departments.id ORDER BY roles.id ASC;`, (err, res) => {
        if (err) throw err;
        console.table('\n', res, '\n')
        promptUser();
    })
}

function viewEmployees() {
    connection.query(  `SELECT 
    employees.id, 
    employees.first_name, 
    employees.last_name, 
    roles.title, 
    departments.name AS departments, 
    roles.salary, 
    CONCAT(manager.first_name, ' ', manager.last_name) AS manager
    FROM employees
    LEFT JOIN roles
    ON employees.role_id = roles.id
    LEFT JOIN departments
    ON departments.id = roles.department_id
    LEFT JOIN employees manager
    ON manager.id = employees.manager_id`, (err, res) => {
        if (err) throw err;
        console.table('\n', res, '\n')
        promptUser();
    })
}


function addDepartment() {
    inquirer.prompt([
        {
            name: 'addDept',
            type: 'input',
            message: 'Write a name for a new department!',
            validate: addDept => {
                if(addDept) {
                    return true;
                } else {
                    console.log('Add a department');
                    return false;
                }
            }
        }
    ]).then((response) => {
        const sq1 = `INSERT INTO departments (NAME) VALUES (?)`;
        connection.query(sq1, response.addDept, (err, result) => {
            if (err) throw err;
            console.log('Added' + response.addDept + 'to departments.');

            viewDepartments();
        })
    })
};

function addRoles() {
    inquirer.prompt([
        {
            name: 'role',
            type: 'input',
            message: 'Write a name for a new role',
            validate: addRole => {
                if(addRole) {
                    return true;
                } else {
                    console.log('Add a Role');
                    return false;
                }
            }
        },
        {
            name: 'salary',
            type: 'input',
            message: 'What is the salary of this role?',
            validate: addSalary => {
                if(isNaN(addSalary)) {
                    return true;
                } else {
                    console.log(' Enter a salary')
                    return false;
                }
            }
        }
    ])  .then((response) => {
            const param = [response.role, response.salary];
            const rolesq1 = `SELECT name, id FROM departments`;
            connection.promise().query(rolesq1, (err, data) => {
                if(err) throw err;
                const dept = data.map(({name, id}) => ({name: name, value: id}));
        
                inquirer.prompt([
                    {
                    name: 'dept',
                    type: 'list',
                    message: 'What Department is the role inside of',
                    choices: dept
                    } 
                ])
                    .then(chooseDept => {
                        const dept = chooseDept.dept;
                        param.push(dept);

                        const sq1 = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
                    
                        connection.promise().query(sq1, param, (err, data) => {
                            if(err) throw err;
                            console.log('Added'+ response.roles + "to roles");

                            viewRoles();

                        });
                    });
                });
        });
};


function addEmployees() {
    connection.query(`SELECT * FROM roles;`, (err, res) => {
        if (err) throw err;
        var roles = res.map(roles => ({name: roles.title, value: roles.id}));
        connection.query(`SELECT * FROM employees;`, (err, res) => {
            if(err) throw (err);
            let employee = res.map(employees => ({name: employees.first_name + '' + employees.last_name, value: employees.id}));
            inquirer.prompt([
                {
                    name: 'firstname',
                    type: 'input',
                    message: 'Enter new employees first name'
                },
                {
                    name: 'lastname',
                    type: 'input',
                    message: 'Enter new employees last name'
                },
                {
                    name: 'role',
                    type: 'list',
                    message: 'Enter the new eployees role',
                    choices: roles
                }
            

            ]).then((response) => {
                connection.query(`INSERT INTO employees SET ?`,
                {
                    first_name: response.firstname,
                    last_name: response.lastname,
                    id: response.role 
                },
                (err,res) => {
                    if(err) throw err;
                })
                connection.query(`INSERT INTO roles SET?`,
                {
                    id: response.dept,

                },
                (err, res) => {
                    if(err) throw err;
                    console.log('Added to DB')
                    promptUser();
                })
            })

        })
    })
}


    

                    
                    
