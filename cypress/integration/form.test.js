describe ("test our form", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/form");
    })
    it("add text to input to name", ()=>{
        cy.get('input[name="name"]') //remember to have ' ' outside and "" inside
        .type("Natalie")
        .should("have.value", "Natalie");
        // cy.get('#sizesID')
        // .select("Small")
        // .should("have.value", "Small");
        // cy.get('[type="checkbox"]').check();
        // .type("Natalie")
        // .should("have.value", "Natalie");

        cy.get("textarea") //remember to have ' ' outside and "" inside
        .type("instructions go here")
        .should("have.value", "instructions go here");

        

    })
})