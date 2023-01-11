const { defineConfig } = require('cypress');
const { initPlugin } = require('cypress-plugin-snapshots/plugin');

module.exports = defineConfig({
  projectId: '9c6bem',
  chromeWebSecurity: false, // for working with iframes
  e2e: {
    // baseUrl: 'https://www.allabouterik.com',
    baseUrl: 'http://localhost:8080',
    setupNodeEvents(on, config) {
      // implement node event listeners here
      initPlugin(on, config);
    },
    pageLoadTimeout: 90000,
  },
});
