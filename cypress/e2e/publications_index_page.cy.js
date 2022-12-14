import * as data from '../fixtures/publications.json';
const { publications } = data;

describe('Publications Page - standard tests', () => {
  it('successfully loads', () => {
    cy.visit('/publications');
  });

  it('finds the Logo image', () => {
    cy.findPageTitleImg('publications-white-with-drop-shadow');
  });

  it('finds the audio playing icon', () => {
    cy.findAudioPlayingIcon();
  });

  it('audio is playing', () => {
    cy.expectBackgroundPlayingAudio();
  });
});

describe('Publications Page - page specific tests', () => {
  it('there is a slideshow with four images loaded', () => {
    cy.get('.SlideshowKenBurns img')
      .should('have.length', 4)
      .should('be.visible')
      .and('have.prop', 'naturalWidth')
      .should('be.greaterThan', 0);
  });

  it('the publications thumbnails section matches the saved image snapshot', () => {
    cy.get('.publicationsRow')
      .wait(1000)
      .toMatchImageSnapshot();
  });

  it('has six publication thumbnail links', () => {
    cy.get('[data-testid="publication-container"]').should('have.length', 6);
  });

  const checkPublicationThumbnail = (index, publication) => {
    cy.get('[data-testid="publication-container"]')
      .eq(index)
      .find('a')
      .should('have.attr', 'href')
      .should('include', publication.link);

    cy.get('[data-testid="publication-container"]')
      .eq(index)
      .find('img.hideOnHover')
      .should('have.attr', 'src')
      .should('include', publication.imgSrc);

    cy.get('[data-testid="publication-container"]')
      .eq(index)
      .find('img.hideOnHover')
      .should('be.visible')
      .and('have.prop', 'naturalWidth')
      .should('be.greaterThan', 0);
  };

  const checkPublicationThumbnailTextOverlay = (index, publication) => {
    cy.get('[data-testid="publication-container"]')
      .eq(index)
      .realHover()
      .find('img.showOnHover')
      .should('have.attr', 'src')
      .should('include', publication.imgSrcHover);

    cy.get('[data-testid="publication-container"]')
      .eq(index)
      .realHover()
      .find('img.showOnHover')
      .should('be.visible')
      .and('have.prop', 'naturalWidth')
      .should('be.greaterThan', 0);

    cy.get('[data-testid="publication-container"]')
      .eq(index)
      .realHover()
      .find('a.publication .hoverText')
      .should('be.visible')
      .should('have.text', 'MORE INFO');
  };

  publications.forEach((publication, index) => {
    it(`has the ${publication.title} publication thumbnail`, () => {
      checkPublicationThumbnail(index, publication);
    });

    it(`has the ${publication.title} publication thumbnail overlay`, () => {
      checkPublicationThumbnailTextOverlay(index, publication);
    });
  });

  it('scrolling to bottom of page shows back to top button', () => {
    cy.scrollTo('bottom', { duration: 1500 });
    cy.get('main')
      .find('#scrollToTopBtn')
      .should('be.visible');
  });

  it('clicking back to top button scrolls the page to the top', () => {
    cy.get('main')
      .find('#scrollToTopBtn')
      .click();
    cy.get('[data-testid="title-img"]').isScrolledTo();
  });
});
