import * as data from '../fixtures/publications.json';
const { publications } = data;

describe('Publications - Individual Pages', () => {
  publications.forEach((publication) => {
    it(`${publication.title} page successfully loads`, () => {
      cy.visit(publication.link);
    });

    it(`${publication.title} page matches the saved image snapshot`, () => {
      cy.document()
        .wait(1000)
        .toMatchImageSnapshot();
    });

    if (publication.hasOwnProperty('headerText')) {
      it(`${publication.title} page contains the header text`, () => {
        cy.get('.publication_headerText').should(
          'contain.text',
          publication.headerText
        );
      });
    }

    if (publication.hasOwnProperty('headerText2')) {
      it(`${publication.title} page contains the second part of the header text`, () => {
        cy.get('.publication_headerText').should(
          'contain.text',
          publication.headerText2
        );
      });
    }

    it(`${publication.title} has the navigation image for previous pg`, () => {
      cy.get('[data-testid="main-content"] #nav_prev.nav_link_small')
        .find('img.hideOnHover')
        .should('be.visible')
        .should('have.attr', 'src')
        .should('include', 'previous-publication-2lines-white.png');

      cy.get('[data-testid="main-content"] #nav_prev.nav_link_small')
        .find('img.hideOnHover')
        .should('be.visible')
        .and('have.prop', 'naturalWidth')
        .should('be.greaterThan', 0);
    });

    it(`${publication.title} has the navigation image on hover for previous pg`, () => {
      cy.get('[data-testid="main-content"] #nav_prev.nav_link_small')
        .realHover()
        .find('img.showOnHover')
        .should('be.visible')
        .should('have.attr', 'src')
        .should('include', 'previous-publication-2lines-yellow.png');

      cy.get('[data-testid="main-content"] #nav_prev.nav_link_small')
        .realHover()
        .find('img.showOnHover')
        .should('be.visible')
        .and('have.prop', 'naturalWidth')
        .should('be.greaterThan', 0);
    });

    it(`${publication.title} has the navigation image for next pg`, () => {
      cy.get('[data-testid="main-content"] #nav_next.nav_link_small')
        .find('img.hideOnHover')
        .should('be.visible')
        .should('have.attr', 'src')
        .should('include', 'next-publication-2lines-white.png');

      cy.get('[data-testid="main-content"] #nav_next.nav_link_small')
        .find('img.hideOnHover')
        .should('be.visible')
        .and('have.prop', 'naturalWidth')
        .should('be.greaterThan', 0);
    });

    it(`${publication.title} has the navigation image on hover for next pg`, () => {
      cy.get('[data-testid="main-content"] #nav_next.nav_link_small')
        .realHover()
        .find('img.showOnHover')
        .should('be.visible')
        .should('have.attr', 'src')
        .should('include', 'next-publication-2lines-yellow.png');

      cy.get('[data-testid="main-content"] #nav_next.nav_link_small')
        .realHover()
        .find('img.showOnHover')
        .should('be.visible')
        .and('have.prop', 'naturalWidth')
        .should('be.greaterThan', 0);
    });

    it(`${publication.title} has the navigation image for back to publications menu`, () => {
      cy.get('[data-testid="main-content"] #nav_back.nav_link_small')
        .find('img.hideOnHover')
        .should('be.visible')
        .should('have.attr', 'src')
        .should('include', 'back-to-publications-menu-3lines-white.png');

      cy.get('[data-testid="main-content"] #nav_back.nav_link_small')
        .find('img.hideOnHover')
        .should('be.visible')
        .and('have.prop', 'naturalWidth')
        .should('be.greaterThan', 0);
    });

    it(`${publication.title} has the navigation image on hover for back to publications menu`, () => {
      cy.get('[data-testid="main-content"] #nav_back.nav_link_small')
        .realHover()
        .find('img.showOnHover')
        .should('have.attr', 'src')
        .should('include', 'back-to-publications-menu-3lines-yellow.png');

      cy.get('[data-testid="main-content"] #nav_back.nav_link_small')
        .realHover()
        .find('img.showOnHover')
        .should('be.visible')
        .and('have.prop', 'naturalWidth')
        .should('be.greaterThan', 0);
    });
  });
});
