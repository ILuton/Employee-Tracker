const database = require("./config/connections")
const inquirer = require('inquirer');
const cTable = require('console.table');
const { removeListener } = require("./config/connections");

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
        choices: [ "View all departments", new inquirer.Separator(), "View all roles", new inquirer.Separator(), "View all employees", new inquirer.Separator(), "Add a department", new inquirer.Separator(), "Add a role", new inquirer.Separator(), "Add an employee", new inquirer.Separator(), "Update employee role", new inquirer.Separator() ]
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

    //  add department

     if (response.choices === "Add a department" ) {

  inquirer
  .prompt([
    {
        type: 'input',
        name: 'addDept',
        message: 'What is the name of the Department?'
    }
  ])
  .then((response) =>

    addDept(response.addDept)
  );
  }

  // add role

  if (response.choices === "Add a role" ) {

    inquirer
    .prompt([
      {
          type: 'input',
          name: 'addRole',
          message: 'What is the name of the Role?'
      },
      {
        type: 'input',
        name: 'addSalary',
        message: 'What is the Salary'
    },
    {
      type: 'list',
      name: 'addDept',
      message: 'What is the department',
      choices: [ "Marketing", "Sales", "Accounting", "Human Resources", "Warehouse"]
  },

  ])
    .then((response) =>

  
      addRole(response.addRole, response.addSalary, getDeptNum(response.addDept))
    );
    }

  // add new employee

  if (response.choices === "Add an employee" ) {

    inquirer
    .prompt([
      {
          type: 'input',
          name: 'addFirst',
          message: 'What is the employee first?'
      },
      {
        type: 'input',
        name: 'addLast',
        message: 'What is the employee last name?'
    },
   
  {
    type: 'list',
    name: 'addRoleId',
    message: 'What is the employee role?',
    choices: [ "Manager", "Senior Accountant", "HR Rep 1", "Junior Sales assistant", "Social Media Marketer", "Warehouse Manager"]
  },
  {
    type: 'list',
    name: 'addManId',
    message: 'Who is the employees Manager?',
    choices: [ "Michael Scott", "Dwight Schrute", "Darryl Philbin", "Ryan Howard", "Toby Flenderson"]
  },

  ])
    .then((response) =>

      addEmployee(response.addFirst, response.addLast, getRoleId(response.addRoleId), getManId(response.addManId)))
    }

  
  // update employee role

  if (response.choices === "Update employee role" ) {

    inquirer
    .prompt([
   
      {
        type: 'list',
        name: 'updateEmployee',
        message: 'What is the employee you want to update?',
        choices: [ "Michael Scott", "Dwight Schrute", "Darryl Philbin", "Ryan Howard", "Toby Flenderson"]
      },
      {
        type: 'list',
        name: 'updateId',
        message: 'What is the employee new role?',
        choices: [ "Manager", "Senior Accountant", "HR Rep 1", "Junior Sales assistant", "Social Media Marketer", "Warehouse Manager"]
      },

  ])
    .then((response) =>

      updateEmployee(getManId(response.updateEmployee), getRoleId(response.updateId)))
    }



}

// update employee

let updateEmployee = (updateEmployee, updateId) => {

  database.query(`UPDATE employee SET role_id = '${updateId}' WHERE id = '${updateEmployee}' `, function(err, results) {
    if (err) {
        console.log(err);
      }
       console.log(`Updated Employee in the database`)
       callPrompt();
   })


}

// add dept query

let addDept = (response) => {
    database.query(`INSERT INTO department (department) VALUES ('${response}') `, function(err, results) {
     if (err) {
         console.log(err);
       }
        console.log(`Added ${response} to the database`)
        callPrompt();
    })

}

// add a role query

let addRole = (addedRole, addedSalary, addedDepartment) => {
  database.query(`INSERT INTO role (title, salary, department_id) VALUES ('${addedRole}', '${addedSalary}', '${addedDepartment}') `, function(err, results) {
   if (err) {
       console.log(err);
     }
      console.log(`Added ${addedRole} to the database`)
      callPrompt();
  })

}

// transform input of department for role into int 
let getDeptNum = (addedDept) => {
    if (addedDept === "Marketing"){
      return 1
    } else if (addedDept === "Sales") {
      return 2
    } else if (addedDept === "Accounting") {
        return 3
    } else if (addedDept === "Human Resources") {
      return 4
    } else {
      return 5
    }
}

// add employee

let addEmployee = (addedFirst, addedLast, addedRoleId, addedManId) => {
  database.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${addedFirst}', '${addedLast}', '${addedRoleId}', '${addedManId}') `, function(err, results) {
   if (err) {
       console.log(err);
     }
      console.log(`Added ${addedFirst} ${addedLast}  to the database`)
      callPrompt();
  })

}

// transform input of role id for int 
let getRoleId = (addedRoleID) => {
  if (addedRoleID === "Manager"){
    return 1
  } else if (addedRoleID === "Senior Accountant") {
    return 2
  } else if (addedRoleID === "HR Rep 1") {
      return 3
  } else if (addedRoleID === "Junior Sales assistant") {
    return 4
  } else if ((addedRoleID === "Social Media Marketer")) {
    return 5
  } else {
    return 6 
  }
}

// transform input of man id for int 
let getManId = (addedManID) => {
  if (addedManID === "Michael Scott"){
    return 1
  } else if (addedManID === "Dwight Schrute") {
    return 2
  } else if (addedManID === "Darryl Philbin") {
      return 3
  } else if (addedManID === "Ryan Howard") {
    return 4
  } else if (addedManID === "Toby Flenderson") {
    return 5
  }
}


// start

init();