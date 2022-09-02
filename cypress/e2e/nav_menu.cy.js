describe('The Navigation', () => {
  Cypress.Commands.add('checkNavIsClosed', () => {
    cy.get('#sideNav-main').should('not.have.class', 'sideNavOpen');
  });

  Cypress.Commands.add('checkNavIsOpen', () => {
    cy.get('#sideNav-main').should('have.class', 'sideNavOpen');
  });

  it('successfully loads the home page', () => {
    cy.visit('/');
  });

  it('finds the nav open button image', () => {
    cy.get('.openbtn')
      .find('img')
      .should('have.attr', 'alt')
      .should('include', 'Open navigation menu');
  });

  it('the nav menu is closed', () => {
    cy.checkNavIsClosed();
  });

  it('is able to open the nav menu using the non-hover menu image', () => {
    cy.get('.openbtn img:first-child').click();
    cy.checkNavIsOpen();
  });

  it('finds the nav close button image', () => {
    cy.get('.closebtn')
      .find('img')
      .should('have.attr', 'alt')
      .should('include', 'Close navigation menu');
  });

  it('can close the nav by clicking the non-hover close image', () => {
    cy.get('.closebtn img:first-child').click();
    cy.checkNavIsClosed();
  });

  it('is able to open the nav menu using the hover menu image', () => {
    cy.get('.openbtn').realHover();
    cy.get('.openbtn img:nth-child(2)').should('be.visible');
    cy.get('.openbtn img:nth-child(2)').click();
    cy.checkNavIsOpen();
  });

  it('can close the nav by clicking the hover close image', () => {
    cy.get('.closebtn').realHover();
    cy.get('.closebtn img:nth-child(2)').should('be.visible');
    cy.get('.closebtn img:nth-child(2)').click();
    cy.checkNavIsClosed();
  });
});
