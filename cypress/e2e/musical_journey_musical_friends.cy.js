import * as data from '../fixtures/musicalFriends.json';
const { musicalFriends } = data;

describe('Musical Friends Page - standard tests', () => {
  it('successfully loads', () => {
    cy.visit('/musical-journey/musical-friends');
  });

  it('finds the Logo image', () => {
    cy.findPageTitleImg('musical-friends');
  });

  it('finds the audio playing icon', () => {
    cy.findAudioPlayingIcon();
  });

  it('audio is playing', () => {
    cy.expectPlayingAudio();
  });
});

describe('Musical Friends Page - page specific tests', () => {
  // beforeEach(() => {
  //   // run these tests as if in a desktop
  //   // browser with a 720p monitor
  //   cy.viewport(1380, 800).wait(500);
  // });

  it('has correct main text', () => {
    cy.get('#titleSubText').contains('...A FEW ANECDOTES');
  });

  it('has 16 friend cards', () => {
    cy.get('[data-testid="friend-card"]').should('have.length', 16);
  });

  it('scrolling to bottom of page shows back to top button', () => {
    cy.scrollTo('bottom', { duration: 500 });
    cy.get('main').find('#scrollToTopBtn').should('be.visible');
  });

  // const orderSmallDesktop = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  const orderSmallDesktop = [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    15,
    14,
    12,
    13,
  ];
  let orderIndex = 0;

  // musicalFriends.forEach((friend, index) => {
  //   if (index === 12) {
  //     it(`the ${friend.name} card has the correct details`, () => {
  //       // cy.viewport(1380, 800);

  //       cy.get('[data-testid="friend-card"]')
  //         .eq(index)
  //         .find('.textTitle')
  //         .should('contain.text', friend.name);

  //       cy.get('[data-testid="friend-card"]')
  //         .eq(index)
  //         .find('.text')
  //         .should('contain.text', friend.text);

  //       cy.get('[data-testid="friend-card"]')
  //         .eq(index)
  //         .find('.thumbnailImg')
  //         .should('have.attr', 'src')
  //         .should('include', friend.imgSrc);
  //     });
  //   }
  // });

  orderSmallDesktop.forEach((friendIndex, orderIndex) => {
    const friend = musicalFriends[friendIndex];
    it(`the ${friend.name} card has the correct details`, () => {
      // cy.viewport(1380, 800);

      cy.get('[data-testid="friend-card"]')
        .eq(orderIndex)
        .find('.textTitle')
        .should('contain.text', friend.name);

      cy.get('[data-testid="friend-card"]')
        .eq(orderIndex)
        .find('.text')
        .should('contain.text', friend.text);

      cy.get('[data-testid="friend-card"]')
        .eq(orderIndex)
        .find('.thumbnailImg')
        .should('have.attr', 'src')
        .should('include', friend.imgSrc);
    });
  });
});
