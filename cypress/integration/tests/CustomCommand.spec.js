//The below spec file is to demonstrate the use of Custom commands of cypress
//The demo website Saucelabs is used for the purpose
/// <reference types="cypress" />
import data from '../../fixtures/Login.json';
describe(' Custom Commands Practice Cypress', () => {

    //before section loads before all the it blocks are run 
    //the below block loads the fixture
    before(function() {
        cy.fixture('/Login.json').then(function(data){
            this.data= data;
        })
    })
    //BeforeEach runs before each it block and loads the URL
    beforeEach(function () {
        //Load the url every time a test case starts
        cy.visit(Cypress.env('base_url'));
          
    });
    //AfterEach runs after each it block and here it checks if 
    //successfully logged in or not
    afterEach(function(){
        //Assert if navigated to home page after login
        cy.title().should('eq',data.title)
    });
    it('Verify Login with User1 and Password',()=>{
        
        cy.login(data.Username1,data.Password)

    })
    it('Verify Login with User2 and Password',()=>{
        
        cy.login(data.Username2,data.Password)

    })
    it('Verify Login with User3 and Password',()=>{
        
        cy.login(data.Username3,data.Password)

    })
    it('Verify Login with User4 and Password',()=>{
        
        cy.login(data.Username4,data.Password)
    })

});
