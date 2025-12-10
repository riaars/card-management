/// <reference types="cypress" />

describe("NotFoundPage", () => {
  it("shows 404 page for unknown routes", () => {
    cy.visit("/this-page-definitely-does-not-exist", {
      failOnStatusCode: false,
    });

    cy.contains("404").should("be.visible");
    cy.contains("Page not found").should("be.visible");
    cy.get("h1").should("have.text", "404");
    cy.get("p").should("have.text", "Page not found");
  });
});
