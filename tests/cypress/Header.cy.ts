import { mount } from '@cypress/vue';
import { Header } from '../../src/components';
import { APP_TITLE, ROUTES } from '../../src/utils/Constants';

describe('Header Component', () => {
    it('renders correctly', () => {
        mount(Header);

        cy.get('.title').should('contain', APP_TITLE);
        cy.get('.navbar-list').should('be.visible');
        cy.get('.navbar-item').should('have.length', Object.keys(ROUTES).length);
    });

    it('highlights the selected navigation item', () => {
        // Set the current path to '/'
        cy.window().then((win) => {
          win.history.pushState({}, '', '/');
        });
    
        mount(Header); 
        cy.get('.navbar-item.selected').should('contain', ROUTES.home);
      });
});