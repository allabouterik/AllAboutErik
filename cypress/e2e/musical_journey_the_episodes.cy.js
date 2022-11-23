import * as data from '../fixtures/theEpisodesVideos.json';
const { theEpisodesVideos } = data;

describe('The Episodes Page - standard tests', () => {
  it('successfully loads', () => {
    cy.visit('/musical-journey/the-episodes');
  });

  it('finds the Logo image', () => {
    cy.findPageTitleImg('the_episodes');
  });

  it('finds the audio playing icon', () => {
    cy.findAudioPlayingIcon();
  });

  it('audio is playing', () => {
    cy.expectBackgroundPlayingAudio();
  });
});

describe('The Episodes Page - page specific tests', () => {
  it('has correct main text', () => {
    cy.get('#mainImgText').contains(
      'Watch these documentary episodes which span my musical journey, ' +
        'from early music fan to musician, writer, producer and publisher.'
    );
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

  const checkVideoRowText = (index, title, subtext, duration) => {
    cy.get('[data-testid="video-container"]')
      .eq(index)
      .find('.videoTitle')
      .should('contain.text', title);

    cy.get('[data-testid="video-container"]')
      .eq(index)
      .find('.videoSubText')
      .should('contain.text', subtext);

    cy.get('[data-testid="video-container"]')
      .eq(index)
      .find('.videoDurationText')
      .should('be.visible')
      .should('contain.text', duration);
  };

  const checkVideoLightboxText = (index, title) => {
    cy.get('.video-lightbox__video-container')
      .eq(index)
      .find('.video-lightbox__text', { timeout: 6000 })
      .should('be.visible')
      .should('contain.text', title);
  };

  const checkVideoLightboxHasVideo = (index) => {
    cy.getIframeBody(index).find('video');
    cy.get('#closeImg').click().wait(500);
  };

  theEpisodesVideos.forEach((vid, index) => {
    it(`has the ${vid.title} video thumbnail`, () => {
      checkVideoThumbnail(index, vid.imgSrc);
    });

    it(`has the ${vid.title} video thumbnail text`, () => {
      checkVideoRowText(index, vid.title, vid.subtext, vid.duration);
    });

    it(`clicking ${vid.title} container opens video lightbox with correct title`, () => {
      cy.get('[data-testid="video-container"]').eq(index).realHover().click();

      cy.get('.video-lightbox')
        .find('.video-lightbox__modal')
        .should('be.visible');

      checkVideoLightboxText(index, vid.videoTitle);
    });

    if (index < theEpisodesVideos.length - 1) {
      it(`${vid.title} lightbox has Vimeo play button`, () => {
        cy.findVimeoPlayButton(index);
      });
      it(`${vid.title} lightbox can be closed`, () => {
        cy.get('#closeImg').click().wait(500);
      });
    } else {
      it(`${vid.title} lightbox has video loaded`, () => {
        checkVideoLightboxHasVideo(index);
      });
    }
  });
});
