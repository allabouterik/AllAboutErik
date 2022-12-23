import * as data from '../fixtures/archives.json';
const { archives } = data;

describe('Archives - Individual Pages', () => {
  archives.forEach((archive, index) => {
    it(`Archive ${index + 1} (${
      archive.title
    }) page matches the saved image snapshot`, () => {
      cy.viewport(1550, 1000);
      cy.visit(archive.link);
      let waitTime = 1000;
      if (
        archive.isNarrativePage ||
        (archive.numImages && archive.numImages > 100)
      ) {
        waitTime = 4000;
      }
      cy.document()
        .wait(waitTime)
        .toMatchImageSnapshot({
          screenshotConfig: {
            timeout: 60000,
          },
        });
    });
  });
});
