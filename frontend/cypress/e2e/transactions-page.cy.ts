const CARD_ID = "card-123";

describe("Transactions page", () => {
  beforeEach(() => {
    cy.intercept("GET", `**api/v1/cards/${CARD_ID}`, {
      statusCode: 200,
      body: {
        id: CARD_ID,
        company: "Acme Corp",
        maskedNumber: "**** **** **** 1234",
      },
    }).as("getCardDetails");

    cy.intercept("GET", `**api/v1/cards/${CARD_ID}/transactions*`, {
      statusCode: 200,
      body: {
        transactions: [
          {
            id: "trx-1",
            amount: 100,
            currency: "USD",
            description: "Coffee shop",
            createdAt: "2025-01-01T10:00:00Z",
          },
          {
            id: "trx-2",
            amount: 50,
            currency: "USD",
            description: "Book store",
            createdAt: "2025-01-02T12:30:00Z",
          },
        ],
        totalCount: 2,
      },
    }).as("getTransactions");
  });

  it("shows card header, transactions list and summary", () => {
    cy.visit(`/transactions/${CARD_ID}`);
    cy.contains("Loading transactions...").should("be.visible");
    cy.wait(["@getCardDetails", "@getTransactions"]);
    cy.contains("Acme Corp | **** **** **** 1234").should("be.visible");
    cy.get('input[placeholder="Search transactions..."]').should("exist");
    cy.contains("Showing 1 - 2 of 2 transactions").should("be.visible");
    cy.contains("Coffee shop").should("be.visible");
    cy.contains("Book store").should("be.visible");
    cy.contains("No transactions found.").should("not.exist");
  });

  it("shows empty state when there are no transactions", () => {
    cy.intercept("GET", `**api/v1/cards/${CARD_ID}/transactions*`, {
      statusCode: 200,
      body: {
        transactions: [],
        totalCount: 0,
      },
    }).as("getEmptyTransactions");

    cy.visit(`/transactions/${CARD_ID}`);
    cy.wait(["@getCardDetails", "@getEmptyTransactions"]);
    cy.contains("Showing 0 transactions").should("be.visible");
    cy.contains("No transactions found.").should("be.visible");
  });

  it("shows rate-limit message on 429", () => {
    cy.intercept("GET", `**api/v1/cards/${CARD_ID}/transactions*`, {
      statusCode: 429,
      body: {},
    }).as("getRateLimitedTransactions");

    cy.visit(`/transactions/${CARD_ID}`);
    cy.wait("@getRateLimitedTransactions");
    cy.contains(
      "You’re sending too many requests. Please wait a bit, refresh and try again."
    ).should("be.visible");
  });
});
