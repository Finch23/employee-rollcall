const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");

const theTeam = [];

function runSearch() {
    inquirer
      .prompt({
        name: "employee",
        type: "list",
        message: "Select an Employee?",
        choices: [
          'Manager',
          'Engineer',
          'Intern'
        ]
      })
      .then(function(answer) {
        switch (answer.employee) {
        case "Manager":
          managerPrompt();
          break;
  
        case "Engineer":
          engineerPrompt();
          break;
  
        case "Intern":
          internPrompt();
          break;
        }
      });
  }

const internQ = [
    {
         type: 'input',
         name: 'name',
         message: "What is the Intern's name?"
    },
    {
        type: 'input',
        name: 'email',
        message: "What is the Intern's email?"
    },
    {
        type: 'input',
        name: 'id',
        message: 'Enter an Employee id #'

    },
    {
        type: 'input',
        name: 'school',
        message: 'What school did the Intern attend?'
    }
]

const engineerQ = [
    {
         type: 'input',
         name: 'name',
         message: "What is the Engineer's name?"
    },
    {
        type: 'input',
        name: 'email',
        message: "What is the Engineer's email?"
    },
    {
        type: 'input',
        name: 'id',
        message: 'Enter an Employee id #'

    },
    {
        type: 'input',
        name: 'github',
        message: 'What is your github username?'
    }
]

const managerQ = [
    {
         type: 'input',
         name: 'name',
         message: "What is the Manager's name?"
    },
    {
        type: 'input',
        name: 'email',
        message: "What is the Manager's email?"
    },
    {
        type: 'input',
        name: 'id',
        message: 'Enter an Employee id #'

    },
    {
        type: 'input',
        name: 'officeNumber',
        message: "What is the Manager's office number"
    }
]

const continueQ = [
    {
        type: 'list',
        name: 'continue',
        message: 'Would you like to add another employee?',
        choices: [
            'yes',
            'no'
        ]
    }
]

const continuePrompt = () => {
    inquirer.prompt(continueQ).then(function(data) {
        if (data.continue === 'yes') {
            runSearch();
        } else {
            writeFile(theTeam);
        }
    })
}

const internPrompt = () => {
    inquirer.prompt(internQ).then(function(data) {
        let intern = new Intern(data.name, data.email, data.id, data.school);
        theTeam.push(intern);
        continuePrompt();
    })
}

const engineerPrompt = () => {
    inquirer.prompt(engineerQ).then(function(data) {
        let engineer = new Engineer(data.name, data.email, data.id, data.github);
        theTeam.push(engineer);
        continuePrompt();
    })
}

const managerPrompt = () => {
    inquirer.prompt(managerQ).then(function(data) {
        let manager = new Manager(data.name, data.email, data.id, data.office);
        theTeam.push(manager);
        continuePrompt();
    })
}

const writeFile = (data) => {
    fs.writeFile('./output/team.html', render(data), (error) => {
        if (error) throw error;
        console.log('Page created!!');
    })
}

runSearch();


