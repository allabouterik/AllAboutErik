import * as data from '../fixtures/musicalFriends.json';
const { musicalFriends } = data;

describe('Musical Friends - Individual Pages', () => {
  musicalFriends.forEach((friend) => {
    it(`the ${friend.name} page successfully loads`, () => {
      cy.visit(`/musical-journey/musical-friends/${friend.link}`);
    });

    it(`the ${friend.name} page has the correct title`, () => {
      cy.get('.headingMain').should('contain.text', friend.name);
    });

    it(`the ${friend.name} page contains the main text`, () => {
      cy.get('#mainContent').should('contain.text', friend.text);
    });
  });
});
