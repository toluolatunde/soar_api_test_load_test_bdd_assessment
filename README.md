## SOAR Assessment for the QA Role

### Contents

---

- [ ] [Libraries and Framework](#libraries-and-framework)
- [ ] [Setup and Installation](#setup-and-installation)
- [ ] [Project Structure](#project-structure)

### Libraries and Framework

---

- [ ] [Cypress v.13.0.0](https://docs.cypress.io/guides/getting-started/installing-cypress)

  - This is the main framework that allows the site under test to be automated. It utilizes a mocha syntax to write simple commands that enable the automation of the site.

- [ ] [Cucumber](https://www.npmjs.com/package/@badeball/cypress-cucumber-preprocessor)

  - This is the Behaviour Driven Development library that helps to write the test scripts in a gherkin syntax which makes the script easily understandable and inclusive by extension.

### Setup and Installation

---

With the steps below, the project can be easily setup;

- The project should be cloned and navigated into
- A terminal should be opened at the root of the project
- The command `npm i` should be executed to install all relevant dependencies and frameworks, these dependencies will be fetched from the `package.json` file
- Alternatively, the command `npm ci` can be executed for the same purpose only that this time, it will use the `package-lock.json`
- In the event that the installation isn't successful due to a legacy dependency, add the `--force` flag to the installation command.

### Project Structure

---

The BDD structure used means that tests are triggered by the `.feature` file


#Note:

While I attempted to test the endpoint from the testUrl "parabank.parasoft.com", I added another api test for registration and login. 

#Task 3
#To run K6 - for load and stress test
- brew install k6 (on Mac OS)

-Go/cd to the file directory cypress/load_stress_testing

- Use the command to run the file : "k6 run k6_bdd_test.js"

