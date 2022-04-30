/// <reference types="cypress" />
describe('Cypress Practice Tests  ', () => {
    beforeEach(() => {

    })  
    it('JavaScript Alerts and Assert to verify ',function(){

        cy.visit('https://the-internet.herokuapp.com/javascript_alerts')
        cy.get('[onclick="jsAlert()"]').click()
        cy.on('window:alert',(txt)=>{
          expect(txt).to.contains('I am a JS Alert');
        })
        cy.get('#result').should('have.text','You successfully clicked an alert')

    });
    it('JavaScript Confirm and Assert to verify ',function(){

        cy.visit('https://the-internet.herokuapp.com/javascript_alerts')
        cy.get('[onclick="jsConfirm()"]').click()
        cy.on('window:alert',(txt)=>{
          expect(txt).to.contains('I am a JS Confirm');
        })
        cy.get('#result').should('have.text','You clicked: Ok')

    });
    it('JavaScript Prompt and Assert to verify ',function(){

        cy.visit('https://the-internet.herokuapp.com/javascript_alerts', {
          onBeforeLoad(win) {
            cy.stub(win, 'prompt').returns('my custom message')
          },
        })
        cy.get('[onclick="jsPrompt()"]').click()
        cy.window().its('prompt').should('be.called')
        cy.get('#result').should('have.text','You entered: my custom message')

    });
    it('Goto Google click on Business. New Tab opens, perform some operation on new page. Navigate back to Google.', function (){
        //NEW TAB on Cypres
        // launch the application
        cy.visit("https://www.google.com/webhp?hl=en");
        //modify the DOM such that to remove target attribute and load the Help section in same page
        cy.get('div a').contains('Business').invoke('removeAttr','target').click()
        //Click on Advertise 
        cy.get('[data-anchor-id="advertise"]').click()
        //Asert that Advertise section is displayed
        cy.get('#advertise h2').should('have.text','\n                Advertise with Google.\n              ')
        //Navigate back to the Home page
        cy.visit("https://www.google.com/webhp?hl=en");
        
     });

     it('Child window and New Tab ', function(){
        //Visit the Practice website
        //Click on Open window which opens the child window
        //verify that child window is opened/called
        cy.visit('https://www.rahulshettyacademy.com/AutomationPractice/', {
            onBeforeLoad(win) {
              cy.stub(win, 'open', url => {
                win.location.href = 'http://www.qaclickacademy.com/';
              }).as("NewWindow")
            },
          })
          cy.get('#openwindow').click()
          cy.get('@NewWindow').should("be.called")

          //Visit the practice website
          //Click on Open Tab
          //Verify that new tab is successfully loaded and 
          //perform operations on new tab

          cy.visit('https://www.rahulshettyacademy.com/AutomationPractice/')
          //Use invoke and remove the target operator in DOM
          //which loads the new url in the same page instead of new tab
          cy.get('.block #opentab').invoke('removeAttr','target').click()
          //verify the title
          cy.title().should('eq', 'Rahul Shetty Academy')
     });
});