import { travelVideos } from '../fixtures/travelVideos.json';

describe('Travels Page - standard tests', () => {
  it('successfully loads', () => {
    cy.visit('/travels');
  });

  it('finds the Logo image', () => {
    cy.findPageTitleImg('travels');
  });
});

describe('Travels Page - page specific tests', () => {
  it('has main vimeo video autoplaying', () => {
    cy.getIframeBody(0).find('button[aria-label="Pause"]', { timeout: 10000 });
  });

  it('has correct main text', () => {
    cy.get('#mainVideoText').contains(
      'Watch the travel documentaries that I shot on location, wrote, ' +
        'narrated, and set to regional music'
    );
  });

  it('has 54 video containers', () => {
    cy.get('[data-testid="video-container"]').should('have.length', 54);
  });

  it('scrolling to bottom of page shows back to top button', () => {
    cy.scrollTo('bottom', { duration: 500 });
    cy.get('main').find('#scrollToTopBtn').should('be.visible');
  });

  const checkVideoThumbnail = (index, src, title) => {
    cy.get('[data-testid="video-container"]')
      .eq(index)
      .find('img')
      .should('have.attr', 'src')
      .should('include', src);

    cy.get('[data-testid="video-container"]')
      .eq(index)
      .find('.videoTitle')
      .should('be.visible')
      .should('contain.text', title);
  };

  const checkVideoThumbnailHover = (index, title, duration) => {
    cy.get('[data-testid="video-container"]')
      .eq(index)
      .find('.videoThumbnailContainer')
      .realHover();

    cy.get('[data-testid="video-container"]')
      .eq(index)
      .find('.thumbnailImgTextOverlay .playVideoText', { timeout: 8000 })
      .should('be.visible')
      .should('contain.text', 'PLAY VIDEO');

    cy.get('[data-testid="video-container"]')
      .eq(index)
      .find('.thumbnailImgTextOverlay .videoDurationText', { timeout: 8000 })
      .should('be.visible')
      .should('contain.text', duration);

    cy.get('[data-testid="video-container"]')
      .eq(index)
      .find('.captionBanner .videoTitle', { timeout: 8000 })
      .should('be.visible')
      .should('contain.text', title);
  };

  const checkVideoLightboxText = (index, title) => {
    cy.get('.video-lightbox__video-container')
      .eq(index)
      .find('.video-lightbox__text', { timeout: 8000 })
      .should('contain.text', title);
  };

  travelVideos.forEach((vid, index) => {
    it(`has the ${vid.title} video thumbnail and title text`, () => {
      checkVideoThumbnail(index, vid.imgSrc, vid.title);
    });

    it(`hover on ${vid.title} thumbnail shows play video text, duration and title`, () => {
      checkVideoThumbnailHover(index, vid.title, vid.duration);
    });

    it(`clicking ${vid.title} container opens video lightbox with correct title`, () => {
      cy.get('[data-testid="video-container"]')
        .eq(index)
        .click({ force: true });

      cy.get('.video-lightbox')
        .find('.video-lightbox__modal')
        .should('be.visible');

      checkVideoLightboxText(index, vid.title);
    });

    it(`${vid.title} lightbox has Vimeo play button`, () => {
      cy.findVimeoPlayButton(index + 1); // Adding 1 to account for main vimeo video at top of page
    });

    it(`${vid.title} Vimeo has the expected duration`, () => {
      cy.getIframeBody(index + 1) // Adding 1 to account for main vimeo video at top of page
        .find(`.vp-controls .vp-progress`, { timeout: 10000 })
        .should('contain.text', vid.duration.substring(0, 5).trimEnd());
    });

    it(`${vid.title} lightbox can be closed`, () => {
      cy.get('#closeImg').click().wait(500);
    });
  });
});
