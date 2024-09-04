const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportHeight: 1080,
  viewportWidth: 1920,

  // Mochawesome reporter config
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/reports',
    overwrite: false,
    html: false,
    json: true,
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },

    // setting baseurl as environment variable 
    env: {
      baseUrl: "https://www.bankofcanada.ca/valet/",
    },

    retries: {
      runMode: 1,  //headless
      openMode: 1
    },

    specPattern: "cypress/e2e/**/*.spec.{js,jsx,ts,tsx}",
  },
});
