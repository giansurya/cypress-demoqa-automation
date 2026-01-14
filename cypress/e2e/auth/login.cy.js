const { loginLocator } = require("../../locators/loginLocator")

describe("Login Test - DemoQA", () => {
    beforeEach("", () => {
        cy.intercept('POST', '**/Account/**').as('loginApi')
        cy.visit("/")
        cy.viewport('macbook-16')
        cy.get("#userForm").should('be.visible')
    })

    it("DQA-9 & DQA-10 | Login with new Registered Account & Logout", () => {
        cy.get(loginLocator.userNameLogin).type("testersatu") // Please change to your own username
        cy.get(loginLocator.passwordLogin).type("Testing123!") // Please change to your own password
        cy.get(loginLocator.btnLogin).click()
        cy.logApi("@loginApi")
        cy.get(loginLocator.valNameLogin).should('contain', 'testersatu')
        cy.get(loginLocator.btnLogout).first().click()
    })

    it("DQA-11 | Login without entering any text on field", () => {
        cy.get(loginLocator.btnLogin).click()
        cy.get(loginLocator.invalidLogin).first().should('exist')
        cy.get(loginLocator.invalidLogin).last().should('exist')
    })

    it("DQA-12 & DQA-13 | Login with unregistered user & wrong username and password", () => {
        cy.get(loginLocator.userNameLogin).type("testerabc") // Please change to your own username
        cy.get(loginLocator.passwordLogin).type("Testing123!") // Please change to your own password
        cy.get(loginLocator.btnLogin).click()
        cy.logApi("@loginApi")
        cy.get(loginLocator.warningLogin).should('contain', 'Invalid username or password!')
    })
})