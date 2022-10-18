import * as data from '../fixtures/musicalFriends.json';
const { musicalFriends } = data;

describe('Musical Friends Page - test links to individual friend pages', () => {
  beforeEach(() => {
    cy.visit('/musical-journey/musical-friends');
  });

  musicalFriends.forEach((friend) => {
    it(`the ${friend.name} card has a button that links to the details page`, () => {
      const orderIndex = friend.orderSmallDesktop - 1;

      cy.get('[data-testid="friend-card"]')
        .eq(orderIndex)
        .find('.seeMoreBtnContainer a')
        .should('have.attr', 'href')
        .should('include', friend.link);

      cy.get('[data-testid="friend-card"]')
        .eq(orderIndex)
        .find('.seeMoreBtn')
        .should('contain.text', '...see more');

      cy.get('[data-testid="friend-card"]')
        .eq(orderIndex)
        .find('.seeMoreBtnContainer a')
        .click();

      cy.url().should(
        'include',
        `musical-journey/musical-friends/${friend.link}`
      );
    });
  });
});
