describe("Dashboard page", () => {
  it("loads and shows navbar", () => {
    cy.visit("/");

    cy.get("nav").should("be.visible");
    cy.get("nav img").should("be.visible");
    cy.contains("Home").should("exist");
  });

  it("shows mobile hamburger on small screen", () => {
    cy.viewport("iphone-6");
    cy.visit("/");
    cy.get("nav button").first().should("be.visible");
  });
});
