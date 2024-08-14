import { Meta, StoryFn } from '@storybook/vue3';
import { FormModal } from '@/components';
import { Task } from '@/types';

export default {
    title: 'Components/Modals/FormModal',
    component: FormModal,
    parameters: {
      docs: {
        description: {
          component: 'The `FormModal` component is used to edit or create tasks with a form.',
        },
      },
    },
    argTypes: {
      submitButtonLabel: {
        description: 'Label for the submit button.',
        control: {
          type: 'text',
        },
      },
      onSubmit: {
        description: 'Callback function to handle the form submission.',
        action: 'form submitted',
      },
      task: {
        description: 'The task object containing details of the task to edit.',
        control: {
          type: 'object',
        },
      },
    },
  } as Meta<typeof FormModal>;
  
  const Template: StoryFn<typeof FormModal> = (args: any) => ({
    components: { FormModal },
    setup() {
      const handleSubmit = (task: Task) => {
        args.onSubmit(task);
      };
  
      const handleCancel = () => {
        args.onCancel();
      };
  
      return { args, handleSubmit, handleCancel };
    },
    template: '<FormModal v-bind="args" @cancel="handleCancel" />',
  });
  
  export const Default = Template.bind({});
  Default.args = {
    submitButtonLabel: 'Create',
    task: {
      id: 0,
      title: '',
      description: '',
      dueDate: new Date().toISOString().split('T')[0],
      status: 'Pending',
    } as Task,
  };
  
  export const EditForm = Template.bind({});
  EditForm.args = {
    submitButtonLabel: 'Confirm',
    task: {
      id: 1,
      title: 'Sample Task',
      description: 'This is a sample task description.',
      dueDate: '2023-12-31',
      status: 'Completed',
    } as Task,
  };