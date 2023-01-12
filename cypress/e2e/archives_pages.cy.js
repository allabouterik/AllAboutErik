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

    it(`${archive.title} has the title image`, () => {
      cy.findPageTitleImg(archive.titleImg);
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

      it(`${archive.title} page first image can be clicked on and is centred on screen`, () => {
        cy.get('#mainContent .galleryBox img')
          .eq(0)
          .should('not.have.class', 'centerPos');

        cy.get('#mainContent .galleryBox img').eq(0).click();

        cy.get('#mainContent .galleryBox img')
          .eq(0)
          .should('have.class', 'centerPos');
      });
    }

    if (archive.mediaItems) {
      it(`${archive.title} page contains ${archive.mediaItems.length} media Items`, () => {
        cy.get('#mainContent .galleryWrapper .galleryBox').should(
          'have.length',
          archive.mediaItems.length
        );
      });

      archive.mediaItems.forEach((mediaItem, mediaItemIndex) => {
        it(`${archive.title} page, media item ${
          mediaItemIndex + 1
        }, has the correct title`, () => {
          cy.get('#mainContent .galleryWrapper .galleryBox')
            .eq(mediaItemIndex)
            .find('.thumbnailCaption')
            .should('contain.text', mediaItem.title);
        });

        if (mediaItem.type === 'soundcloud') {
          it(`${archive.title} page, media item ${
            mediaItemIndex + 1
          }, opens the ${mediaItem.type} lightbox when clicked on`, () => {
            cy.get('#mainContent .galleryWrapper .galleryBox')
              .eq(mediaItemIndex)
              .click();

            cy.getIframeBody(0).find(
              `.visualAudible .soundHeader button[title='Play']`,
              { timeout: 5000 }
            );
          });

          it(`${archive.title} page, media item ${
            mediaItemIndex + 1
          }, lightbox can be closed`, () => {
            cy.get('#closeImg').click();
          });
        }

        if (mediaItem.type === 'flipbook') {
          it(`${archive.title} page, media item ${
            mediaItemIndex + 1
          }, opens a flipbook with ${
            mediaItem.pages
          } pages when clicked on`, () => {
            cy.get('#mainContent .galleryWrapper .galleryBox')
              .eq(mediaItemIndex)
              .click();

            cy.get('#flipbookContainer')
              .find('.page-num')
              .should('contain.text', `Page 1 of ${mediaItem.pages}`);
          });

          it(`${archive.title} page, media item ${
            mediaItemIndex + 1
          }, flipbook can be closed`, () => {
            cy.get('#flipbookContainer .action-bar')
              .find('#fullscreenExit_icon')
              .click();

            cy.get('#flipbookContainer').should(
              'not.have.class',
              'fullscreenContainer'
            );
          });
        }
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
        .should('include', 'back-to-archives-single-line');

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
        .should('include', 'back-to-archives-single-line-yellow');

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
          .should('include', 'previous-white');

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
          .should('include', 'previous-yellow');

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
          .should('include', 'next-white');

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
          .should('include', 'next-yellow');

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

      it(`${archive.title} page contains ${archive.numSectionsFiveBySevenLayout} scroll sections`, () => {
        cy.get('.ksvuefp-section').should(
          'have.length',
          archive.numSectionsFiveBySevenLayout + 1
        );
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
          .should('include', 'back-to-archives-single-line');

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
          .should('include', 'back-to-archives-single-line-yellow');

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
