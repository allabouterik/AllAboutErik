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
    cy.expectPlayingAudio();
  });
});

describe('Short Films Page - page specific tests', () => {
  it('has main vimeo video autoplaying', () => {
    cy.getIframeBody(0).find('.vp-controls button.play.state-playing');
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

  const checkVideoLightboxVimeoPlayBtn = (index) => {
    cy.getIframeBody(index).find('.vp-controls button.play');
    cy.get('#closeImg').click().wait(500);
  };

  const videoThumbnails = [
    {
      title: "Fishin' Fool",
      subtext: "I've done an awful lot of fishing.",
      duration: '2:02 min',
      imgSrc: '01-perch-string',
      videoTitle: "Fishin' Fool",
    },
    {
      title: 'In a Nutshell',
      subtext: 'Erik in a nutshell',
      duration: '5:12 min',
      imgSrc: '02-cascade5',
      videoTitle: 'In a Nutshell',
    },
    {
      title: "Travelin' Man",
      subtext: 'A lot of travelling.',
      duration: '2:53 min',
      imgSrc: '03-bamian',
      videoTitle: "Travelin' Man",
    },
    {
      title: 'Barracuda Shoal of Death',
      subtext: 'Diving in Borneo',
      duration: '0:54 min',
      imgSrc: '04-erik-scuba',
      videoTitle: 'Barracuda Shoal of Death',
    },
    {
      title: 'The Blue Goose',
      subtext: 'Living on the docks in Sausalito during the 1970s.',
      duration: '6:54 min',
      imgSrc: '05-bluegoose',
      videoTitle: 'The Blue Goose',
    },
    {
      title: 'Dining with Chunky',
      subtext: "Let's eat again real soon.",
      duration: '18:49 min',
      imgSrc: '06-diningwithchunky',
      videoTitle: 'Dining with Chunky',
    },
    {
      title: 'Old-Time Sportsmen Book Promo',
      subtext:
        "Promotional piece for my fascinating self-published book featuring early 1900's hunting and fishing photography.",
      duration: '3:23 min',
      imgSrc: '07-573-thumbnail',
      videoTitle: 'Old-Time Sportsmen Book Promo',
    },
    {
      title: 'Alfalfa Improv 1967',
      subtext: 'An ad-lib with Clem on the subject of alfalfa sprouts.',
      duration: '1:27 min',
      imgSrc: '08-alfalfasprout',
      videoTitle: 'Alfalfa Improv 1967',
    },
  ];

  videoThumbnails.forEach((vid, index) => {
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
      checkVideoLightboxVimeoPlayBtn(index + 1); // Adding 1 to account for main vimeo video at top of page
    });
  });
});
