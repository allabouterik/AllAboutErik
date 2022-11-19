import * as data from '../fixtures/earlyProductions.json';
const { productions } = data;

describe('Early Productions Page - standard tests', () => {
  it('successfully loads', () => {
    cy.visit('/musical-journey/early-productions');
  });

  it('finds the Logo image', () => {
    cy.findPageTitleImg('early_productions');
  });

  it('finds the audio playing icon', () => {
    cy.findAudioPlayingIcon();
  });

  it('audio is playing', () => {
    cy.expectBackgroundPlayingAudio();
  });
});

describe('Early Productions Page - page specific tests', () => {
  it('has correct main text', () => {
    cy.get('#mainImgText').contains(
      'When I came off the road with the Knoblick Upper 10,000, I settled down in Greenwich Village in 1964 to write songs, look for artists, and make records'
    );
  });

  it('has correct main image', () => {
    cy.get('#mainImg')
      .should('have.attr', 'src')
      .should('include', 'img312-2_-_Cropped');
  });

  it('has 15 production sections', () => {
    cy.get('[data-testid="production-container"]').should('have.length', 15);
  });

  it('scrolling to bottom of page shows back to top button', () => {
    cy.scrollTo('bottom', { duration: 500 });
    cy.get('main').find('#scrollToTopBtn').should('be.visible');
  });

  it('clicking back to top button scrolls the page to the top', () => {
    cy.get('main').find('#scrollToTopBtn').click();
    cy.get('#titleImg').isScrolledTo();
  });

  productions.forEach((production, index) => {
    if (production.hasOwnProperty('title')) {
      it(`Production ${index + 1} has the correct title: ${
        production.title
      }`, () => {
        cy.get('[data-testid="production-container"]')
          .eq(index)
          .find('.title')
          .should('contain.text', production.title);
      });
    }
    if (production.hasOwnProperty('title2')) {
      it(`Production ${index + 1} has the correct second title: ${
        production.title2
      }`, () => {
        cy.get('[data-testid="production-container"]')
          .eq(index)
          .find('.title')
          .should('contain.text', production.title2);
      });
    }

    it(`Production ${index + 1} has the correct image loaded`, () => {
      cy.get('[data-testid="production-container"]')
        .eq(index)
        .find('.imgAndTracksDiv img')
        .should('have.attr', 'src')
        .should('include', production.imgSrc);
    });
    if (production.hasOwnProperty('imgSrc2')) {
      it(`Production ${index + 1} has the correct second image loaded`, () => {
        cy.get('[data-testid="production-container"]')
          .eq(index)
          .find('.imgAndTracksDiv img')
          .eq(1)
          .should('have.attr', 'src')
          .should('include', production.imgSrc2);
      });
    }

    it(`Production ${
      index + 1
    } has the correct background image loaded`, () => {
      cy.get('[data-testid="production-container"]')
        .eq(index)
        .find('.tracksDiv')
        .after('background')
        .should('include', production.bgImgSrc);
    });
    if (production.hasOwnProperty('bgImgSrc2')) {
      it(`Production ${
        index + 1
      } has the correct second background image loaded`, () => {
        cy.get('[data-testid="production-container"]')
          .eq(index)
          .find('.tracksDiv')
          .eq(1)
          .after('background')
          .should('include', production.bgImgSrc2);
      });
    }

    it(`Production ${index + 1} has the correct creditsText`, () => {
      cy.get('[data-testid="production-container"]')
        .eq(index)
        .find('.titleText')
        .should('contain.text', production.creditsText);
    });
    if (production.hasOwnProperty('creditsText2')) {
      it(`Production ${index + 1} has the correct second creditsText`, () => {
        cy.get('[data-testid="production-container"]')
          .eq(index)
          .find('.titleText')
          .should('contain.text', production.creditsText2);
      });
    }

    if (production.hasOwnProperty('body')) {
      it(`Production ${index + 1} has the correct body text`, () => {
        cy.get('[data-testid="production-container"]')
          .eq(index)
          .find('.body')
          .should('contain.text', production.body);
      });
    }
    if (production.hasOwnProperty('body2')) {
      it(`Production ${index + 1} has the correct second body text`, () => {
        cy.get('[data-testid="production-container"]')
          .eq(index)
          .find('.body')
          .should('contain.text', production.body2);
      });
    }

    if (production.hasOwnProperty('lightboxes')) {
      production.lightboxes.forEach((lightbox, lbIndex) => {
        it(`Production ${index + 1} lightbox ${
          lbIndex + 1
        } has the correct button text`, () => {
          cy.get('[data-testid="production-container"]')
            .eq(index)
            .find('.lightBoxBtn')
            .eq(lbIndex)
            .should('contain.text', lightbox.text);
        });

        if (lightbox.type === 'image') {
          it(`Production ${index + 1} lightbox ${
            lbIndex + 1
          } opens correct image when clicked on`, () => {
            cy.get('[data-testid="production-container"]')
              .eq(index)
              .find('.lightBoxBtn')
              .eq(lbIndex)
              .click();

            cy.get('.image-lightbox__content')
              .find('img.loaded', { timeout: 6000 })
              .should('have.length', 1);

            cy.get('.image-lightbox__content')
              .find('img.loaded')
              .should('have.attr', 'src')
              .should('include', lightbox.imgSrc);
          });

          it(`Production ${index + 1} lightbox ${
            lbIndex + 1
          } can be closed`, () => {
            cy.get('#closeImg').click();
          });
        }

        if (lightbox.type === 'audio') {
          it(`Production ${index + 1} lightbox ${
            lbIndex + 1
          } opens correct audio when clicked on`, () => {
            cy.get('[data-testid="production-container"]')
              .eq(index)
              .find('.lightBoxBtn')
              .eq(lbIndex)
              .click();

            cy.get('.audio-lightbox__content')
              .find('iframe.audioFrame.loaded')
              .should('have.length', 1);

            cy.get('.audio-lightbox__content')
              .find('iframe.audioFrame.loaded')
              .should('have.attr', 'src')
              .should('include', lightbox.audioSrc);
          });

          it(`Production ${index + 1} lightbox ${
            lbIndex + 1
          } can be closed`, () => {
            cy.get('#closeImg').click();
          });
        }
      });
    }

    production.tracks.forEach((track, trackIndex) => {
      it(`Production ${index + 1} track ${
        trackIndex + 1
      } has the correct title`, () => {
        cy.get('[data-testid="production-container"]')
          .eq(index)
          .find('.trackTitleText')
          .eq(trackIndex)
          .should('contain.text', track.title);
      });

      it(`Production ${index + 1} track ${
        trackIndex + 1
      } has the correct time`, () => {
        cy.get('[data-testid="production-container"]')
          .eq(index)
          .find('.plyr__time')
          .eq(trackIndex)
          .should('contain.text', track.time);
      });
    });
  });
});
