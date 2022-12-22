import * as data from '../fixtures/archives.json';
const { archives } = data;

describe('Archives - Individual Pages', () => {
  archives.forEach((archive) => {
    it(`${archive.title} page successfully loads`, () => {
      if (archive.isNarrativePage) {
        cy.visit(archive.link).wait(6000);
      } else {
        cy.visit(archive.link);
      }
    });

    if (archive.hasOwnProperty('headerText')) {
      it(`${archive.title} page contains the header text`, () => {
        cy.get('.archive_headerText').should(
          'contain.text',
          archive.headerText
        );
      });
    }

    if (archive.numImages) {
      it(`${archive.title} page contains ${archive.numImages} images`, () => {
        cy.get('#mainContent .galleryBox img')
          .should('have.length', archive.numImages)
          .and('have.prop', 'naturalWidth')
          .should('be.greaterThan', 0);
      });
    }

    it(`${archive.title} has a link back to archives menu`, () => {
      cy.get('header')
        .find('a.backToArchives')
        .should('have.attr', 'href')
        .should('include', '/archives/menu');
    });

    it(`${archive.title} has the navigation image for back to archives menu`, () => {
      cy.get('header a.backToArchives')
        .find('img.backToArchivesImg')
        .should('be.visible')
        .should('have.attr', 'src')
        .should('include', 'back-to-archives-single-line.png');

      cy.get('header a.backToArchives')
        .find('img.backToArchivesImg')
        .should('be.visible')
        .and('have.prop', 'naturalWidth')
        .should('be.greaterThan', 0);
    });

    it(`${archive.title} has the navigation image on hover for back to archives menu`, () => {
      cy.get('header a.backToArchives')
        .realHover()
        .find('img.backToArchivesImg-hover')
        .should('have.attr', 'src')
        .should('include', 'back-to-archives-single-line-yellow.png');

      cy.get('header a.backToArchives')
        .realHover()
        .find('img.backToArchivesImg-hover')
        .should('be.visible')
        .and('have.prop', 'naturalWidth')
        .should('be.greaterThan', 0);

      cy.get('body').realHover({ position: 'topLeft' }); // reset hovering by putting mouse away
    });

    if (!archive.isNarrativePage) {
      it(`${archive.title} has the navigation image for previous archive`, () => {
        cy.get('header #navLinksRow #nav_previous.nav_link_big')
          .find('img.hideOnHover')
          .should('be.visible')
          .should('have.attr', 'src')
          .should('include', 'previous-white.png');

        cy.get('header #navLinksRow #nav_previous.nav_link_big')
          .find('img.hideOnHover')
          .should('be.visible')
          .and('have.prop', 'naturalWidth')
          .should('be.greaterThan', 0);
      });

      it(`${archive.title} has the navigation image on hover for previous archive`, () => {
        cy.get('header #navLinksRow #nav_previous.nav_link_big')
          .realHover()
          .find('img.showOnHover')
          .should('be.visible')
          .should('have.attr', 'src')
          .should('include', 'previous-yellow.png');

        cy.get('header #navLinksRow #nav_previous.nav_link_big')
          .realHover()
          .find('img.showOnHover')
          .should('be.visible')
          .and('have.prop', 'naturalWidth')
          .should('be.greaterThan', 0);
      });

      it(`${archive.title} has the navigation image for next archive`, () => {
        cy.get('header #navLinksRow #nav_next.nav_link_big')
          .find('img.hideOnHover')
          .should('be.visible')
          .should('have.attr', 'src')
          .should('include', 'next-white.png');

        cy.get('header #navLinksRow #nav_next.nav_link_big')
          .find('img.hideOnHover')
          .should('be.visible')
          .and('have.prop', 'naturalWidth')
          .should('be.greaterThan', 0);
      });

      it(`${archive.title} has the navigation image on hover for next archive`, () => {
        cy.get('header #navLinksRow #nav_next.nav_link_big')
          .realHover()
          .find('img.showOnHover')
          .should('be.visible')
          .should('have.attr', 'src')
          .should('include', 'next-yellow.png');

        cy.get('header #navLinksRow #nav_next.nav_link_big')
          .realHover()
          .find('img.showOnHover')
          .should('be.visible')
          .and('have.prop', 'naturalWidth')
          .should('be.greaterThan', 0);
      });
    }

    if (archive.isNarrativePage) {
      it(`${archive.title} has the scroll for recollections header text`, () => {
        cy.get('.headerText')
          .should('contain.text', 'SCROLL')
          .and('contain.text', 'TO READ MY')
          .and('contain.text', 'RECOLLECTIONS');
      });
    }

    if (archive.hasSeparateGalleryPage) {
      it(`${archive.title} has a link to a separate gallery page`, () => {
        cy.get('.headerText')
          .should('contain.text', 'CLICK')
          .and('contain.text', 'TO VIEW THE GALLERY');

        cy.get('header')
          .find('a.headerOverlay.link')
          .should('have.attr', 'href')
          .should('include', `${archive.link}-gallery`);
      });

      it(`${archive.title} gallery page successfully loads`, () => {
        cy.get('header').find('a.headerOverlay.link').click().wait(6000);

        cy.url().should('include', `${archive.link}-gallery`);
      });

      it(`${archive.title} gallery page has the scroll to view the gallery header text`, () => {
        cy.get('.headerText')
          .should('contain.text', 'SCROLL')
          .and('contain.text', 'TO VIEW THE GALLERY');
      });

      it(`${archive.title} gallery page has link back to narrative page`, () => {
        cy.get('.headerText')
          .should('contain.text', 'CLICK')
          .and('contain.text', 'TO READ MY')
          .and('contain.text', 'RECOLLECTIONS');

        cy.get('header')
          .find('a.headerOverlay.link')
          .should('have.attr', 'href')
          .should('include', `${archive.link}`);
      });

      it(`${archive.title} gallery page contains ${archive.galleryPgNumImages} images`, () => {
        cy.get('#mainContent .galleryBox img')
          .should('have.length', archive.galleryPgNumImages)
          .and('have.prop', 'naturalWidth')
          .should('be.greaterThan', 0);
      });

      it(`${archive.title} gallery page has a link back to archives menu`, () => {
        cy.get('header')
          .find('a.backToArchives')
          .should('have.attr', 'href')
          .should('include', '/archives/menu');
      });

      it(`${archive.title} gallery page has the navigation image for back to archives menu`, () => {
        cy.get('header a.backToArchives')
          .find('img.backToArchivesImg')
          .should('be.visible')
          .should('have.attr', 'src')
          .should('include', 'back-to-archives-single-line.png');

        cy.get('header a.backToArchives')
          .find('img.backToArchivesImg')
          .should('be.visible')
          .and('have.prop', 'naturalWidth')
          .should('be.greaterThan', 0);
      });

      it(`${archive.title} gallery page has the navigation image on hover for back to archives menu`, () => {
        cy.get('header a.backToArchives')
          .realHover()
          .find('img.backToArchivesImg-hover')
          .should('have.attr', 'src')
          .should('include', 'back-to-archives-single-line-yellow.png');

        cy.get('header a.backToArchives')
          .realHover()
          .find('img.backToArchivesImg-hover')
          .should('be.visible')
          .and('have.prop', 'naturalWidth')
          .should('be.greaterThan', 0);

        cy.get('body').realHover({ position: 'topLeft' }); // reset hovering by putting mouse away
      });
    }
  });
});
