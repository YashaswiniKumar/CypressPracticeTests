/// <reference types="cypress" />
describe('Tasks', () => {
    beforeEach(() => {
      // Cypress starts out with a blank slate for each test
      // so we must tell it to visit our website with the `cy.visit()` command.
      // Since we want to visit the same URL at the start of all our tests,
      // we include it in our beforeEach function so that it runs before each test

    })

    it('Cypress Asynchronous nature', () => {
        cy.visit('https://example.cypress.io/commands/aliasing')
        // Alias a DOM element for use later
        cy.get('.as-table').find('tbody>tr').first().find('td').first().find('button').as('firstBtn')
        // when we reference the alias, we place an 
        
        cy.get('@firstBtn').click()
        
        //Get the second button

      })
    });