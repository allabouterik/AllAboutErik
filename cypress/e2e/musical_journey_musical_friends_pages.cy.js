import { musicalFriends } from '../fixtures/musicalFriends.json';

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

    if (friend.mediaItems) {
      friend.mediaItems.forEach((mediaItem, index) => {
        it(`the ${friend.name} media item no. ${
          index + 1
        } has the correct label`, () => {
          cy.get('.mediaItems')
            .eq(index)
            .find('.mediaItemsText')
            .should('contain.text', mediaItem.label);
        });

        if (mediaItem.type === 'imageGallery') {
          it(`the ${friend.name} media item no. ${index + 1} has ${
            mediaItem.count
          } images loaded`, () => {
            cy.get('.mediaItems').eq(index).click();

            for (let i = 0; i < mediaItem.count - 1; i++) {
              cy.get('#nextImageImg').click();
            }

            cy.get('.image-lightbox__content')
              .find('img.loaded')
              .should('have.length', mediaItem.count);
          });

          it(`the ${friend.name} media item no. ${
            index + 1
          } gallery can be closed`, () => {
            cy.get('#closeImg').click();
          });
        }

        if (mediaItem.type === 'videoGallery') {
          it(`the ${friend.name} media item no. ${index + 1} has ${
            mediaItem.count
          } vimeo videos loaded`, () => {
            cy.get('.mediaItems').eq(index).click();

            for (let i = 0; i < mediaItem.count - 1; i++) {
              cy.findVimeoPlayButton(i);

              if (i < mediaItem.count - 1) {
                cy.get('#nextVideoImg').click();
              }
            }
          });

          it(`the ${friend.name} media item no. ${
            index + 1
          } gallery can be closed`, () => {
            cy.get('#closeImg').click();
          });
        }

        if (mediaItem.type === 'link') {
          it(`the ${friend.name} media item no. ${
            index + 1
          } contains a link with the correct url`, () => {
            cy.get('.mediaItems')
              .eq(index)
              .should('have.attr', 'href')
              .should('include', friend.link);
          });
        }
      });
    }
  });
});
