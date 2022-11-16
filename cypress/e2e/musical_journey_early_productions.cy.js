describe('Early Productions Page - standard tests', () => {
  it('successfully loads', () => {
    cy.visit('/musical-journey/early-productions');
  });

  it('finds the Logo image', () => {
    cy.findPageTitleImg('early_productions');
  });

  it('finds the audio playing icon', () => {
    cy.findAudioPlayingIcon();
  });

  it('audio is playing', () => {
    cy.expectBackgroundPlayingAudio();
  });
});
