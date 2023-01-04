import { shortFilmsVideos } from '../fixtures/shortFilmsVideos.json';

describe('Short Films Page - standard tests', () => {
  it('successfully loads', () => {
    cy.visit('/short-films');
  });

  it('finds the Logo image', () => {
    cy.findPageTitleImg('short-films');
  });

  it('finds the audio playing icon', () => {
    cy.findAudioPlayingIcon();
  });

  it('audio is playing', () => {
    cy.expectBackgroundPlayingAudio();
  });
});

describe('Short Films Page - page specific tests', () => {
  it('has main vimeo video autoplaying', () => {
    cy.getIframeBody(0).find('button[aria-label="Pause"]');
  });

  it('has eight video containers', () => {
    cy.get('[data-testid="video-container"]').should('have.length', 8);
  });

  it('scrolling to bottom of page shows back to top button', () => {
    cy.scrollTo('bottom', { duration: 500 });
    cy.get('main').find('#scrollToTopBtn').should('be.visible');
  });

  const checkVideoThumbnail = (index, src) => {
    cy.get('[data-testid="video-container"]')
      .eq(index)
      .find('img')
      .should('have.attr', 'src')
      .should('include', src);
  };

  const checkVideoThumbnailHover = (index, title, subtext, duration) => {
    cy.get('[data-testid="video-container"]')
      .eq(index)
      .find('.videoThumbnailContainer')
      .realHover();

    cy.get('[data-testid="video-container"]')
      .eq(index)
      .find('.videoTitle')
      .should('be.visible')
      .should('contain.text', title);

    cy.get('[data-testid="video-container"]')
      .eq(index)
      .find('.videoSubText')
      .should('contain.text', subtext);

    if (subtext.length <= 60) {
      cy.get('[data-testid="video-container"]')
        .eq(index)
        .find('.videoSubText')
        .should('be.visible');
    }

    cy.get('[data-testid="video-container"]')
      .eq(index)
      .find('.videoDurationText')
      .should('be.visible')
      .should('contain.text', duration);

    cy.get('[data-testid="video-container"]')
      .eq(index)
      .find('img.thumbnailPlayVideoImg')
      .should('be.visible');
  };

  const checkVideoLightboxText = (index, title) => {
    cy.get('.video-lightbox__video-container')
      .eq(index)
      .find('.video-lightbox__text')
      .should('contain.text', title);
  };

  shortFilmsVideos.forEach((vid, index) => {
    it(`has the ${vid.title} video thumbnail`, () => {
      checkVideoThumbnail(index, vid.imgSrc);
    });

    it(`hover on ${vid.title} thumbnail shows title, subText, duration and play icon`, () => {
      checkVideoThumbnailHover(index, vid.title, vid.subtext, vid.duration);
    });

    it(`clicking ${vid.title} container opens video lightbox with correct title`, () => {
      cy.get('[data-testid="video-container"]').eq(index).realHover().click();

      cy.get('.video-lightbox')
        .find('.video-lightbox__modal')
        .should('be.visible');

      checkVideoLightboxText(index, vid.videoTitle);
    });

    it(`${vid.title} lightbox has Vimeo play button`, () => {
      cy.findVimeoPlayButton(index + 1); // Adding 1 to account for main vimeo video at top of page
    });
    it(`${vid.title} lightbox can be closed`, () => {
      cy.get('#closeImg').click().wait(500);
    });
  });
});
