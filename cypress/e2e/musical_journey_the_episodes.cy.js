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
    cy.expectPlayingAudio();
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

  const checkVideoLightboxVimeoPlayBtn = (index) => {
    cy.getIframeBody(index).find('.vp-controls button.play');
    cy.get('#closeImg').click().wait(500);
  };

  const checkVideoLightboxHasVideo = (index) => {
    cy.getIframeBody(index).find('video');
    cy.get('#closeImg').click().wait(500);
  };

  const videoThumbnails = [
    {
      title: 'How it Began',
      subtext:
        'Erik recounts the unique musical influences that have informed his journey',
      duration: '4:45 min',
      imgSrc: 'episode_1_skinnylegs',
      videoTitle: 'Episode One - How it Began',
    },
    {
      title: 'Knoblick',
      subtext:
        'He becomes a professional banjo player with his bluegrass group, The Knoblick Upper 10,000',
      duration: '7:37 min',
      imgSrc: 'episode_2_image',
      videoTitle: 'Episode Two - Knoblick',
    },
    {
      title: 'The Aspiring Entrepreneur',
      subtext:
        'He puts down his banjo to become a producer and publisher, and discovers John Sebastian and Tim Hardin, and records the prototypes of folk rock',
      duration: '7:06 min',
      imgSrc: 'episode_3_image',
      videoTitle: 'Episode Three - The Aspiring Entrepreneur',
    },
    {
      title: 'Music Magnate',
      subtext:
        "Wherein he hits it big with The Lovin' Spoonful and records Tim Hardin, The Charlatans, and The Sopwith Camel",
      duration: '18:14 min',
      imgSrc: 'episode_3_alt_image',
      videoTitle: 'Episode Four - Music Magnate',
    },
    {
      title: 'San Francisco Late Sixties',
      subtext:
        'Erik moves to San Francisco and goes #1 with Norman Greenbaum and others',
      duration: '20:02 min',
      imgSrc: 'episode_5_image',
      videoTitle: 'Episode Five - San Francisco Late Sixties',
    },
    {
      title: 'The Seventies',
      subtext: 'He keeps on recording',
      duration: '11:08 min',
      imgSrc: 'episode_6_image',
      videoTitle: 'Episode Six - The Seventies',
    },
    {
      title: 'The Eighties and Onward',
      subtext:
        'Erik hooks up with Chris Isaak and together they produce some great work, including the classic "Wicked Game',
      duration: '17:58 min',
      imgSrc: 'episode_7_image',
      videoTitle: 'Episode Seven - The Eighties and Onward',
    },
    {
      title: "Erik's Musical Journey",
      subtext:
        'Watch all of the episodes together in the complete Musical Journey film',
      duration: '1 hr 27 min',
      imgSrc: 'img020-2',
      videoTitle: "Erik's Musical Journey - The Complete Film",
    },
  ];

  videoThumbnails.forEach((vid, index) => {
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

    if (index < videoThumbnails.length - 1) {
      it(`${vid.title} lightbox has Vimeo play button`, () => {
        checkVideoLightboxVimeoPlayBtn(index);
      });
    } else {
      it(`${vid.title} lightbox has video loaded`, () => {
        checkVideoLightboxHasVideo(index);
      });
    }
  });
});
