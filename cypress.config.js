const { defineConfig } = require('cypress');
const { initPlugin } = require('cypress-plugin-snapshots/plugin');

module.exports = defineConfig({
  chromeWebSecurity: false, // for working with iframes
  e2e: {
    // baseUrl: 'http://localhost:8080'
    baseUrl: 'https://www.allabouterik.com',
    setupNodeEvents(on, config) {
      // implement node event listeners here
      initPlugin(on, config);
    },
    pageLoadTimeout: 90000,
  },
});
