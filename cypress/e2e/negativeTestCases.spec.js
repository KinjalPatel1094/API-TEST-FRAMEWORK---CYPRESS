import { validateResponse } from "../support/assertResponse";

describe("Bank of Canada API Error Handling Negative Test suite", () => {

  // mocking response for 500 server error
  /*beforeEach(() => {
    cy.intercept(
      {
        method: "GET",
        url: `${Cypress.env("baseUrl")}trigger-error`,
      },
      {
        statusCode: 500,
        body: { message: "Internal Server Error" },
        headers: { "content-type": "application/json" },
      }
    ).as("mockedServerError");
  });*/

  // passing Malformed Request to get 400 response code
  it("400 Bad Request", () => {
    cy.request({
      method: "GET",
      url: `${Cypress.env("baseUrl")}lists/groups/json/invalidParam=%XXX`,

      failOnStatusCode: false,
    }).then((response) => {
      validateResponse(response, 400, [], false);
    });
  });

  it("404 Not Found : invalid query parameters", () => {

    // passing invalid url to generate 404 bad request
    cy.GETrequest("list/groups/json").then((response) => {
      // Validate the response using the validateResponse function
      validateResponse(response, 404, [], false);
    });
  });

  it("403 Method Not Allowed : unsupported HTTP methods", () => {

    // performing delete action to get 403 response code
    cy.request({
      method: "DELETE",
      url: `${Cypress.env("baseUrl")}/lists/groups/json`,
      failOnStatusCode: false,
    }).then((response) => {

      validateResponse(response, 403, [], false);
    });
  });

  /*it("429 Too Many Requests", () => {
    // Simulate multiple rapid requests to trigger rate limiting
    cy.wrap(Cypress._.range(500)).each(() => {
      cy.GETrequest("/lists/groups/json").then((response) => {
        validateResponse(response, 429, [], false);
      });
    });
  });

  it("500 Internal Server Error : server-side issues", () => {
    cy.request({
      method: "GET",
      url: `${Cypress.env("baseUrl")}trigger-error`,
      failOnStatusCode: false,
    }).then((response) => {
      validateResponse(response, 500, [], false);
    });*/
});
