import { mount } from '@cypress/vue';
import { FormModal } from '../../src/components';
import { Task } from '../../src/types';

describe('FormModal Component', () => {
  const task: Task = {
    id: 1,
    title: "Sample Task",
    description: "This is a sample task description.",
    status: "Pending",
    dueDate: "2023-12-31",
  };

  it('renders correctly', () => {
    mount(FormModal, {
      props: {
        submitButtonLabel: 'Save',
        onSubmit: cy.stub().as('onSubmit'),
        task,
      },
    });

    cy.get('input[placeholder="Title"]').should('have.value', task.title);
    cy.get('textarea[placeholder="Description"]').should('have.value', task.description);
    cy.get('input[type="date"]').should('have.value', task.dueDate);
    cy.get('button[type="submit"]').should('contain', 'Save');
    cy.get('button[type="button"]').should('contain', 'Cancel');
  });

  it('handles form input changes', () => {
    mount(FormModal, {
      props: {
        submitButtonLabel: 'Save',
        onSubmit: cy.stub().as('onSubmit'),
        task,
      },
    });

    cy.get('input[placeholder="Title"]').clear().type('Updated Task');
    cy.get('textarea[placeholder="Description"]').clear().type('Updated Description');
    cy.get('input[type="date"]').clear().type('2023-11-30');

    cy.get('input[placeholder="Title"]').should('have.value', 'Updated Task');
    cy.get('textarea[placeholder="Description"]').should('have.value', 'Updated Description');
    cy.get('input[type="date"]').should('have.value', '2023-11-30');
  });

  it('handles form submission', () => {
    mount(FormModal, {
      props: {
        submitButtonLabel: 'Save',
        onSubmit: cy.stub().as('onSubmit'),
        task,
      },
    });

    cy.get('input[placeholder="Title"]').clear().type('Updated Task');
    cy.get('textarea[placeholder="Description"]').clear().type('Updated Description');
    cy.get('input[type="date"]').clear().type('2023-11-30');

    cy.get('button[type="submit"]').click();

    cy.get('@onSubmit').should('have.been.calledWith', {
      ...task,
      title: 'Updated Task',
      description: 'Updated Description',
      dueDate: '2023-11-30',
    });
  });

  it('handles cancel button click', () => {
    const onCancel = cy.stub().as('onCancel');
    mount(FormModal, {
      props: {
        submitButtonLabel: 'Save',
        onSubmit: cy.stub().as('onSubmit'),
        task,
      },
      attrs: {
        onCancel,
      },
    });

    cy.get('button[type="button"]').contains('Cancel').click();
    cy.get('@onCancel').should('have.been.called');
  });
});