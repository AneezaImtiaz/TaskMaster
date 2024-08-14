import { mount } from '@cypress/vue';
import { Search } from '../../src/components';
import { SEARCH, EMPTY_SEARCH_DIALOG, CLOSE } from '../../src/utils/Constants';

describe('Search Component', () => {
    it('renders correctly', () => {
        mount(Search, {
            props: {
                onButtonClick: cy.stub().as('onButtonClick'),
                placeholder: 'Search...',
            },
        });

        cy.get('.search-input').should('have.attr', 'placeholder', 'Search...');
        cy.get('button').contains(SEARCH);
    });

    it('handles input changes', () => {
        const onButtonClick = cy.stub().as('onButtonClick');
        mount(Search, {
            props: {
                onButtonClick,
                placeholder: 'Search...',
            },
        });

        cy.get('.search-input').type('test');
        cy.get('@onButtonClick').should('not.have.been.called');
    });

    it('handles button clicks with non-empty input', () => {
        const onButtonClick = cy.stub().as('onButtonClick');
        mount(Search, {
            props: {
                onButtonClick,
                placeholder: 'Search...',
            },
        });

        cy.get('.search-input').type('test');
        cy.get('button').contains(SEARCH).click();
        cy.get('@onButtonClick').should('have.been.calledWith', 'test');
    });

    it('shows MessageDialog when input is empty', () => {
        mount(Search, {
            props: {
                onButtonClick: cy.stub().as('onButtonClick'),
                placeholder: 'Search...',
            },
        });

        cy.get('button').contains(SEARCH).click();
        cy.get('.alert-content').should('be.visible');
        cy.get('.alert-content h2').should('contain', EMPTY_SEARCH_DIALOG.title);
        cy.get('.alert-content p').should('contain', EMPTY_SEARCH_DIALOG.description);
        cy.get('.alert-content button').contains(CLOSE).click();
        cy.get('.alert-content').should('not.exist');
    });
});