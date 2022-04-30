import data from "../../../fixtures/example.json"; //import the fixture file
beforeEach(function()
{
    //this is the before each block which executes before each test case
    cy.fixture('/example.json').then(function(data)
    {
        this.data = data;
    })
})