import { When, Then } from "@badeball/cypress-cucumber-preprocessor";

let endpoints;

before(() => {
  // Load the endpoints from the fixture
  cy.fixture("endpoints").then((data) => {
    endpoints = data;
  });

  cy.fixture("username").then((data) => {
    const uniqueUsername = data.uniqueUsername;
    cy.wrap(uniqueUsername).as("uniqueUsername");
  });
});

When(/^I have the endpoint to login$/, () => {
  const loginEndpoint = endpoints.find((e) => e.name === "login_endpoint");
  expect(loginEndpoint, "Login endpoint not found").to.not.be.null;
});

When(/^I send a POST request with correct credentials to the endpoint$/, () => {
  cy.get("@uniqueUsername").then((username) => {
    const requestBody = new URLSearchParams({
      username: username, // Use the unique username from registration
      password: "Test@1234",
    }).toString();

    cy.request({
      method: "POST",
      url: endpoints.find((e) => e.name === "login_endpoint").url,
      body: requestBody,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded", // Set the content type
      },
      failOnStatusCode: false, // Prevent Cypress from failing the test automatically
    }).then((response) => {
      cy.wrap(response).as("apiLoginResponse");
      cy.log(`Response Status: ${response.status}`);
    });
  });
});

Then(/^I should receive a valid response$/, () => {
  cy.get("@apiLoginResponse").then((response) => {
    expect(response.status).to.eq(200);

    if (response.status === 200) {
      expect(response.body).to.have.property("message", "Login successful");
      cy.log("Login was successful.");
    } else {
      cy.log("Login failed. Status code:", response.status);
      expect(response.body).to.have.property("error");
      cy.log("Error message:", response.body.error);
    }
  });
});
