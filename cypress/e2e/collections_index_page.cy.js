import * as data from '../fixtures/collections.json';
const { collections } = data;

describe('Collections Page - standard tests', () => {
  it('successfully loads', () => {
    cy.visit('/collections');
  });

  it('the page matches the saved image snapshot', () => {
    cy.document()
      .wait(1000)
      .toMatchImageSnapshot();
  });

  it('finds the Logo image', () => {
    cy.findPageTitleImg('collections-white');
  });

  it('finds the audio playing icon', () => {
    cy.findAudioPlayingIcon();
  });

  it('audio is playing', () => {
    cy.expectBackgroundPlayingAudio();
  });
});

describe('Collections Page - page specific tests', () => {
  it('has correct main text', () => {
    cy.get('#slideshowText').contains(
      'My dad collected old Norwegian and Icelandic stamps and he collected and raised tropical fish. ' +
        'Maybe his collecting passion rubbed off on me because I’ve been collecting stuff my whole life. ' +
        'As a boy I collected Pep buttons from cereal boxes, empty cigarette packages, fossils, ' +
        'copper Lincoln head pennies, moths and butterflies, cocoons in winter, and raised tropical fish.'
    );
    cy.get('#slideshowText').contains(
      'In college, I studied anthropology and became intrigued with tribal people. ' +
        'Visiting Guatemala for the first time I was so impressed by the indigenous villagers, ' +
        'whose clothes, especially those of the women, were all woven by hand. I bought some “huipils” there, ' +
        'and “molas” in the San Blas Islands. I went to South America and bought hand-woven cloth in Ecuador, ' +
        'Peru and Bolivia. I went from there to Mid-Eastern rugs, Pre-Columbian weavings, and Japanese kimono. ' +
        'I loved collecting these things.'
    );
  });

  it('has seven collection thumbnail links', () => {
    cy.get('[data-testid="collection-container"]').should('have.length', 7);
  });

  const checkCollectionThumbnail = (index, collection) => {
    cy.get('[data-testid="collection-container"]')
      .eq(index)
      .find('a')
      .should('have.attr', 'href')
      .should('include', collection.link);

    cy.get('[data-testid="collection-container"]')
      .eq(index)
      .find('img.hideOnHover')
      .should('have.attr', 'src')
      .should('include', collection.imgSrc);

    cy.get('[data-testid="collection-container"]')
      .eq(index)
      .find('.titleText')
      .should('contain.text', collection.title);
  };

  const checkCollectionThumbnailTextOverlay = (index, collection) => {
    cy.get('[data-testid="collection-container"]')
      .eq(index)
      .realHover()
      .find('img.showOnHover')
      .should('be.visible')
      .should('have.attr', 'src')
      .should('include', collection.imgSrcHover);

    cy.get('[data-testid="collection-container"]')
      .eq(index)
      .realHover()
      .find('a .viewCollectionText')
      .should('be.visible')
      .should('have.text', 'VIEW THIS COLLECTION');
  };

  collections.forEach((collection, index) => {
    it(`has the ${collection.title} collection thumbnail`, () => {
      checkCollectionThumbnail(index, collection);
    });

    it(`has the ${collection.title} collection thumbnail overlay`, () => {
      checkCollectionThumbnailTextOverlay(index, collection);
    });
  });

  it('scrolling to bottom of page shows back to top button', () => {
    cy.scrollTo('bottom', { duration: 1500 });
    cy.get('main')
      .find('#scrollToTopBtn')
      .should('be.visible');
  });

  it('clicking back to top button scrolls the page to the top', () => {
    cy.get('main')
      .find('#scrollToTopBtn')
      .click();
    cy.get('[data-testid="title-img"]').isScrolledTo();
  });
});
