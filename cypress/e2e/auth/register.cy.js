const { registerLocator } = require("../../locators/registerLocator")

describe("Register Test - DemoQA", () => {
    beforeEach("", () => {
        cy.intercept('POST', '**/Account/v1/User').as('registerApi')
        cy.visit("/")
        cy.viewport("macbook-16")
        cy.get("#userForm").should('be.visible')
    })

    it("DQA-3 | Register user without filling text field", () => {
        cy.get(registerLocator.btnNewUser).click()
        cy.get(registerLocator.btnRegister).click()
        cy.get(registerLocator.invalidRegister).eq(0).should("exist")
        cy.get(registerLocator.invalidRegister).eq(1).should("exist")
        cy.get(registerLocator.invalidRegister).eq(2).should("exist")
        cy.get(registerLocator.invalidRegister).eq(3).should("exist")
    })

    it("DQA-4 | Register user without ticking captcha box", () => {
        cy.get(registerLocator.btnNewUser).click()
        cy.get(registerLocator.fieldFirstName).type("Tester")
        cy.get(registerLocator.fieldLastName).type("Dua")
        cy.get(registerLocator.fieldUserName).type("testerdua")
        cy.get(registerLocator.fieldPassword).type("Testing123!")
        cy.get(registerLocator.btnRegister).click()
        cy.get(registerLocator.warningRegister).should('contain', 'Please verify reCaptcha to register!')
    })

    it("DQA-8 | Press Back to Login Button", () => {
        cy.get(registerLocator.btnNewUser).click()
        cy.get(registerLocator.btnBack).click()
        cy.get("#userForm").should("be.visible")
    })


})