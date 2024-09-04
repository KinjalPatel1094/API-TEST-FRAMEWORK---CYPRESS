import { validateResponse } from "../support/assertResponse";
import { validateXMLResponse } from "../support/assertResponse";
import { averageForexRate } from "../support/calculateAverage";


describe("Bank of canada API TestSuite", () => {
  it("API request to get lists of available Groups", () => {
    cy.GETrequest("lists/groups/json").then((response) => {
      validateResponse(response, 200, ["terms", "groups"], true);
      //const groups = response.body.groups;
      const groupNames = Object.keys(response.body.groups);


      //const groupName = groupNames[0];

      //API request to get details associated to specific Group by its name and all the series it contains.
      const groupName = "FX_RATES_DAILY";
      if (groupNames.includes(groupName)) {
        cy.GETrequest(`groups/${groupName}/json`).then((secondResponse) => {
          // Assertions for the second response
          validateResponse(
            secondResponse,
            200,
            ["terms", "groupDetails"],
            true
          );

          // API request to get observations of a Group of series , filtered by a groupname.
          cy.GETrequest(`observations/group/${groupName}/json?recent_weeks=10`).then((thirdResponse) => {
            // Assertions for the third response
            validateResponse(
              thirdResponse,
              200,
              ["groupDetail", "terms", "seriesDetail"],
              true
            );
          });
        });
      } else {
        throw new Error(
          `Group name "${groupName}" not found in the response`
        );
      }
    });
  });

  it("API request to get details associated to a series", () => {
    cy.GETrequest("series/FXAUDCAD/json").then((response) => {

      // passing bodyproperties as object to validate values.
      const bodyProperties = {
        terms: {
          url: "https://www.bankofcanada.ca/terms/",
        },
        seriesDetails: {
          name: "FXAUDCAD",
          label: "AUD/CAD",
        },
      };

      validateResponse(response, 200, bodyProperties, true);
    });
  });

  it("API request to get observations filtered by a SeriesName", () => {
    // Find average forex conversion rate for different currencypairs by passing different values here.
    // FXCADAUD will find the average Forex conversion rate, "CAD to AUD," for the recent 10 weeks
    const currencyPair = "FXCADAUD";
    cy.GETrequest("observations/FXCADAUD/json?recent_weeks=10").then(
      (response) => {
        validateResponse(
          response,
          200,
          ["terms", "seriesDetail", "observations"],
          true
        );

        // Calling function created in support/calculateAverage.js to find the average rate.
        averageForexRate(response, currencyPair);
      }
    );
  });

  it("API test to get most recent observation for all exchange rates", () => {
    cy.GETrequest("fx_rss").then((response) => {
      validateXMLResponse(response);

      // using JavaScript's DOMParser to validate XML response body
      /*const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(response.body, "application/xml");
      expect(xmlDoc.documentElement).to.exist;*/

    });

    // API request to get exchange rate observations filtered by SeriesName.
    cy.GETrequest("fx_rss/FXAUDCAD").then((response) => {
      validateXMLResponse(response);
    });
  });
});
