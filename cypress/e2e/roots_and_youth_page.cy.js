import * as data from '../fixtures/rootsAndYouthVideos.json';
const { rootsAndYouthVideos } = data;

describe('Roots and Youth Page - standard tests', () => {
  it('successfully loads', () => {
    cy.visit('/roots-and-youth');
  });

  it('finds the Logo image', () => {
    cy.findPageTitleImg('rootsandyouth');
  });

  it('finds the audio playing icon', () => {
    cy.findAudioPlayingIcon();
  });

  it('audio is playing', () => {
    cy.expectPlayingAudio();
  });
});

describe('Roots and Youth Page - page specific tests', () => {
  it('has correct main text', () => {
    cy.get('#mainText').contains(
      'These documentary episodes track my life from my ancestry in Norway, ' +
        'through my boyhood, and continue to the end of my teenage years.'
    );
  });

  it('has scroll images', () => {
    cy.get('#scrollImgContainer')
      .find('img#scrollImg')
      .should('have.attr', 'alt')
      .should('include', 'Scroll text');

    cy.get('#scrollImgContainer')
      .find('img#scrollArrowImg')
      .should('have.attr', 'alt')
      .should('include', 'Scroll arrow');
  });

  it('clicking scroll container brings videos into view & title image out of view', () => {
    cy.get('#scrollImgContainer').click();
    cy.get('[data-testid="video-container"]').isScrolledTo();
    cy.get('#titleImg').isOutOfView();
  });

  it('has four video thumbnail videos', () => {
    cy.get('[data-testid="video-container"]').should('have.length', 4);
  });

  const checkVideoThumbnail = (index, alt, src) => {
    cy.get('[data-testid="video-container"]')
      .eq(index)
      .find('img')
      .should('have.attr', 'alt')
      .should('include', alt);

    cy.get('[data-testid="video-container"]')
      .eq(index)
      .find('img')
      .should('have.attr', 'src')
      .should('include', src);
  };

  const checkVideoThumbnailTextOverlay = (index, title, subtext) => {
    cy.get('[data-testid="video-container"]')
      .eq(index)
      .find('.thumbnailImgTextOverlay .videoTitle')
      .should('be.visible')
      .should('have.text', title);

    cy.get('[data-testid="video-container"]')
      .eq(index)
      .find('.thumbnailImgTextOverlay .videoSubText')
      .should('be.visible')
      .should('have.text', subtext);
  };

  const checkVideoThumbnailHover = (index, duration) => {
    cy.get('[data-testid="video-container"]').eq(index).realHover();

    cy.get('[data-testid="video-container"]')
      .eq(index)
      .find('img.thumbnailPlayVideoImg')
      .should('be.visible');

    cy.get('[data-testid="video-container"]')
      .eq(index)
      .find('.videoDurationText')
      .should('be.visible')
      .should('contain.text', duration);
  };

  const checkVideoLightbox = (index, title) => {
    cy.get('.video-lightbox__video-container')
      .eq(index)
      .find('.video-lightbox__text')
      .should('be.visible')
      .should('contain.text', title);

    cy.findVimeoPlayButton(index);

    cy.get('#closeImg').click().wait(500);
  };

  rootsAndYouthVideos.forEach((vid, index) => {
    it(`has the ${vid.title} video thumbnail`, () => {
      checkVideoThumbnail(index, vid.alt, vid.src);
    });

    it(`has the ${vid.title} video thumbnail text overlay`, () => {
      checkVideoThumbnailTextOverlay(index, vid.title, vid.subtext);
    });

    it(`hover on ${vid.title} thumbnail shows play icon and duration text`, () => {
      checkVideoThumbnailHover(index, vid.duration);
    });

    it(`clicking ${vid.title} thumbnail opens video lightbox with video loaded`, () => {
      cy.get('[data-testid="video-container"]').eq(index).realHover().click();

      cy.get('.video-lightbox')
        .find('.video-lightbox__modal')
        .should('be.visible');

      checkVideoLightbox(index, vid.title);
    });
  });

  it(`clicking complete film container opens video lightbox with video loaded`, () => {
    cy.get('.completeFilmContent').click();

    cy.get('.video-lightbox')
      .find('.video-lightbox__modal')
      .should('be.visible');

    const completeFilmTitle = 'Roots & Youth - The Complete Film';
    checkVideoLightbox(rootsAndYouthVideos.length, completeFilmTitle);
  });
});
