/// <reference types="cypress" />
describe('Cypress Practice Tests  ', () => {
    beforeEach(() => {

    })

    it('Click on all the 4 buttons using ALIAS ', () => {
        cy.visit('https://example.cypress.io/commands/aliasing')
        // Alias a DOM element for use later
        cy.get('.as-table').find('tbody>tr').first().find('td').first().find('button').as('firstBtn')
        // when we reference the alias, we place an      
        cy.get('@firstBtn').click()
        //Get and click on the second button
        cy.get('tbody>tr td').eq(1).find('button').as('SecondButton')
        cy.get('@SecondButton').click()
        //Get and click on the third button
        cy.get('tbody>tr td').eq(2).find('button').as('ThirdButton')
        cy.get('@ThirdButton').click()
        //Get and click on fourth button
        cy.get('tbody>tr td').eq(3).find('button').as('FourthButton')
        cy.get('@FourthButton').click()
      })
      it('.as() - alias a route for later use', () => {
        // Alias the route to wait for its response
        cy.intercept('GET', '**/comments/*').as('getComment')
    
        // we have code that gets a comment when
        // the button is clicked in scripts.js
        cy.get('.network-btn').click()
    
        // https://on.cypress.io/wait
        cy.wait('@getComment').its('response.statusCode').should('eq', 200)
      })
      it('Fetch OTP from a different end point using Then and Aliasing',() =>{

          cy.request('http://ec2-34-211-25-33.us-west-2.compute.amazonaws.com:9012/notify/internal/getMessage?toWhom=testaccount2@comviva.com').as('comments')

          cy.get('@comments').then((data)=>{
              
              var ResponseBody = data.body
              cy.log(ResponseBody)
              var OtpMessage = ResponseBody.message
              cy.log(OtpMessage)
              
              //extract the numver with regular expression matching
              var pattern = /\d+/g;
              var Otp =  OtpMessage.match(pattern)
              cy.log(Otp)
          })     

        })
});
   