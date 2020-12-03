const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
let employees = [];

function init () {
    getEmployee();
}

function getEmployee () {
    inquirer.prompt ([
        {
            type : "input",
            name : "name",
            message : "What is the employee's name?"
        },
        {
            type : "list",
            name : "role",
            message : "What is the employee's role?",
            choices : ['Manager', 'Engineer', 'Intern'],
        },
        {
            type : "input",
            name : "email",
            message : "What is the employee's email?"
        },
        {
            type : "input",
            name : "id",
            message : "What is the employee's ID?"
        },  
        
    
    ]).then(answers => {
        if (answers.role == "Engineer") {
            const gitHub = engineerGithub();
            const employee = new Engineer(answers.name, answers.role, answers.email, answers.id, gitHub);
            employees.push(employee);
            console.log(employees);

        } else if (answers.role == "Intern") {
            var intSchool = internSchool();
            const employee = new Intern (answers.name, answers.role, answers.email, answers.id, intSchool);
            employees.push(employee);
            console.log(employees);

        } else if (answers.role == "Manager") {
            var manNumber = managerNumber();
            const employee = new Manager (answers.name, answers.role, answers.email, answers.id, manNumber);
            employees.push(employee);
            console.log(employees);
        }
        checkDone();
      })
      .catch(error => {
        if(error.isTtyError) {
          // Prompt couldn't be rendered in the current environment
        } else {
          // Something else when wrong
        }
      });
}


function checkDone() {

    inquirer.prompt([
        {
            type : "confirm",
            name : "checkDone",
            message : "Add another employee?",
            default : true,
        },
    ])
    .then(answers => {
        if (answers.checkDone === true) {
            getEmployee();
        } else {
            console.log(employees);
            fs.writeFileSync("./templates/test.html", render(employees), (err) =>
            err ? console.log(err) : console.log("success!"))
        }
        
    })
}

function engineerGithub () {
    inquirer.prompt([
        {
            type : "input",
            name : "github",
            message : "What is your github id?"
        },

    ]).then(answers => {
        if (answers.name == "ckzard") {
            console.log("so you are the famous christopher burns")
            return answers.gitHub;
        } else {
            console.log("Thats great...");
            return answers.github;
        }

    }).catch(error => {
        if(error.isTtyError) {
          // Prompt couldn't be rendered in the current environment
        } else {
          // Something else when wrong
        }
      });
}

function internSchool () {
    inquirer.prompt([
        {
            type : "input",
            name : "school",
            message : "Where did you go to school?"
        }
    ]).then(answers => {
        return answers.school;

    }).catch(error => {
        if(error.isTtyError) {
          // Prompt couldn't be rendered in the current environment
        } else {
          // Something else when wrong
        }
      });
}

function managerNumber () {
    inquirer.prompt([
        {
            type : "input",
            name : "officeNumber",
            message : "What is your office number?"
        }
    ]).then(answers => {
        return answers.officeNumber;

    }).catch(error => {
        if(error.isTtyError) {
          // Prompt couldn't be rendered in the current environment
        } else {
          // Something else when wrong
        }
      });
}

init();


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
