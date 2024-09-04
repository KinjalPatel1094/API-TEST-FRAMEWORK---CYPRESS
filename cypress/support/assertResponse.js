export function validateResponse(
  response,
  statusCode,
  bodyProperties = [],
  isPositive = true
) {
  expect(response.status).to.eq(statusCode);

  if (isPositive) {
    if (Array.isArray(bodyProperties)) {
      // Assert that the expected properties are present

      bodyProperties.forEach((prop) => {
        expect(response.body).to.have.property(prop);
      });
    } else if (typeof bodyProperties === "object") {
      // Assert specific properties and their values

      for (const [key, value] of Object.entries(bodyProperties)) {
        if (typeof value === "object") {
          // For nested objects
          for (const [nestedKey, nestedValue] of Object.entries(value)) {
            expect(response.body[key]).to.have.property(nestedKey, nestedValue);
          }
        } else {
          expect(response.body).to.have.property(key, value);
        }
      }
    }
  } else {
    // Assert for negative scenarios

    const contentType = response.headers["content-type"];

    // If response type is application/json
    if (contentType.includes("application/json")) {
      const errorMessage = response.body.message;

      switch (response.status) {
        case 400:
          expect(errorMessage).to.include.oneOf([
            "Error: Verify your inputs",
            "Invalid request",
          ]);
          break;
        case 403:
          expect(errorMessage).to.include("Access Denied");
          break;
        case 404:
          expect(errorMessage).to.include("unavailable");
          //expect(response.body).to.have.property("docs");
          break;
        case 500:
          expect(errorMessage).to.include.oneOf([
            "An error has occurred",
            "Internal Server Error",
          ]);
          break;
        default:
          expect(response.status).to.eq(200);
          break;
      }
    }
    // If reponse type is text/html
    else if (contentType.includes("text/html")) {
      switch (response.status) {
        case 400:
          expect(response.body).to.include("<title>400 Bad Request</title>");
          break;
        case 403:
          expect(response.body).to.include("<TITLE>Access Denied</TITLE>");
          break;
        case 404:
          expect(response.body).to.include("<title>404 Not Found</title>");
          break;
        case 500:
          expect(response.body).to.include("<title>500 Internal Server Error</title>");
          break;
        default:
          cy.log("Unexpected HTML response status code");
          break;
      }
    }
  }
}

// to validate XML response for last 2 API requests
export function validateXMLResponse(response) {
  expect(response.status).to.eq(200);
  expect(response.headers['content-type']).to.include('application/rss+xml');
}