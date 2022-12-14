import * as data from '../fixtures/musicalFriendsMusic.json';
const { musicalFriendsMusicPages } = data;

describe('Musical Friends - Music Pages', () => {
  musicalFriendsMusicPages.forEach((page) => {
    it(`the ${page.title} page successfully loads`, () => {
      cy.visit(page.url);
    });

    it(`the ${page.title} page matches the saved image snapshot`, () => {
      cy.document()
        .wait(1000)
        .toMatchImageSnapshot();
    });

    it('has correct title', () => {
      cy.get('.heading').contains(page.title);
    });

    it('The play all button has the text Play All', () => {
      cy.get('button[data-testid="play-all"]').contains('Play All');
    });

    it(`Track 1 on the ${page.title} page plays when the play all button is clicked`, () => {
      cy.get('button[data-testid="play-all"]').click();
      cy.get('[data-testid="track-container"]')
        .eq(0)
        .expectAudioPlaying();
    });

    it('The text on the play all button has changed to Stop', () => {
      cy.get('button[data-testid="play-all"]').contains('Stop');
    });

    it(`Track 1 on the ${page.title} page stops playing when the play all button is clicked again`, () => {
      cy.get('button[data-testid="play-all"]').click();
      cy.get('[data-testid="track-container"]')
        .eq(0)
        .expectAudioNotPlaying();
    });

    it('The play all button has the text Play All again', () => {
      cy.get('button[data-testid="play-all"]').contains('Play All');
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

      it(`Track ${index + 1} on the ${
        page.title
      } page plays when the play button is clicked`, () => {
        cy.get('.plyr__controls button[data-plyr="play"]')
          .eq(index)
          .click();
        cy.get('[data-testid="track-container"]')
          .eq(index)
          .expectAudioPlaying();
      });

      it(`Track ${index + 1} on the ${
        page.title
      } page stops playing when the play button is clicked again`, () => {
        cy.get('.plyr__controls button[data-plyr="play"]')
          .eq(index)
          .click();
        cy.get('[data-testid="track-container"]')
          .eq(index)
          .expectAudioNotPlaying();
      });
    });

    it(`the ${page.title} page has a link back to the previous page`, () => {
      cy.get('.main-col')
        .find('a.nav_link')
        .should('have.attr', 'href')
        .should('include', page.url.slice(0, page.url.length - 6));
    });
  });
});
