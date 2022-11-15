import * as data from '../fixtures/musicalFriendsMusic.json';
const { musicalFriendsMusicPages } = data;

describe('Musical Friends - Music Pages', () => {
  musicalFriendsMusicPages.forEach((page) => {
    it(`the ${page.title} page successfully loads`, () => {
      cy.visit(page.url);
    });

    it('has correct title', () => {
      cy.get('.heading').contains(page.title);
    });

    page.tracks.forEach((track, index) => {
      it(`Track ${index + 1} on the ${
        page.title
      } page has the correct title`, () => {
        cy.get('[data-testid="track-container"]')
          .eq(index)
          .find('.trackTitle')
          .should('contain.text', track.title);
      });

      if (track.hasOwnProperty('caption')) {
        it(`Track ${index + 1} on the ${
          page.title
        } page has the correct caption`, () => {
          cy.get('[data-testid="track-container"]')
            .eq(index)
            .find('.trackCaption')
            .should('contain.text', track.caption);
        });
      }

      if (track.hasOwnProperty('imgSrc')) {
        it(`Track ${index + 1} on the ${
          page.title
        } page has the correct image`, () => {
          cy.get('[data-testid="track-container"]')
            .eq(index)
            .find('.trackImg')
            .should('have.attr', 'src')
            .should('include', track.imgSrc);
        });
      }
    });
  });
});
