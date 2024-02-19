describe('Pizza Order Form Tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173/OrderPizza');
    });

    it('should fill input field with text', () => {
        const inputText = 'Bur Zen';
        cy.get('input[name="ad"]').type(inputText);
    });

    it('should select multiple ingredients', () => {
        cy.get('input[name="ekmalzemeler"]').check(['biber', 'domates', 'mısır']);
        cy.get('input[name="ekmalzemeler"]:checked').should('have.length', 3);
    });

    it('should submit the form', () => {
        cy.get('input[name="ad"]').type('Bur Zen');
        cy.get('input[name="boyut"][value="küçük"]').check();
        cy.get('select[name="hamur"]').select('İnce');
        cy.get('input[name="ekmalzemeler"]').check(['biber', 'domates', 'ananas', 'sosis']);
        cy.get('input[name="siparisnotu"]').type('Ekstra sıcak olsun lütfen.');
        cy.get('button').contains('SİPARİŞİ VER').click();
        cy.url().should('include', '/Completed');
    });

});