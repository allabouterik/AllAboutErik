import * as data from '../fixtures/collections.json';
const { collections } = data;

describe('Collections - Individual Pages', () => {
  collections.forEach((collection) => {
    if (collection.title === 'Old-Time Sportsmen') {
      return;
    }

    it(`the ${collection.title} page successfully loads`, () => {
      cy.visit(collection.link);
    });

    it(`the ${collection.title} page contains the main text`, () => {
      cy.get('.collection_headerText').should(
        'contain.text',
        collection.headerText
      );
    });

    it(`the ${collection.title} has ${collection.numImages} images loaded`, () => {
      cy.get('ul.collection-viewer__content')
        .find('li')
        .should('have.length', collection.numImages);
    });

    it(`the ${collection.title} has the navigation image for previous pg`, () => {
      cy.get('.collection-viewer #nav_prev.nav_link_big')
        .find('img.hideOnHover')
        .should('be.visible')
        .should('have.attr', 'src')
        .should('include', 'previous-collection-1line-white.png');
    });

    it(`the ${collection.title} has the navigation image on hover for previous pg`, () => {
      cy.get('.collection-viewer #nav_prev.nav_link_big')
        .realHover()
        .find('img.showOnHover')
        .should('be.visible')
        .should('have.attr', 'src')
        .should('include', 'previous-collection-1line-yellow.png');
    });

    it(`the ${collection.title} has the navigation image for next pg`, () => {
      cy.get('.collection-viewer #nav_next.nav_link_big')
        .find('img.hideOnHover')
        .should('be.visible')
        .should('have.attr', 'src')
        .should('include', 'next-collection-1line-white.png');
    });

    it(`the ${collection.title} has the navigation image on hover for next pg`, () => {
      cy.get('.collection-viewer #nav_next.nav_link_big')
        .realHover()
        .find('img.showOnHover')
        .should('be.visible')
        .should('have.attr', 'src')
        .should('include', 'next-collection-1line-yellow.png');
    });

    it(`the ${collection.title} has the navigation image for back to collections`, () => {
      cy.get('.collection-viewer #nav_back')
        .find('img.hideOnHover')
        .should('be.visible')
        .should('have.attr', 'src')
        .should('include', 'back-to-collections-menu-1line-white.png');
    });

    it(`the ${collection.title} has the navigation image on hover for back to collections`, () => {
      cy.get('.collection-viewer #nav_back')
        .realHover()
        .find('img.showOnHover')
        .should('be.visible')
        .should('have.attr', 'src')
        .should('include', 'back-to-collections-menu-1line-yellow.png');
    });
  });
});

describe('Collections - Old-Time Sportsmen', () => {
  const collection = collections.find((c) => c.title === 'Old-Time Sportsmen');

  it(`the ${collection.title} page successfully loads`, () => {
    cy.visit(collection.link);
  });

  it(`the ${collection.title} page contains the main text`, () => {
    cy.get('.collection_headerText').should(
      'contain.text',
      collection.headerText
    );
  });

  it(`the ${collection.title} has ${collection.numImages} images loaded`, () => {
    cy.get('ul.collection-viewer__content')
      .find('li')
      .should('have.length', collection.numImages);
  });

  it(`the ${collection.title} has the navigation image for previous pg`, () => {
    cy.get('.collection-viewer #nav_prev.nav_link_big')
      .find('img.hideOnHover')
      .should('be.visible')
      .should('have.attr', 'src')
      .should('include', 'previous-collection-1line-white.png');
  });

  it(`the ${collection.title} has the navigation image on hover for previous pg`, () => {
    cy.get('.collection-viewer #nav_prev.nav_link_big')
      .realHover()
      .find('img.showOnHover')
      .should('be.visible')
      .should('have.attr', 'src')
      .should('include', 'previous-collection-1line-yellow.png');
  });

  it(`the ${collection.title} has the navigation image for next pg`, () => {
    cy.get('.collection-viewer #nav_next.nav_link_big')
      .find('img.hideOnHover')
      .should('be.visible')
      .should('have.attr', 'src')
      .should('include', 'next-collection-1line-white.png');
  });

  it(`the ${collection.title} has the navigation image on hover for next pg`, () => {
    cy.get('.collection-viewer #nav_next.nav_link_big')
      .realHover()
      .find('img.showOnHover')
      .should('be.visible')
      .should('have.attr', 'src')
      .should('include', 'next-collection-1line-yellow.png');
  });

  it(`the ${collection.title} has the navigation image for back to collections`, () => {
    cy.get('header #nav_back')
      .find('img.hideOnHover')
      .should('be.visible')
      .should('have.attr', 'src')
      .should('include', 'back-to-collections-menu-1line-black.png');
  });

  it(`the ${collection.title} has the navigation image on hover for back to collections`, () => {
    cy.get('header #nav_back')
      .realHover()
      .find('img.showOnHover')
      .should('be.visible')
      .should('have.attr', 'src')
      .should('include', 'back-to-collections-menu-1line-yellow.png');
  });

  it('scrolling to bottom of page shows back to top button', () => {
    cy.scrollTo('bottom', { duration: 500 });
    cy.get('main')
      .find('#backToTopStaticDiv img.g-image--loaded')
      .should('be.visible')
      .should('have.attr', 'src')
      .should('include', 'back-to-top-1line-black.png');
  });

  it('clicking back to top button scrolls the page to the top', () => {
    cy.get('main').find('#backToTopStaticDiv img.g-image--loaded').click();
    cy.get('.titleImg').isScrolledTo();
  });
});
