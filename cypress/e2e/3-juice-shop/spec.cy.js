describe("Juice-Shop", () => {
    beforeEach(() => {
      cy.visit("/");
      cy.get(".cc-btn").click();
      cy.get('[aria-label="Close Welcome Banner"]').click(); //dismiss poga pelekajam pop-up
  
      //ielogosanas:
      cy.get("#navbarAccount").click();         //click account
      cy.get("#navbarLoginButton").click();     //click Login
      cy.get("#email").type("demo");            //username:  demo
      cy.get("#password").type("demo");         //username:  demo
      cy.get("#loginButton").click();           //click login
    });

    it("Search Lemon", () => {
        //Type Lemon in search bar, click enter
        cy.get(".mat-search_icon-search").click();
        cy.get("#mat-input-0").type("Lemon Juice {enter}");

        //validate that we can see box with lemon juice (500ml)
        cy.get(".item-name").should("contain.text", "Lemon Juice (500ml)");

    });

    it("Search 500ml", () => {
        //Type 500ml in search bar, click enter
        cy.get(".mat-search_icon-search").click();
        cy.get("#mat-input-0").type("500ml {enter}");

        //validate that we can see following boxes:
        //1. Eggfruit Juice (500ml)
        cy.get(".item-name").should("contain.text", "Eggfruit Juice (500ml)");

        //2. Lemon Juice (500ml)
        cy.get(".item-name").should("contain.text", "Lemon Juice (500ml)");

        //3. Strawberry Juice (500ml)
        cy.get(".item-name").should("contain.text", "Strawberry Juice (500ml)");
    });

    it.only("Items per page scenario", () => {
        //select 12 items per page 
        cy.get(".mat-select-min-line").click();
        cy.get("#mat-option-3").click();
        // validate that we see 12 boxes
        cy.get(".mat-paginator-range-label").should("contain.text", "1 – 12 of 35")
        cy.get(".product").should("have.length", 12);

        // select 24 items per page 
        cy.get(".mat-select-min-line").click();
        cy.get("#mat-option-4").click();
        // validate that we see 24 boxes
        cy.get(".mat-paginator-range-label").should("contain.text", "1 – 24 of 35")
        cy.get(".product").should("have.length", 24);


        // select 36 items per page
        cy.get(".mat-select-min-line").click();
        cy.get("#mat-option-5").click();
        // validate that we can see 35 boxes
        cy.get(".mat-paginator-range-label").should("contain.text", "1 – 35 of 35")
        cy.get(".product").should("have.length", 35);

    });     
});