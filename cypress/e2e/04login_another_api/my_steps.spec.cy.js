import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

let loginData;
let response;
let endpoint;

Given(/^I have the endpoint to login$/, () => {
  endpoint = "https://reqres.in/api/login";
});

When(
  /^I send a POST request with correct username and no password value to the endpoint$/,
  () => {
    loginData = {
      email: "eve.holt@reqres.in",
      password: "",
    };

    cy.request({
      method: "POST",
      url: endpoint,
      body: loginData,
      headers: { "Content-Type": "application/json" },
      failOnStatusCode: false,
    }).then((res) => {
      response = res;
    });
  }
);

Then(/^I should receive a response indicating missing password$/, () => {
  expect(response.status).to.equal(400);
  expect(response.body).to.have.property("error");
  expect(response.body.error).to.include("Missing password");
});

// Scenario: Validate user cannot login with unregistered username
When(
  "I send a POST request with an unregistered username and any password to the endpoint",
  () => {
    loginData = {
      email: "unregistered@user.com",
      password: "password123",
    };

    cy.request({
      method: "POST",
      url: endpoint,
      body: loginData,
      headers: { "Content-Type": "application/json" },
      failOnStatusCode: false,
    }).then((res) => {
      response = res;
    });
  }
);

Then("I should receive a response indicating the user does not exist", () => {
  expect(response.status).to.equal(400); // Expecting 400 Bad Request
  expect(response.body).to.have.property("error");
  expect(response.body.error).to.include("user not found");
});

// Scenario: Validate user can login with valid credentials
When("I send a POST request with correct credentials to the endpoint", () => {
  loginData = {
    email: "eve.holt@reqres.in",
    password: "Test123@",
  };

  cy.request({
    method: "POST",
    url: endpoint,
    body: loginData,
    headers: { "Content-Type": "application/json" },
  }).then((res) => {
    response = res;
  });
});

Then("I should receive a valid response", () => {
  expect(response.status).to.equal(200);
  expect(response.body).to.have.property("token");
  expect(response.body.token).to.not.be.null;
});
