// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('logApi', (alias) => {
    cy.wait(alias).then((interception) => {
      const testName = Cypress.currentTest.title
  
      cy.task('logApi', {
        testName,
        method: interception.request.method,
        url: interception.request.url,
        status: interception.response.statusCode,
        body: maskSensitiveData(interception.response.body)
      })
    })
  })
  
  function maskSensitiveData(body) {
    if (!body) return body
  
    const cloned = { ...body }
    if (cloned.token) cloned.token = '***MASKED***'
    if (cloned.password) cloned.password = '***MASKED***'
    return cloned
  }

  Cypress.Commands.add('logApiOptional', (alias) => {
    cy.get(`@${alias.replace('@', '')}`, { log: false })
      .then(() => {
        cy.wait(alias, { timeout: 3000 })
          .then((interception) => {
            if (interception) {
              cy.logApi(alias)
            }
          })
      })
      .catch(() => {
        // API tidak terjadi → tidak error
        cy.log(`No API call for ${alias}`)
      })
  })
  