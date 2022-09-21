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
    cy.get('.videoThumbnailContainer').isScrolledTo();
    cy.get('#titleImg').isOutOfView();
  });

  it('has four video thumbnail videos', () => {
    cy.get('.videoThumbnailContainer').should('have.length', 4);
  });

  const checkVideoThumbnail = (index, alt, src) => {
    cy.get('.videoThumbnailContainer')
      .eq(index)
      .find('img')
      .should('have.attr', 'alt')
      .should('include', alt);

    cy.get('.videoThumbnailContainer')
      .eq(index)
      .find('img')
      .should('have.attr', 'src')
      .should('include', src);
  };

  const checkVideoThumbnailTextOverlay = (index, title, subtext) => {
    cy.get('.videoThumbnailContainer')
      .eq(index)
      .find('.thumbnailImgTextOverlay .videoTitle')
      .should('have.text', title);

    cy.get('.videoThumbnailContainer')
      .eq(index)
      .find('.thumbnailImgTextOverlay .videoSubText')
      .should('have.text', subtext);
  };

  const checkVideoThumbnailHover = (index, duration) => {
    cy.get('.videoThumbnailContainer').eq(index).realHover();
    cy.get('.videoThumbnailContainer')
      .eq(index)
      .find('img.thumbnailPlayVideoImg')
      .should('be.visible');
    cy.get('.videoThumbnailContainer')
      .eq(index)
      .find('.videoDurationText')
      .should('be.visible')
      .should('contain.text', duration);
  };

  const checkVideoLightbox = (index, title) => {    
    cy.get('.video-lightbox__video-container')
      .eq(index)
      .find('.video-lightbox__text')
      .should('contain.text', title);
    
    cy.getIframeBody(index)
      .find('.vp-controls button.play');

    cy.get('#closeImg')
      .click()
      .wait(500);
  }

  const videoThumbnails = [
    {
      title: 'Old Country',
      alt: 'Old Country',
      subtext: 'My relatives are all from Norway',
      duration: '3:08 min',
      src: 'oldcountry',
    },
    {
      title: 'War Baby',
      alt: 'War Baby',
      subtext: 'I was just a young boy during WWII',
      duration: '3:15 min',
      src: 'baby',
    },
    {
      title: 'Boyhood',
      alt: 'Boyhood',
      subtext: 'A typical mid-western boyhood',
      duration: '10:38 min',
      src: 'boyhood',
    },
    {
      title: 'Teen Years',
      alt: 'Teen Years',
      subtext: 'Erik, the teenager',
      duration: '10:32 min',
      src: 'teenyears',
    },
  ];

  videoThumbnails.forEach((vid, index) => {
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
      cy.get('.videoThumbnailContainer')
        .eq(index)
        .realHover()
        .click();

      cy.get('.video-lightbox')
        .find('.video-lightbox__modal')
        .should('be.visible');

      checkVideoLightbox(index, vid.title);
    });
  });

  it(`clicking complete film container opens video lightbox with video loaded`, () => {
    cy.get('.completeFilmContent')
      .click();

    cy.get('.video-lightbox')
      .find('.video-lightbox__modal')
      .should('be.visible');

    const completeFilmTitle = 'Roots & Youth - The Complete Film';
    checkVideoLightbox(videoThumbnails.length, completeFilmTitle);
  });
});
