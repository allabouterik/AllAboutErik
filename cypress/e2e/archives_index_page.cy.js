import * as data from '../fixtures/archives.json';
const { archives } = data;

describe('Archives Page - standard tests', () => {
  it('successfully loads', () => {
    cy.visit('/archives');
  });

  it('finds the Logo image', () => {
    cy.findPageTitleImg('archives_resized.png');
  });

  it('finds the audio playing icon', () => {
    cy.findAudioPlayingIcon();
  });

  it('audio is playing', () => {
    cy.expectBackgroundPlayingAudio();
  });
});

describe('Archives Page - page specific tests', () => {
  it('there is a slideshow with twelve images loaded', () => {
    cy.hasKenBurnsSlideshow(12);
  });

  it('has correct main text', () => {
    cy.get('#slideshowText').contains(
      'These archives are comprised of a potpourri of memorabilia.'
    );
    cy.get('#slideshowText').contains(
      'There’s a little music stuff, a few stories, flower pics from my garden, ' +
        'and lots of old photos of uncertain interest to anyone outside of my relatives or immediate family. '
    );
  });

  it('has scroll images', () => {
    cy.hasScrollImages();
  });

  it('the archives thumbnails section matches the saved image snapshot', () => {
    cy.get('#tilesContainer').wait(1000).toMatchImageSnapshot();
  });

  it('has 24 archive thumbnail links', () => {
    cy.get('[data-testid="archive-container"]').should('have.length', 24);
  });

  it('scrolling to bottom of page shows back to top button', () => {
    cy.scrollTo('bottom', { duration: 1500 });
    cy.get('main').find('#scrollToTopBtn').should('be.visible');
  });

  it('clicking back to top button scrolls the page to the top', () => {
    cy.get('main').find('#scrollToTopBtn').click();
    cy.get('[data-testid="title-img"]').isScrolledTo();
  });

  const checkArchiveThumbnail = (index, archive) => {
    cy.get('[data-testid="archive-container"]')
      .eq(index)
      .find('a')
      .should('have.attr', 'href')
      .should('include', archive.link);

    cy.get('[data-testid="archive-container"]')
      .eq(index)
      .find('img.hideOnHover')
      .should('have.attr', 'src')
      .should('include', archive.imgSrc);

    cy.get('[data-testid="archive-container"]')
      .eq(index)
      .find('img.hideOnHover')
      .should('be.visible')
      .and('have.prop', 'naturalWidth')
      .should('be.greaterThan', 0);
  };

  const checkArchiveThumbnailTextOverlay = (index, archive) => {
    cy.get('[data-testid="archive-container"]')
      .eq(index)
      .find('a.thumbnailContainer')
      .realHover()
      .find('img.showOnHover')
      .should('have.attr', 'src')
      .should('include', archive.imgSrcHover);

    cy.get('[data-testid="archive-container"]')
      .eq(index)
      .find('a.thumbnailContainer')
      .realHover()
      .find('img.showOnHover')
      .should('be.visible')
      .and('have.prop', 'naturalWidth')
      .should('be.greaterThan', 0);

    cy.get('[data-testid="archive-container"]')
      .eq(index)
      .find('a.thumbnailContainer')
      .realHover()
      .find('.thumbnailImgTextOverlay .showOnHover img')
      .and('have.attr', 'src')
      .should('include', 'eye.png');

    cy.get('[data-testid="archive-container"]')
      .eq(index)
      .find('a.thumbnailContainer')
      .realHover()
      .find('.thumbnailImgTextOverlay .showOnHover img')
      .should('be.visible')
      .and('have.prop', 'naturalWidth')
      .should('be.greaterThan', 0);
  };

  archives.forEach((archive, index) => {
    it(`has the ${archive.title} archive thumbnail`, () => {
      checkArchiveThumbnail(index, archive);
    });

    it(`has the ${archive.title} archive thumbnail overlay`, () => {
      checkArchiveThumbnailTextOverlay(index, archive);
    });
  });
});
