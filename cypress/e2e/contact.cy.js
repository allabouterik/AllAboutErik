describe('Contact Page - standard tests', () => {
  it('successfully loads', () => {
    cy.visit('/contact');
  });

  it('finds the Logo image', () => {
    cy.findPageTitleImg('contact-and-credits');
  });
});

describe('Contact Page - page specific tests', () => {
  it('has correct main text', () => {
    cy.get('.text-main').contains(
      'Please use this form to send any comments or questions about the website or if you want to get in touch.'
    );
  });

  it('has a contact form', () => {
    cy.get('.form-container').find(`form[name='contact']`);
  });

  it('contact form contains a name input', () => {
    cy.get(`form[name='contact']`).find(
      `input[type='text'][name='name'][id='name'][placeholder='Your name..']`
    );
  });

  it('contact form contains an email input', () => {
    cy.get(`form[name='contact']`).find(
      `input[type='email'][name='email'][id='email'][placeholder='Your email..']`
    );
  });

  it('contact form contains a message input', () => {
    cy.get(`form[name='contact']`).find(
      `textarea[name='message'][id='message'][placeholder='Your message..']`
    );
  });

  it('contact form contains submit button', () => {
    cy.get(`form[name='contact']`).find(`input[type='submit'][value='Submit']`);
  });

  it('has text title for Website Credits', () => {
    cy.get('.text-titles').contains('WEBSITE CREDITS');
  });

  const websiteCredits = [
    'Designer: Lindsey Brady',
    'Developer: Eoin O’Malley',
    'Video Editors: Lindsey Brady & Heather Young',
    'Hand Lettering: Henry Diltz',
  ];

  it('has correct website credits', () => {
    websiteCredits.forEach((creditText) => {
      cy.get('.text-main').eq(1).contains(creditText);
    });
  });

  it('has text title for Website Page Music', () => {
    cy.get('.text-titles').contains('WEBSITE PAGE MUSIC');
  });

  const musicCredits = [
    'Home page – Wildwood Flower by John Sebastian',
    'Roots & Youth – Body and Soul by Coleman Hawkins',
    'Musical Journey Episodes – Harpoon by John Sebastian',
    'Musical Friends – Japanese Silky by Norman Greenbaum',
    'Early Productions – Green Rocky Road by Tim Hardin',
    'Discography – Brief Synthophonia by Sopwith Camel',
    'Shorts – Sweet Moments by The Blue Velvet Band',
    "Travels – Ramblin' Man by The Blue Velvet Band",
    'Collections – Dicky by Edwardo Unz',
    'Publications – 5 Pennies by Norman Greenbaum',
    'Archives – Fond Affection by The Blue Velvet Band',
  ];

  it('has correct music credits', () => {
    musicCredits.forEach((creditText) => {
      cy.get('.text-main').eq(2).contains(creditText);
    });
  });

  it('has a background video with web & mp4 sources', () => {
    cy.get('video#contactBgVideo')
      .find('source')
      .should('have.attr', 'src')
      .should('include', 'water-3-reduced');

    cy.get('video#contactBgVideo')
      .find('source')
      .eq(0)
      .and('have.attr', 'type')
      .should('include', 'video/webm');

    cy.get('video#contactBgVideo')
      .find('source')
      .eq(1)
      .and('have.attr', 'type')
      .should('include', 'video/mp4');
  });
});
