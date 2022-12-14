import * as data from '../fixtures/musicalFriends.json';
const { musicalFriends } = data;

describe('Musical Friends Page - standard tests', () => {
  it('successfully loads', () => {
    cy.visit('/musical-journey/musical-friends');
  });

  it('the page matches the saved image snapshot', () => {
    cy.document()
      .wait(1000)
      .toMatchImageSnapshot();
  });

  it('finds the Logo image', () => {
    cy.findPageTitleImg('musical-friends');
  });

  it('finds the audio playing icon', () => {
    cy.findAudioPlayingIcon();
  });

  it('audio is playing', () => {
    cy.expectBackgroundPlayingAudio();
  });
});

const convertToPascalCase = (text) => {
  return text
    .split(' ')
    .map((word) => word[0].toUpperCase() + word.substring(1))
    .join('');
};

describe('Musical Friends Page - page specific tests', () => {
  it('has correct main text', () => {
    cy.get('#titleSubText').contains('...A FEW ANECDOTES');
  });

  it('has 16 friend cards', () => {
    cy.get('[data-testid="friend-card"]').should('have.length', 16);
  });

  it('scrolling to bottom of page shows back to top button', () => {
    cy.scrollTo('bottom', { duration: 500 });
    cy.get('main')
      .find('#scrollToTopBtn')
      .should('be.visible');
  });

  const viewports = [
    {
      name: 'mobile',
      size: 'iphone-x',
    },
    {
      name: 'tablet',
      size: [800, 800],
    },
    {
      name: 'small desktop',
      size: [992, 800],
    },
    {
      name: 'medium desktop',
      size: [1380, 800],
    },
    {
      name: 'large desktop',
      size: [1830, 800],
    },
  ];

  viewports.forEach((vp) => {
    musicalFriends.forEach((friend) => {
      it(`the ${friend.name} card has the correct details on ${vp.name}`, () => {
        if (Cypress._.isArray(vp.size)) {
          cy.viewport(vp.size[0], vp.size[1]).wait(500);
        } else {
          cy.viewport(vp.size).wait(500);
        }

        const orderIndex = friend[`order${convertToPascalCase(vp.name)}`] - 1;

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

        cy.get('[data-testid="friend-card"]')
          .eq(orderIndex)
          .find('.seeMoreBtnContainer a')
          .should('have.attr', 'href')
          .should('include', friend.link);
      });
    });
  });
});
