/// <reference types="cypress" />
describe('sample tests for learning purpose', () => {
    beforeEach(() => {
      // Cypress starts out with a blank slate for each test
      // so we must tell it to visit our website with the `cy.visit()` command.
      // Since we want to visit the same URL at the start of all our tests,
      // we include it in our beforeEach function so that it runs before each test
    })
    it.skip("Flipkart new window and perform operations on new window - WORKAROUND", () => {   
     
        cy.visit('https://www.flipkart.com/');
        cy.get('[name="q"]').clear().type('mobiles');
        cy.get('[type="submit"]').click();
        cy.wait(3000);
        cy.get('._4rR01T').contains('realme C11 2021 (Cool Grey, 64 GB)').click();
        cy.get('a._1fQZEK').then(function($a)
         {   
            var url = 'https://www.flipkart.com'+$a[0].getAttribute('href')
            cy.visit(url)
            cy.get('button').contains('ADD TO CART').click();
     })
     
        
    });
    it.skip('shadow DOM elements without "includeShadowDom" flag set', () => {
        //No need to set the includeShadown dom flag set use the .shadow() to fetch the #shadow-root(open) element and get elements inside
        Cypress.config("chromeWebSecurity",false);
        cy.visit('https://books-pwakit.appspot.com/');
        cy.get('book-app') //1
        .shadow() //calling the shadow dom elemets here
        .find('app-header') //3
        .find('.toolbar-bottom') //4
        .find('book-input-decorator') //5
        .find('#input') //6
        .type('Science',{force: true})
        .click()
        .url('contains', 'explore?q=Science')
      })
      it('Invisible elements - select only visible elements ',()=>{
          cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/')
          cy.get('input[class="search-keyword"]').clear().type('ca')
          cy.wait(2000)
          cy.get('.product:visible').should('have.length',4) //this selects only visible elements
          cy.get('.products').find('.product').should('have.length',4)
          cy.get('.products').find('.product').eq(2).contains('ADD TO CART').click();
        //This is used to wrap resolve promise and iterate over a array of DOM elements
        //goto excommerce page and with 4 items displayed, it select the product with partial name = cashews or containing text cashews
          cy.get('.products').find('.product').each(($el,index,$list)=>{
                const text = $el.find('.product-name').text()
                if(text.includes('Cashews'))
                {
                    cy.wrap($el).find('button').click()
                }
                else if (text.includes('Capsicum'))
                {
                  cy.wrap($el).find('button').click()
                }
          })
          cy.get('span.cart-count').click({force: true})
          cy.get('button').contains('PROCEED TO CHECKOUT').click()
          cy.contains('Place Order').click()

          //checkbox select
          //And behaves same as should function from cypress
          cy.get('#root select').select('Bulgaria').should('have.value','Bulgaria').and('have.value','Bulgaria')
          cy.wait(2000)
      })
      
      it('Text() jquery method - Validate page Logo TEXT', () => {
        //Get text jquery method
        cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/')
        cy.get('div .brand').then(function(logo){
          //cy.log prints output in cypress test runner
          cy.log(logo.text()).should('have.text','GREENKART')
          //console.log prints the output in browser console
          console.log(logo.text())
          
        })
       //This fails as this is not cypress command // console.log(logo.text())
      })
    });    