//In order to use the Given, When and Then keywords below we need to import this
import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";

//const url = 'https://www.saucedemo.com/'
//The following code works for first scenario
Given('User is at the Home Page', () => {

  //fetches the URL from the cypress.json file,
  //directly imports the variable env
  cy.visit(Cypress.env('base_url'));

})
//the function() used instead of ()=> as for fixtures cypress does not support
//new function so we need to call 'function ()'
When('User enters the Username and password', function() {

  //After loading the fixtures in the BeforeEach file 
  //we can call the input data directly from the fixture file
  //Enters username and password
    cy.get('#user-name').clear().type(this.data.BddUsername)
    cy.get('#password').clear().type(this.data.BddPassword)

})
Then('User Login successfully',function() {

    //clicks on Login button
    cy.get('#login-button').click()
    //Verifies if login is successful and title of the page is displayed
    cy.title().should('eq',this.data.title)
})
//The following code for second scenario
//The DATA TABLE passed inside function holds the input username 
// and password that holds the data
Given('User is logged in and products are displayed',function(dataTable) {

  cy.visit(Cypress.env('base_url'));
  //Here the username and password is fetched from the feature file
  //The data is fetched as DATA TABLE and to perform operations
  //it should be converted to RAW TABLE which converts data 
  //into a multidimensional array
  //[standard_user, secret_sauce]
  cy.get('#user-name').clear().type(dataTable.rawTable[1][0])
  cy.get('#password').clear().type(dataTable.rawTable[1][1])
  cy.get('#login-button').click()
  cy.title().should('eq',this.data.title)
  cy.get('.title').should('have.text','Products')

})
When('User adds three products',()=>{

  //Selects the Add to cart button next to the product
  cy.get('#add-to-cart-sauce-labs-backpack').contains('Add to cart').click()
  cy.get('#add-to-cart-sauce-labs-bike-light').contains('Add to cart').click()
  cy.get('#add-to-cart-sauce-labs-onesie').contains('Add to cart').click()
}) 
Then('Cart should contain three products',()=>{

  //Click on Cart and validate the products are added
  cy.get('#shopping_cart_container').click()  
  cy.get('.cart_list .cart_item').should('have.length','3')

})
Then('User clicks on Checkout',()=>{
  
  //Click on Checkout button
  cy.get('#checkout').should('be.visible').click()

})
And('User enters Address and clicks on continue',function() {

  //Validate Checkout information page is displayed
  cy.get('span.title').should('have.text','Checkout: Your Information')
  //Enter the form and submit
  cy.get('#first-name').clear().type(this.data.Firstname)
  cy.get('#last-name').clear().type(this.data.Lastname)
  cy.get('#postal-code').clear().type(this.data.postalCode)
  cy.get('#continue').should('be.visible').click()

})
Then('User cliks on Finish and successfully place order',function(){

  //Verify navigated to next page
  cy.get('span.title').should('have.text','Checkout: Overview')
  //Click on Finish button
  cy.get('#finish').should('be.visible').click()
  //Verify successfull place of Order
  cy.get('.complete-header').should('have.text','THANK YOU FOR YOUR ORDER')

}) 
