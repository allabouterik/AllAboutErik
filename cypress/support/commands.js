// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import 'cypress-real-events/support';

Cypress.Commands.add('findPageTitleImg', (src) => {
  cy.get('[data-testid="title-img"]')
    .should('have.attr', 'src')
    .should('include', src);
});

Cypress.Commands.add('findAudioPlayingIcon', () => {
  cy.get('.soundIconContainer')
    .find('img')
    .should('have.attr', 'alt')
    .should('include', 'Mute background music');
});

Cypress.Commands.add('expectBackgroundPlayingAudio', () => {
  cy.get('.soundIconContainer')
    .find('audio')
    .should((els) => {
      let audible = false;
      els.each((i, el) => {
        if (el.duration > 0 && !el.paused && !el.muted) {
          audible = true;
        }
      });
      expect(audible).to.eq(true);
    });
});

Cypress.Commands.add('expectAudioPlaying', { prevSubject: true }, (element) => {
  cy.get(element)
    .find('audio')
    .should((els) => {
      let audible = false;
      els.each((i, el) => {
        if (el.duration > 0 && !el.paused && !el.muted) {
          audible = true;
        }
      });
      expect(audible).to.eq(true);
    });
});

Cypress.Commands.add(
  'expectAudioNotPlaying',
  { prevSubject: true },
  (element) => {
    cy.get(element)
      .find('audio')
      .should((els) => {
        let audible = false;
        els.each((i, el) => {
          if (el.duration > 0 && !el.paused && !el.muted) {
            audible = true;
          }
        });
        expect(audible).to.eq(false);
      });
  }
);

Cypress.Commands.add('isScrolledTo', { prevSubject: true }, (element) => {
  cy.get(element).should(($el) => {
    const bottom = Cypress.$(cy.state('window')).height();
    const rect = $el[0].getBoundingClientRect();

    expect(rect.top).not.to.be.greaterThan(
      bottom,
      'Expected element not to be below the visible scrolled area'
    );
    expect(rect.top).to.be.greaterThan(
      0 - rect.height,
      'Expected element not to be above the visible scrolled area'
    );
  });
});

Cypress.Commands.add('isOutOfView', { prevSubject: true }, (element) => {
  cy.get(element).should(($el) => {
    const bottom = Cypress.$(cy.state('window')).height();
    const rect = $el[0].getBoundingClientRect();

    expect(rect.top).to.satisfy(() => {
      return rect.top < 0 - rect.height || rect.top > bottom;
    }, 'Expected element not to be within the visible area');
  });
});

Cypress.Commands.add('getIframeBody', (index = 0) => {
  // get the iframe > document > body and retry until the body element is not empty
  cy.log('getIframeBody');

  return (
    cy
      .get('iframe', { log: false })
      .eq(index)
      .its('0.contentDocument.body', { log: false, timeout: 10000 })
      .should('not.be.empty')
      // wraps "body" DOM element to allow chaining more Cypress commands, like ".find(...)"
      // https://on.cypress.io/wrap
      .then((body) => cy.wrap(body, { log: false }))
  );
});

Cypress.Commands.add('findVimeoPlayButton', (index = 0) => {
  return cy
    .getIframeBody(index)
    .find(`button[aria-label='Play']`, { timeout: 10000 });
});

function unquote(str) {
  return str.replace(/(^")|("$)/g, '');
}

Cypress.Commands.add(
  'after',
  {
    prevSubject: 'element',
  },
  (el, property) => {
    const win = el[0].ownerDocument.defaultView;
    const after = win.getComputedStyle(el[0], 'after');
    return unquote(after.getPropertyValue(property));
  }
);
