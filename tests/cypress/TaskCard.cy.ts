import { mount } from '@cypress/vue';
import { TaskCard } from '../../src/components';
import { Task } from '../../src/types';
import { deleteIcon } from '../../src/assets';
import { createTestingPinia } from '@pinia/testing';
import { DELETE_DIALOG } from '../../src/utils/Constants';

describe('TaskCard Component', () => {
  const task: Task = {
    id: 1,
    title: 'Test Task',
    description: 'Test Description',
    dueDate: '2023-12-31',
    status: 'Pending',
  };

  beforeEach(() => {
    mount(TaskCard, {
      props: {
        task,
      },
      global: {
        plugins: [createTestingPinia({
          createSpy: cy.spy,
        })],
      },
    });
  });

  it('renders correctly', () => {
    cy.get('.task-title').should('contain', task.title);
    cy.get('.task-description').should('contain', task.description);
    cy.get('.task-due-date').should('contain', `Due: ${task.dueDate}`);
    cy.get('.task-status').should('have.value', task.status);
    cy.get('.delete-icon').should('have.attr', 'src', deleteIcon);
  });

  it('handles status changes', () => {
    cy.get('.task-status').select('Completed');
    cy.get('.task-status').should('have.value', 'Completed');
  });

  it('handles delete action', () => {
    cy.get('.delete-icon').click();
    cy.get('.alert-content').should('be.visible');
    cy.get('.alert-content h2').should('contain', DELETE_DIALOG.title);
    cy.get('.alert-content p').should('contain', DELETE_DIALOG.description);
    cy.get('.alert-content button').contains('Yes').click();
    cy.get('.alert-content').should('not.exist');
  });
});
