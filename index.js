const database = require("./config/connections")
const inquirer = require('inquirer');
const cTable = require('console.table')

// initilaze function 
 let init = () => database.connect((err) => {
    if (err) throw err;
    callPrompt();
  
  });

  

// inquirer prompt 

let callPrompt = () => {
inquirer
  .prompt([
    {
        type: 'list',
        name: 'choices',
        message: 'What would you like to do?',
        choices: [ "View all departments", new inquirer.Separator(), "View all roles", new inquirer.Separator(), "View all employees", new inquirer.Separator(), "Add a department", new inquirer.Separator(), "Add a role", new inquirer.Separator(), "Add and update a role", new inquirer.Separator() ]
    },
  ])
  .then((response) =>

    responseFunction(response)    
  );
}

//check to see what choosen response is and return data info that matches selected response

let responseFunction = (response) => {

    // check to see is selection was view all departments

    if (response.choices === "View all departments" ) {
       database.query("SELECT * FROM  department", function(err, results) {
        if (err) {
            console.log(err);
          }
           console.table(results)
           callPrompt();
       })
    }

    // check to see is selection was view all roles

    if (response.choices === "View all roles" ) {
        database.query("SELECT role.id, role.title, department.department, role.salary FROM role LEFT JOIN department ON role.department_id  = department.id", function(err, results) {
         if (err) {
             console.log(err);
           }
            console.table(results)
            callPrompt();
        })
     }

    // check to see is selection was view all employees then show employee table with other table info added
     

     if (response.choices === "View all employees" ) {
        database.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, department.department, role.salary, employee.manager_id FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id", function(err, results) {
         if (err) {
             console.log(err);
           }
            console.table(results)
            callPrompt();
        })
     }


}


init();