import { When, Then, Given } from "@badeball/cypress-cucumber-preprocessor";

let endpoint;
let registrationData;
let response;
let invalidRegistrationData;

// Scenario: User should not be able to register with invalid email format
Given("I have the registration data with an invalid email", () => {
  invalidRegistrationData = {
    email: "eve.holt.com", // Invalid email format
    password: "Test123@", // Password
  };
});

When("I send a POST request with the invalid email to the endpoint", () => {
  cy.request({
    method: "POST",
    url: endpoint,
    body: invalidRegistrationData,
    headers: { "Content-Type": "application/json" },
    failOnStatusCode: false,
  }).then((res) => {
    response = res;
  });
});

Then(
  "I should receive a response indicating the email format is invalid",
  () => {
    //The api does not explictly return invalid email
    expect(response.status).to.equal(400);
    expect(response.body).to.have.property("error");
    expect(response.body.error).to.include(
      "Note: Only defined users succeed registration"
    );
  }
);

//Scenario: User should be able to register when valid data is passed
Given(/^I have the endpoint to register$/, () => {
  endpoint = "https://reqres.in/api/register";
});

When(/^I have the registration data$/, () => {
  registrationData = {
    email: "eve.holt@reqres.in",
    password: "Test123@",
  };
});

When(/^I send a POST request with valid data to the endpoint$/, () => {
  cy.request({
    method: "POST",
    url: endpoint,
    body: registrationData,
    headers: { "Content-Type": "application/json" },
  }).then((res) => {
    response = res;
  });
});

Then(/^I should receive a valid response$/, () => {
  // Expectation is to have 201, but api returns 200
  expect(response.status).to.be.oneOf([200, 201]);
  const responseBody = response.body; //
  expect(responseBody).to.have.property("id");
  expect(responseBody).to.have.property("token");
  expect(responseBody.id).to.not.be.null;
  expect(responseBody.token).to.not.be.null;
});
