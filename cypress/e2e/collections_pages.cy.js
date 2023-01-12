import { collections } from '../fixtures/collections.json';

describe('Collections - Individual Pages', () => {
  collections.forEach((collection) => {
    if (collection.title === 'Old-Time Sportsmen') {
      return;
    }

    it(`${collection.title} page successfully loads`, () => {
      cy.visit(collection.link);
    });

    it(`${collection.title} page contains the main text`, () => {
      cy.get('.collection_headerText').should(
        'contain.text',
        collection.headerText
      );
    });

    it(`${collection.title} has ${collection.numImages} images loaded`, () => {
      cy.get('ul.collection-viewer__content')
        .find('li')
        .should('have.length', collection.numImages);
    });

    it(`${collection.title} has the navigation image for previous pg`, () => {
      cy.get('.collection-viewer #nav_prev.nav_link_big')
        .find('img.hideOnHover')
        .should('be.visible')
        .should('have.attr', 'src')
        .should('include', 'previous-collection-1line-white');
    });

    it(`${collection.title} has the navigation image on hover for previous pg`, () => {
      cy.get('.collection-viewer #nav_prev.nav_link_big')
        .realHover()
        .find('img.showOnHover')
        .should('be.visible')
        .should('have.attr', 'src')
        .should('include', 'previous-collection-1line-yellow');
    });

    it(`${collection.title} has the navigation image for next pg`, () => {
      cy.get('.collection-viewer #nav_next.nav_link_big')
        .find('img.hideOnHover')
        .should('be.visible')
        .should('have.attr', 'src')
        .should('include', 'next-collection-1line-white');
    });

    it(`${collection.title} has the navigation image on hover for next pg`, () => {
      cy.get('.collection-viewer #nav_next.nav_link_big')
        .realHover()
        .find('img.showOnHover')
        .should('be.visible')
        .should('have.attr', 'src')
        .should('include', 'next-collection-1line-yellow');
    });

    it(`${collection.title} has the navigation image for back to collections`, () => {
      cy.get('.collection-viewer #nav_back')
        .find('img.hideOnHover')
        .should('be.visible')
        .should('have.attr', 'src')
        .should('include', 'back-to-collections-menu-1line-white');
    });

    it(`${collection.title} has the navigation image on hover for back to collections`, () => {
      cy.get('.collection-viewer #nav_back')
        .realHover()
        .find('img.showOnHover')
        .should('be.visible')
        .should('have.attr', 'src')
        .should('include', 'back-to-collections-menu-1line-yellow');
    });
  });
});

describe('Collections - Old-Time Sportsmen', () => {
  const collection = collections.find((c) => c.title === 'Old-Time Sportsmen');

  it(`${collection.title} page successfully loads`, () => {
    cy.visit(collection.link);
  });

  it(`${collection.title} page contains the main text`, () => {
    cy.get('.collection_headerText').should(
      'contain.text',
      collection.headerText
    );
  });

  it(`${collection.title} has ${collection.numImages} images loaded`, () => {
    cy.get('ul.collection-viewer__content')
      .find('li')
      .should('have.length', collection.numImages);
  });

  it(`${collection.title} has the navigation image for previous pg`, () => {
    cy.get('.collection-viewer #nav_prev.nav_link_big')
      .find('img.hideOnHover')
      .should('be.visible')
      .should('have.attr', 'src')
      .should('include', 'previous-collection-1line-white');
  });

  it(`${collection.title} has the navigation image on hover for previous pg`, () => {
    cy.get('.collection-viewer #nav_prev.nav_link_big')
      .realHover()
      .find('img.showOnHover')
      .should('be.visible')
      .should('have.attr', 'src')
      .should('include', 'previous-collection-1line-yellow');
  });

  it(`${collection.title} has the navigation image for next pg`, () => {
    cy.get('.collection-viewer #nav_next.nav_link_big')
      .find('img.hideOnHover')
      .should('be.visible')
      .should('have.attr', 'src')
      .should('include', 'next-collection-1line-white');
  });

  it(`${collection.title} has the navigation image on hover for next pg`, () => {
    cy.get('.collection-viewer #nav_next.nav_link_big')
      .realHover()
      .find('img.showOnHover')
      .should('be.visible')
      .should('have.attr', 'src')
      .should('include', 'next-collection-1line-yellow');
  });

  it(`${collection.title} has the navigation image for back to collections`, () => {
    cy.get('header #nav_back')
      .find('img.hideOnHover')
      .should('be.visible')
      .should('have.attr', 'src')
      .should('include', 'back-to-collections-menu-1line-black');
  });

  it(`${collection.title} has the navigation image on hover for back to collections`, () => {
    cy.get('header #nav_back')
      .realHover()
      .find('img.showOnHover')
      .should('be.visible')
      .should('have.attr', 'src')
      .should('include', 'back-to-collections-menu-1line-yellow');
  });

  function cleanMatrix3d(matrix3d) {
    const matches = matrix3d.match(/matrix3d\((.+)\)/);
    if (!matches) return null;

    // Split the string of matrix values into an array of strings
    const values = matches[1].split(', ');

    // Round the values in the array to 6 decimal places
    values.forEach((value, i) => {
      if (Math.abs(Number(values[i]) == 0)) values[i] = 0;
      else values[i] = Number(Number(value).toFixed(6));
    });

    return 'matrix3d(' + values.join(', ') + ')';
  }

  const flipCards = [
    {
      title: 'Kodak Kate',
      frontImg: 'postcard01-kate1017-front',
      backImg: 'postcard01-kate1017-back',
    },
    {
      title: 'How is this for luck',
      frontImg: 'postcard02-luck1466-front',
      backImg: 'postcard02-luck1466-back',
    },
    {
      title: 'Dear Grandpa',
      frontImg: 'postcard03-grandpa027-front',
      backImg: 'postcard03-grandpa027-back',
    },
    {
      title: 'Say Fred',
      frontImg: 'postcard04-fred648-front',
      backImg: 'postcard04-fred648-back',
    },
  ];

  flipCards.forEach((card, index) => {
    it(`${collection.title} has the ${card.title} postcard image`, () => {
      cy.get('.flip-card')
        .eq(index)
        .find('.flip-card-front img')
        .should('be.visible')
        .should('have.attr', 'src')
        .should('include', card.frontImg);
    });

    it(`${collection.title} shows the back of the ${card.title} postcard image on hover`, () => {
      cy.get('.flip-card')
        .eq(index)
        .realHover()
        .find('.flip-card-back img')
        .should('have.attr', 'src')
        .should('include', card.backImg);

      cy.get('.flip-card')
        .eq(index)
        .realHover()
        .wait(800)
        .find('.flip-card-inner')
        .invoke('css', 'transform')
        .then((cssTransformMatrix3d) => {
          cy.getCssMatrix3dFromRotation('rotateY(180deg)').should(
            'eq',
            cleanMatrix3d(cssTransformMatrix3d)
          );
        });
    });
  });

  it('scrolling to bottom of page shows back to top button', () => {
    cy.scrollTo('bottom', { duration: 500 });
    cy.get('main')
      .find('#backToTopStaticDiv img.g-image--loaded')
      .should('be.visible')
      .should('have.attr', 'src')
      .should('include', 'back-to-top-1line-black');
  });

  it('clicking back to top button scrolls the page to the top', () => {
    cy.get('main').find('#backToTopStaticDiv img.g-image--loaded').click();
    cy.get('.titleImg').isScrolledTo();
  });
});
