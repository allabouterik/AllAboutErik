import { publications } from '../fixtures/publications.json';

describe('Publications - Individual Pages', () => {
  publications.forEach((publication) => {
    it(`${publication.title} page successfully loads`, () => {
      cy.visit(publication.link);
    });

    if (publication.hasOwnProperty('headerText')) {
      it(`${publication.title} page contains the header text`, () => {
        cy.get('.publication_headerText').should(
          'contain.text',
          publication.headerText
        );
      });
    }

    if (publication.hasOwnProperty('headerText2')) {
      it(`${publication.title} page contains the second part of the header text`, () => {
        cy.get('.publication_headerText').should(
          'contain.text',
          publication.headerText2
        );
      });
    }

    it(`${publication.title} has the navigation image for previous pg`, () => {
      cy.get('[data-testid="main-content"] #nav_prev.nav_link_small')
        .find('img.hideOnHover')
        .should('be.visible')
        .should('have.attr', 'src')
        .should('include', 'previous-publication-2lines-white.png');

      cy.get('[data-testid="main-content"] #nav_prev.nav_link_small')
        .find('img.hideOnHover')
        .should('be.visible')
        .and('have.prop', 'naturalWidth')
        .should('be.greaterThan', 0);
    });

    it(`${publication.title} has the navigation image on hover for previous pg`, () => {
      cy.get('[data-testid="main-content"] #nav_prev.nav_link_small')
        .realHover()
        .find('img.showOnHover')
        .should('be.visible')
        .should('have.attr', 'src')
        .should('include', 'previous-publication-2lines-yellow.png');

      cy.get('[data-testid="main-content"] #nav_prev.nav_link_small')
        .realHover()
        .find('img.showOnHover')
        .should('be.visible')
        .and('have.prop', 'naturalWidth')
        .should('be.greaterThan', 0);
    });

    it(`${publication.title} has the navigation image for next pg`, () => {
      cy.get('[data-testid="main-content"] #nav_next.nav_link_small')
        .find('img.hideOnHover')
        .should('be.visible')
        .should('have.attr', 'src')
        .should('include', 'next-publication-2lines-white.png');

      cy.get('[data-testid="main-content"] #nav_next.nav_link_small')
        .find('img.hideOnHover')
        .should('be.visible')
        .and('have.prop', 'naturalWidth')
        .should('be.greaterThan', 0);
    });

    it(`${publication.title} has the navigation image on hover for next pg`, () => {
      cy.get('[data-testid="main-content"] #nav_next.nav_link_small')
        .realHover()
        .find('img.showOnHover')
        .should('be.visible')
        .should('have.attr', 'src')
        .should('include', 'next-publication-2lines-yellow.png');

      cy.get('[data-testid="main-content"] #nav_next.nav_link_small')
        .realHover()
        .find('img.showOnHover')
        .should('be.visible')
        .and('have.prop', 'naturalWidth')
        .should('be.greaterThan', 0);
    });

    it(`${publication.title} has the navigation image for back to publications menu`, () => {
      cy.get('[data-testid="main-content"] #nav_back.nav_link_small')
        .find('img.hideOnHover')
        .should('be.visible')
        .should('have.attr', 'src')
        .should('include', 'back-to-publications-menu-3lines-white.png');

      cy.get('[data-testid="main-content"] #nav_back.nav_link_small')
        .find('img.hideOnHover')
        .should('be.visible')
        .and('have.prop', 'naturalWidth')
        .should('be.greaterThan', 0);
    });

    it(`${publication.title} has the navigation image on hover for back to publications menu`, () => {
      cy.get('[data-testid="main-content"] #nav_back.nav_link_small')
        .realHover()
        .find('img.showOnHover')
        .should('have.attr', 'src')
        .should('include', 'back-to-publications-menu-3lines-yellow.png');

      cy.get('[data-testid="main-content"] #nav_back.nav_link_small')
        .realHover()
        .find('img.showOnHover')
        .should('be.visible')
        .and('have.prop', 'naturalWidth')
        .should('be.greaterThan', 0);
    });

    it(`${publication.title} has a flipbook with ${publication.pages} pages`, () => {
      cy.get('#flipbookContainer')
        .find('.page-num')
        .should('contain.text', `Page 1 of ${publication.pages}`);
    });

    it(`the ${publication.title} flipbook starts at 1x scale`, () => {
      cy.get('#flipbookContainer .viewport')
        .find('.container')
        .should('have.css', 'transform', 'matrix(1, 0, 0, 1, 0, 0)');
    });

    it(`the ${publication.title} flipbook has the correct icons enabled and disabled`, () => {
      cy.get('#flipbookContainer .action-bar')
        .find('#firstpage_icon')
        .should('have.class', 'disabled');

      cy.get('#flipbookContainer .action-bar')
        .find('#left_icon')
        .should('have.class', 'disabled');

      cy.get('#flipbookContainer .action-bar')
        .find('#minus_icon')
        .should('have.class', 'disabled');

      cy.get('#flipbookContainer .action-bar')
        .find('#plus_icon')
        .should('not.have.class', 'disabled');

      cy.get('#flipbookContainer .action-bar')
        .find('#right_icon')
        .should('not.have.class', 'disabled');

      cy.get('#flipbookContainer .action-bar')
        .find('#lastpage_icon')
        .should('not.have.class', 'disabled');

      cy.get('#flipbookContainer .action-bar')
        .find('#fullscreen_icon')
        .should('not.have.class', 'disabled');
    });

    it(`clicking the ${publication.title} flipbook plus btn increases it to 2x scale and enables the minus btn`, () => {
      cy.get('#flipbookContainer .action-bar').find('#plus_icon').click();

      cy.get('#flipbookContainer .viewport')
        .find('.container')
        .should('have.css', 'transform', 'matrix(2, 0, 0, 2, 0, 0)');

      cy.get('#flipbookContainer .action-bar')
        .find('#minus_icon')
        .should('not.have.class', 'disabled');
    });

    it(`clicking the ${publication.title} flipbook plus btn again increases it to 4x scale and disables the plus btn`, () => {
      cy.get('#flipbookContainer .action-bar').find('#plus_icon').click();

      cy.get('#flipbookContainer .viewport')
        .find('.container')
        .should('have.css', 'transform', 'matrix(4, 0, 0, 4, 0, 0)');

      cy.get('#flipbookContainer .action-bar')
        .find('#plus_icon')
        .should('have.class', 'disabled');
    });

    it(`clicking the ${publication.title} flipbook minus btn decreases it to 2x scale and enables the plus btn`, () => {
      cy.get('#flipbookContainer .action-bar').find('#minus_icon').click();

      cy.get('#flipbookContainer .viewport')
        .find('.container')
        .should('have.css', 'transform', 'matrix(2, 0, 0, 2, 0, 0)');

      cy.get('#flipbookContainer .action-bar')
        .find('#plus_icon')
        .should('not.have.class', 'disabled');
    });

    it(`clicking the ${publication.title} flipbook minus btn again decreases it to 1x scale and disables the minus btn`, () => {
      cy.get('#flipbookContainer .action-bar').find('#minus_icon').click();

      cy.get('#flipbookContainer .viewport')
        .find('.container')
        .should('have.css', 'transform', 'matrix(1, 0, 0, 1, 0, 0)');

      cy.get('#flipbookContainer .action-bar')
        .find('#minus_icon')
        .should('have.class', 'disabled');
    });

    it(`clicking the ${publication.title} flipbook right btn increases it to page 2`, () => {
      cy.get('#flipbookContainer .action-bar').find('#right_icon').click();

      cy.get('#flipbookContainer')
        .find('.page-num')
        .should('contain.text', `Page 2 of ${publication.pages}`);

      cy.get('#flipbookContainer .action-bar')
        .find('#left_icon')
        .should('not.have.class', 'disabled');
    });

    it(`clicking the ${publication.title} flipbook last page btn increases the page number`, () => {
      cy.get('#flipbookContainer .action-bar').find('#lastpage_icon').click();

      cy.get('#flipbookContainer')
        .find('.page-num')
        .should('contain.text', `Page 8 of ${publication.pages}`);

      cy.get('#flipbookContainer .action-bar')
        .find('#stop_icon_end')
        .should('exist');

      cy.get('#flipbookContainer .action-bar')
        .find('#lastpage_icon')
        .should('not.exist');
    });

    it(`clicking the ${publication.title} flipbook pause btn stops increasing the pages`, () => {
      cy.get('#flipbookContainer .action-bar').find('#stop_icon_end').click();

      cy.get('#flipbookContainer .action-bar')
        .find('#stop_icon_end')
        .should('not.exist');

      cy.get('#flipbookContainer .action-bar')
        .find('#lastpage_icon')
        .should('exist');
    });

    it(`can skip to the last page of the ${publication.title} flipbook via the url hash`, () => {
      cy.visit(`${publication.link}#${publication.pages}`);

      cy.get('#flipbookContainer')
        .find('.page-num')
        .should(
          'contain.text',
          `Page ${publication.pages} of ${publication.pages}`
        );
    });

    it(`the ${publication.title} flipbook has the correct icons enabled and disabled for the last page`, () => {
      cy.get('#flipbookContainer .action-bar')
        .find('#firstpage_icon')
        .should('not.have.class', 'disabled');

      cy.get('#flipbookContainer .action-bar')
        .find('#left_icon')
        .should('not.have.class', 'disabled');

      cy.get('#flipbookContainer .action-bar')
        .find('#minus_icon')
        .should('have.class', 'disabled');

      cy.get('#flipbookContainer .action-bar')
        .find('#plus_icon')
        .should('not.have.class', 'disabled');

      cy.get('#flipbookContainer .action-bar')
        .find('#right_icon')
        .should('have.class', 'disabled');

      cy.get('#flipbookContainer .action-bar')
        .find('#lastpage_icon')
        .should('have.class', 'disabled');

      cy.get('#flipbookContainer .action-bar')
        .find('#fullscreen_icon')
        .should('not.have.class', 'disabled');
    });

    it(`clicking the ${publication.title} flipbook left btn decreases the page by 1`, () => {
      cy.get('#flipbookContainer .action-bar').find('#left_icon').click();

      cy.get('#flipbookContainer')
        .find('.page-num')
        .should(
          'contain.text',
          `Page ${publication.pages - 1} of ${publication.pages}`
        );

      cy.get('#flipbookContainer .action-bar')
        .find('#right_icon')
        .should('not.have.class', 'disabled');
    });

    it(`clicking the ${publication.title} flipbook first page btn decreases the page number`, () => {
      cy.get('#flipbookContainer .action-bar').find('#firstpage_icon').click();

      cy.get('#flipbookContainer')
        .find('.page-num')
        .should(
          'contain.text',
          `Page ${publication.pages - 8} of ${publication.pages}`
        );

      cy.get('#flipbookContainer .action-bar')
        .find('#stop_icon_start')
        .should('exist');

      cy.get('#flipbookContainer .action-bar')
        .find('#firstpage_icon')
        .should('not.exist');
    });

    it(`clicking the ${publication.title} flipbook pause btn stops decreasing the pages`, () => {
      cy.get('#flipbookContainer .action-bar').find('#stop_icon_start').click();

      cy.get('#flipbookContainer .action-bar')
        .find('#stop_icon_start')
        .should('not.exist');

      cy.get('#flipbookContainer .action-bar')
        .find('#firstpage_icon')
        .should('exist');
    });

    it(`clicking the ${publication.title} flipbook fullscreen btn enables fullscreen mode`, () => {
      cy.get('#flipbookContainer .action-bar')
        .find('#fullscreenExit_icon')
        .should('not.exist');

      cy.get('#flipbookContainer').should(
        'not.have.class',
        'fullscreenContainer'
      );

      cy.get('#flipbookContainer .action-bar').find('#fullscreen_icon').click();

      cy.get('#flipbookContainer .action-bar')
        .find('#fullscreen_icon')
        .should('not.exist');

      cy.get('#flipbookContainer .action-bar')
        .find('#fullscreenExit_icon')
        .should('exist');

      cy.get('#flipbookContainer').should('have.class', 'fullscreenContainer');
    });

    it(`clicking the ${publication.title} flipbook exit fullscreen btn disables fullscreen mode`, () => {
      cy.get('#flipbookContainer .action-bar')
        .find('#fullscreenExit_icon')
        .should('exist');

      cy.get('#flipbookContainer').should('have.class', 'fullscreenContainer');

      cy.get('#flipbookContainer .action-bar')
        .find('#fullscreenExit_icon')
        .click();

      cy.get('#flipbookContainer .action-bar')
        .find('#fullscreenExit_icon')
        .should('not.exist');

      cy.get('#flipbookContainer .action-bar')
        .find('#fullscreen_icon')
        .should('exist');

      cy.get('#flipbookContainer').should(
        'not.have.class',
        'fullscreenContainer'
      );
    });

    if (publication.title === 'Old Timey Sportsmen') {
      it(`the ${publication.title} header guns image only shows on hover at >1400px`, () => {
        cy.viewport(1400, 660);

        cy.get('header')
          .find('.sportsmenLinkText img')
          .should('exist')
          .should('not.be.visible');

        cy.get('header').find('.sportsmenLinkText').realHover();

        cy.get('header')
          .find('.sportsmenLinkText img')
          .should('exist')
          .should('be.visible');
      });

      it(`the ${publication.title} page has the Vimeo play button`, () => {
        cy.findVimeoPlayButton();
      });
    }
  });
});
