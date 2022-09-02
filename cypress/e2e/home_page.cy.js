describe('The Home Page', () => {
  it('successfully loads', () => {
    cy.visit('/');
  });

  it('finds the Logo image', () => {
    cy.get('.mainContent')
      .find('img')
      .should('have.attr', 'src')
      .should('include', 'allabouterikwhite');
  });

  it('finds the audio playing icon', () => {
    cy.get('.soundIconContainer')
      .find('img')
      .should('have.attr', 'alt')
      .should('include', 'Mute background music');
  });

  const expectPlayingAudio = () => {
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
  };

  it('audio is playing', () => {
    expectPlayingAudio();
  });
});
