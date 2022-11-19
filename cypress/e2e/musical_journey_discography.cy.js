describe('Discography Page - standard tests', () => {
  it('successfully loads', () => {
    cy.visit('/musical-journey/discography');
  });

  it('finds the Logo image', () => {
    cy.findPageTitleImg('discography-white');
  });

  it('finds the audio playing icon', () => {
    cy.findAudioPlayingIcon();
  });

  it('audio is playing', () => {
    cy.expectBackgroundPlayingAudio();
  });
});

describe('Early Productions Page - page specific tests', () => {
  it('has correct title subtext', () => {
    cy.get('#titleSubText').contains(
      "Erik Jacobsen is an American record producer, song publisher, and artists manager, born May 19, 1940 in Oak Park Illinois on the west side of Chicago. His early musical influences were wide ranging, including a unique opportunity of listening to the first urban radio stations broadcasting polka, blues and country. He is best known for his work in the 1960s with Tim Hardin, The Lovin' Spoonful, The Charlatans, Sopwith Camel, and later with Norman Greenbaum and Chris Isaak."
    );
  });

  it('has correct main image', () => {
    cy.get('.bgImg.bgImgBack')
      .should('have.attr', 'src')
      .should('include', '01_erik-john-zal-header');
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

  it('clicking scroll container brings main text body column into view & title image out of view', () => {
    cy.get('#scrollImgContainer').click();
    cy.get('.main-col').isScrolledTo();
    cy.get('#titleImg').isOutOfView();
  });

  it('scrolling to bottom of page shows back to top button', () => {
    cy.scrollTo('bottom', { duration: 500 });
    cy.get('main').find('#scrollToTopBtn').should('be.visible');
  });

  it('clicking back to top button scrolls the page to the top', () => {
    cy.get('main').find('#scrollToTopBtn').click();
    cy.get('#titleImg').isScrolledTo();
  });

  it('has 23 background images with overlays', () => {
    cy.get('[data-testid="background-img-container"]').should(
      'have.length',
      23
    );
    cy.get('[data-testid="background-img-container"] .bgImgBack').should(
      'have.length',
      23
    );
    cy.get('[data-testid="background-img-container"] .bgImgOverlay').should(
      'have.length',
      23
    );
  });

  it('has 37 albums', () => {
    cy.get('[data-testid="album-container"]').should('have.length', 37);
  });
});
