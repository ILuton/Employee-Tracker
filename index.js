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
        choices: [ "View all departments", new inquirer.Separator(), "View all roles", new inquirer.Separator(), "View all employees", new inquirer.Separator(), "Add a deptartment", new inquirer.Separator(), "Add a role", new inquirer.Separator(), "Add and update a role", new inquirer.Separator() ]
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
        database.query("SELECT * FROM  role", function(err, results) {
         if (err) {
             console.log(err);
           }
            console.table(results)
            callPrompt();
        })
     }

    // check to see is selection was view all employees
     

     if (response.choices === "View all employees" ) {
        database.query("SELECT * FROM  employee", function(err, results) {
         if (err) {
             console.log(err);
           }
            console.table(results)
            callPrompt();
        })
     }


}


init();