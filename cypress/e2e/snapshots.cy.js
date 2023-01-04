import { musicalFriends } from '../fixtures/musicalFriends.json';
import { musicalFriendsMusicPages } from '../fixtures/musicalFriendsMusic.json';
import { albums } from '../fixtures/discography.json';
import { collections } from '../fixtures/collections.json';
import { publications } from '../fixtures/publications.json';
import { archives } from '../fixtures/archives.json';

describe('Home Page', () => {
  it('successfully loads', () => {
    cy.visit('/');
  });

  it('the page matches the saved image snapshot', () => {
    cy.document().wait(1000).toMatchImageSnapshot();
  });
});

describe('Roots and Youth', () => {
  it('successfully loads', () => {
    cy.visit('/roots-and-youth');
  });

  it('the page matches the saved image snapshot', () => {
    cy.document().wait(1000).toMatchImageSnapshot();
  });
});

describe('The Episodes', () => {
  it('successfully loads', () => {
    cy.visit('/musical-journey/the-episodes');
  });

  it('the page matches the saved image snapshot', () => {
    cy.document().wait(1000).toMatchImageSnapshot();
  });
});

describe('Musical Friends', () => {
  it('successfully loads', () => {
    cy.visit('/musical-journey/musical-friends');
  });

  it('the page matches the saved image snapshot', () => {
    cy.document().wait(1000).toMatchImageSnapshot();
  });

  musicalFriends.forEach((friend) => {
    it(`the ${friend.name} page successfully loads`, () => {
      cy.visit(`/musical-journey/musical-friends/${friend.link}`);
    });

    it(`the ${friend.name} page matches the saved image snapshot`, () => {
      cy.document().wait(1000).toMatchImageSnapshot();
    });
  });

  musicalFriendsMusicPages.forEach((page) => {
    it(`the ${page.title} page successfully loads`, () => {
      cy.visit(page.url);
    });

    it(`the ${page.title} page matches the saved image snapshot`, () => {
      cy.document().wait(1000).toMatchImageSnapshot();
    });
  });
});

describe('Early Productions', () => {
  it('successfully loads', () => {
    cy.visit('/musical-journey/early-productions');
  });

  it('the page matches the saved image snapshot', () => {
    cy.document().wait(1000).toMatchImageSnapshot();
  });
});

describe('Discography', () => {
  it('successfully loads', () => {
    cy.visit('/musical-journey/discography');
  });

  it('the header matches the saved image snapshot', () => {
    cy.get('#header').wait(1000).toMatchImageSnapshot();
  });

  it('the discography intro content matches the saved image snapshot', () => {
    cy.get('.discography_content').toMatchImageSnapshot();
  });

  albums.forEach((album, albumIndex) => {
    it(`Album ${albumIndex + 1} matches the saved image snapshot`, () => {
      cy.get('[data-testid="album-container"]')
        .eq(albumIndex)
        .toMatchImageSnapshot();
    });
  });
});

describe('Short Films', () => {
  it('successfully loads', () => {
    cy.visit('/short-films');
  });

  it('the header matches the saved image snapshot', () => {
    cy.get('#header').wait(1000).toMatchImageSnapshot();
  });

  it('the videos container matches the saved image snapshot', () => {
    cy.get('#videos').toMatchImageSnapshot();
  });
});

describe('Travels', () => {
  it('successfully loads', () => {
    cy.visit('/travels');
  });

  it('the page matches the saved image snapshot', () => {
    cy.document().wait(1000).toMatchImageSnapshot();
  });
});

describe('Collections', () => {
  it('successfully loads the index page', () => {
    cy.visit('/collections');
  });

  it('the page matches the saved image snapshot', () => {
    cy.document().wait(1000).toMatchImageSnapshot();
  });

  collections.forEach((collection) => {
    it(`${collection.title} page successfully loads`, () => {
      cy.visit(collection.link);
    });

    it(`${collection.title} page matches the saved image snapshot`, () => {
      cy.document().wait(1000).toMatchImageSnapshot();
    });
  });
});

describe('Publications', () => {
  it('index page successfully loads', () => {
    cy.visit('/publications');
  });

  it('the publications thumbnails section matches the saved image snapshot', () => {
    cy.get('.publicationsRow').wait(1000).toMatchImageSnapshot();
  });

  publications.forEach((publication) => {
    it(`${publication.title} page successfully loads`, () => {
      cy.visit(publication.link);
    });

    it(`${publication.title} page matches the saved image snapshot`, () => {
      cy.document().wait(1000).toMatchImageSnapshot();
    });
  });
});

describe('Archives', () => {
  it('index page successfully loads', () => {
    cy.visit('/archives');
  });

  it('The archives index pg thumbnails section matches the saved image snapshot', () => {
    cy.get('#tilesContainer').wait(1000).toMatchImageSnapshot();
  });

  archives.forEach((archive, index) => {
    if (archive.numImages && archive.numImages >= 250) {
      it(`Archive ${index + 1} (${
        archive.title
      }) page header matches the saved image snapshot`, () => {
        cy.viewport(1550, 1000);
        cy.visit(archive.link);
        cy.get('#header').toMatchImageSnapshot();
      });

      const maxImagesGalleryWrapper = 120;
      for (let i = 0; i <= archive.numImages / maxImagesGalleryWrapper; i++) {
        it(`Archive ${index + 1} (${archive.title}) page, gallery part ${
          i + 1
        }, matches the saved image snapshot`, () => {
          cy.viewport(1550, 1000);
          cy.get(`#galleryWrapper_${i + 1}`).toMatchImageSnapshot({
            screenshotConfig: {
              timeout: 120000,
            },
          });
        });
      }
    } else {
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
              timeout: 120000,
            },
          });
      });
    }
  });
});
