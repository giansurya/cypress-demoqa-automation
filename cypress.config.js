const { defineConfig } = require("cypress");
const fs = require('fs')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', {
        logApi({ testName, method, url, status, body }) {
          const log = `
[${new Date().toISOString()}]
Test   : ${testName}
Method : ${method}
URL    : ${url}
Status : ${status}
Body   : ${JSON.stringify(body, null, 2)}
----------------------------------
`
          fs.appendFileSync('cypress/logs/api.log', log)
          return null
        }
      })
    },
    baseUrl: "https://demoqa.com/login"
  },
});
