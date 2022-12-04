import * as data from '../fixtures/collections.json';
const { collections } = data;

describe('Collections - Individual Pages', () => {
  collections.forEach((collection) => {
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
  });
});
