# API TEST FRAMEWORK USING CYPRESS

# Overview
This repository contains an  API Test Automation framework built using Cypress-Javascript for testing valet APIs from the Bank of Canada.
The framework is designed to test different API endpoints of BOC Valet, validate positive and negative responses, generate average Forex 
conversion rate(CAD to AUD) for recent 10 weeks using observations by Series and generate detailed JSON and HTML Reports using Mochawesome reporter.

# Prerequisites

1. Node.js: Download and install from Node.js official website or using Homebrew : `brew install node` 
   I have used node version `v21.5.0` and npm version `10.2.4`
2. I have installed cypress as a dev dependency using this command : `npm install cypress --save-dev` (version installed : 13.14.1)
3. I have installed / used Mochawesome reporter for generating reports using this command : `npm install mochawesome mochawesome-merge mochawesome-report-generator --save-dev` 
   (version installed : `7.1.3`)
   (Also use this command to combine Mochawesome JSON reports into 1 reportfile using : `npx mochawesome-merge cypress/reports/*.json -o cypress/reports/merged-report.json`
    and generated HTML report using this command : `npx mochawesome-report-generator cypress/reports/merged-report.json -o cypress/reports/html-Report`)
4. By running `npm install` on your local will install all necessary dependencies listed in `package.json` file.

# Installation
Step 1: Clone the Repository
  1. Clone this repository and save it in a folder on your local machine.
  2. Open the folder in your preffered IDE.(I have used Visual Studio Code)

Step 2: Install Dependencies
  1. Open terminal inside IDE => install the project dependencies using npm: `npm install`
  2. Verify Cypress installed correctly : `npx cypress verify`

# Run Tests
  1. As I have configured steps to run tests in headless mode , along with generating Mochawesome reports
     and HTML reports in `package.json` file (scripts) , run all tests in headless mode using : `npm run cypress:run`
     (which is basically combination of : `npm run cypress:test && npm run mochawesome:merge && npm run generate:html`)
     (please check `scripts` section in `package.json` file for all custom commands)
     (I have set the `prereport` custom command to delete reports before starting to run files , which ensures creating new reports with every run)
  3. Run tests in interactive (cypress runner) mode : `npx cypress open`
  4. Run specific test file : `npx cypress run --spec cypress/e2e/apiTestCases.spec.js`

# Observations
  1. Mocking Responses: I attempted to mock responses for negative response codes (500 , 429) to test various negative scenarios, but encountered challenges with this process.
  2. Interconnected Requests: Some API requests are interconnected or dependent on the results of others.
  3. Negative Scenarios response type: Negative responses from the API can be returned in different formats, such as application/json and text/html.
     (ex: 400 and 403 status code returns text/html and 404 returns application/json content type.)

# Additional Steps
  Later, I will consider including following steps to enhance the framework:

  1. I would increase test coverage by adding more tests covering additional negative scenarios and validating response for each API request.
  2. I would add more through assertion for validating response body content for all requests and also  test XML response throughly.
  3. I would consider testing API requests by passing different data values for the requests where different parameters required.(can use parameterization techniques).
  4. I would consider integrating tests in CI/CD  pipeline (gitlab / jenkins / github actions).
  5. I would also consider parallel execution for larger test suites.
