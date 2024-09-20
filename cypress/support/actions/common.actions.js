Cypress.Commands.add("clickElement", (element) => {
  cy.contains(element).should("be.visible").and("exist").click({ force: true });
});

Cypress.Commands.add("verifyPage", (element, text) => {
  cy.get(element).should("be.visible").and("exist").and("have.text", text);
});

Cypress.Commands.add("hoverElement", () => {
  cy.get(data.product).should("be.visible").and("exist").trigger("mouseover");
});

Cypress.Commands.add("agreePolicy", () => {
  cy.get(data.policy_agreement).should("be.visible").click();
});
