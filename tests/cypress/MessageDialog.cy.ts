import { mount } from '@cypress/vue';
import {MessageDialog} from '../../src/components/dialogs';

describe('MessageDialog Component', () => {
  it('renders correctly and handles button clicks', () => {
    const onButtonClick = cy.stub().as('onButtonClick');
    const onCloseButtonClick = cy.stub().as('onCloseButtonClick');

    mount(MessageDialog, {
      props: {
        title: 'Test Title',
        description: 'Test Description',
        button: 'Confirm',
        closeButton: 'Cancel',
        onButtonClick,
        onCloseButtonClick,
      },
    });

    cy.get('h2').contains('Test Title');
    cy.get('p').contains('Test Description');
    cy.get('button').contains('Confirm').click();
    cy.get('@onButtonClick').should('have.been.calledOnce');
    cy.get('button').contains('Cancel').click();
    cy.get('@onCloseButtonClick').should('have.been.calledOnce');
  });
});