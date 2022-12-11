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

function parseCssRotations(css) {
  // Use a regular expression to match the rotation functions in the CSS string
  const rotationRegex = /rotate([XYZ])\(([+-]?\d+(?:\.\d+)?)([a-z]+)\)/g;

  // Create empty arrays to store the rotation directions, values, and units
  const directions = [];
  const values = [];
  const units = [];

  // Use the regex to match each rotation function in the CSS string
  let match;
  while ((match = rotationRegex.exec(css)) !== null) {
    // Store the direction, value, and unit for each match in the corresponding arrays
    directions.push(match[1]);
    values.push(Number(match[2]));
    units.push(match[3]);
  }

  // Return an object with the three arrays
  return {
    directions,
    values,
    units,
  };
}

function rotationToMatrix3d(rotation) {
  // Note: this function has not been checked fully for accuracy!!
  const { directions, values, units } = parseCssRotations(rotation);

  let radiansX = 0;
  let radiansY = 0;
  let radiansZ = 0;
  for (let i = 0; i < values.length; i++) {
    if (units[i] === 'deg') {
      if (directions[i] === 'X') radiansX = (values[i] * Math.PI) / 180;
      if (directions[i] === 'Y') radiansY = (values[i] * Math.PI) / 180;
      if (directions[i] === 'Z') radiansZ = (values[i] * Math.PI) / 180;
    } else if (units[i] === 'rad') {
      if (directions[i] === 'X') radiansX = values[i];
      if (directions[i] === 'Y') radiansY = values[i];
      if (directions[i] === 'Z') radiansZ = values[i];
    }
  }

  let matrixValues = [
    Math.cos(radiansY) * Math.cos(radiansZ),
    Math.sin(radiansX) * Math.sin(radiansY) * Math.cos(radiansZ) -
      Math.cos(radiansX) * Math.sin(radiansZ),
    // Math.cos(radiansX) * Math.sin(radiansY) * Math.cos(radiansZ) +
    //   Math.sin(radiansX) * Math.sin(radiansZ),
    -(
      Math.cos(radiansX) * Math.sin(radiansY) * Math.cos(radiansZ) +
      Math.sin(radiansX) * Math.sin(radiansZ)
    ),
    0,
    Math.cos(radiansY) * Math.sin(radiansZ),
    Math.sin(radiansX) * Math.sin(radiansY) * Math.sin(radiansZ) +
      Math.cos(radiansX) * Math.cos(radiansZ),
    Math.cos(radiansX) * Math.sin(radiansY) * Math.sin(radiansZ) -
      Math.sin(radiansX) * Math.cos(radiansZ),
    0,
    // -Math.sin(radiansY),
    Math.sin(radiansY),
    Math.sin(radiansX) * Math.cos(radiansY),
    Math.cos(radiansX) * Math.cos(radiansY),
    0,
    0,
    0,
    0,
    1,
  ];

  matrixValues.forEach((value, i) => {
    if (Math.abs(value) == 0) matrixValues[i] = 0;
    else matrixValues[i] = Number(value.toFixed(6));
  });

  return 'matrix3d(' + matrixValues.join(', ') + ')';
}

Cypress.Commands.add('getCssMatrix3dFromRotation', (rotation) => {
  return rotationToMatrix3d(rotation);
});
