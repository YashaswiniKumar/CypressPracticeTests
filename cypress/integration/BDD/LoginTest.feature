Feature: Login
    
    @smoke
    Scenario: Login to ecommerce site
        Given User is at the Home Page
        When User enters the Username and password
        Then User Login successfully

    @regression
    Scenario: End to end transaction 
        Given User is logged in and products are displayed
        |   Username        |    password   |
        |   standard_user   |   secret_sauce|
        When User adds three products
        Then Cart should contain three products
        Then User clicks on Checkout
        And User enters Address and clicks on continue
        Then User cliks on Finish and successfully place order



