describe('The Home Page', () => {
  it('successfully loads', () => {
    cy.visit('/');
  });

  it('finds the Logo image', () => {
    cy.findPageTitleImg('allabouterikwhite');
  });

  it('finds the audio playing icon', () => {
    cy.findAudioPlayingIcon();
  });

  it('audio is playing', () => {
    cy.expectPlayingAudio();
  });
});
