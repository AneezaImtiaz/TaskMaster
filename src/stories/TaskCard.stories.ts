import { TaskCard, MessageDialog, FormModal } from "@/components";
import { Meta, StoryFn } from "@storybook/vue3";
import { Task } from "@/types";
import { ref, onMounted, nextTick } from "vue";
import { within, userEvent } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

export default {
  title: "Components/Cards/TaskCard",
  component: TaskCard,
  parameters: {
    docs: {
      description: {
        component:
          "The `TaskCard` component displays a task with options to edit or delete it.",
      },
    },
  },
  argTypes: {
    task: {
      description: "The task object containing details of the task.",
      control: {
        type: "object",
      },
    },
    showEditModal: {
      description: "Boolean to control the visibility of the edit modal.",
      control: {
        type: "boolean",
      },
    },
    showDeleteDialog: {
      description: "Boolean to control the visibility of the delete dialog.",
      control: {
        type: "boolean",
      },
    },
    handleFormSubmit: {
      description: "Callback function to handle the form submission.",
      action: "form submitted",
    },
    cancelForm: {
      description: "Callback function to handle the form cancellation.",
      action: "form cancelled",
    },
    deleteTask: {
      description: "Callback function to handle the task deletion.",
      action: "task deleted",
    },
    deleteIcon: {
      description: "URL of the delete icon.",
      control: {
        type: "text",
      },
    },
    DELETE_DIALOG: {
      description: "Object containing the delete dialog configuration.",
      control: {
        type: "object",
      },
    },
    statuses: {
      description: "Array of possible task statuses.",
      control: {
        type: "array",
      },
    },
  },
} as Meta<typeof TaskCard>;

const Template: StoryFn<typeof TaskCard> = (args: any) => ({
  components: { TaskCard, MessageDialog, FormModal },
  setup() {
    return { args };
  },
  template: '<TaskCard v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  task: {
    id: 1,
    title: "Sample Task",
    description: "This is a sample task description.",
    status: "Pending",
    dueDate: "2023-12-31",
  } as Task,
};

export const LongTitleAndDescription = Template.bind({});
LongTitleAndDescription.args = {
  task: {
    id: 2,
    title:
      "This is a task with a very long title that might need to be truncated or handled in a special way",
    description:
      "This is a task with a very long description that might need to be truncated or handled in a special way. It goes on and on and might span multiple lines.",
    status: "Pending",
    dueDate: "2023-12-31",
  },
};
const WithEditModalTemplate: StoryFn<typeof TaskCard> = (args: any) => ({
  components: { TaskCard, MessageDialog, FormModal },
  setup() {
    const showEditModal = ref(true);

    // Simulate opening the edit modal by clicking on the card
    onMounted(() => {
      nextTick(() => {
        const card = document.querySelector(".card-container") as HTMLElement;
        if (card) {
          card.click();
        }
      });
    });

    return { args, showEditModal };
  },
  template: '<TaskCard v-bind="args" :showEditModal="showEditModal" />',
});

export const WithEditModal = WithEditModalTemplate.bind({});
WithEditModal.args = {
  ...Default.args,
};

const WithDeleteDialogTemplate: StoryFn<typeof TaskCard> = (args: any) => ({
  components: { TaskCard, MessageDialog, FormModal },
  setup() {
    const showDeleteDialog = ref(true);

    // Simulate opening the delete dialog by clicking on the icon
    onMounted(() => {
      nextTick(() => {
        const icon = document.querySelector(".delete-icon") as HTMLElement;
        if (icon) {
          icon.click();
        }
      });
    });

    return { args, showDeleteDialog };
  },
  template: '<TaskCard v-bind="args" :showDeleteDialog="showDeleteDialog" />',
});

export const WithDeleteDialog = WithDeleteDialogTemplate.bind({});
WithDeleteDialog.args = {
  ...Default.args,
};

export const WithInteraction = Template.bind({});
WithInteraction.args = {
  task: {
    id: 1,
    title: "Sample Task",
    description: "This is a sample task description.",
    status: "Pending",
    dueDate: "2023-12-31",
  },
};

WithInteraction.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  // Simulate clicking the card container to open the edit modal
  const cardContainer = await canvas.getByText("Sample Task");
  await userEvent.click(cardContainer);

  // Check if the EditModal opens
  const button = await canvas.findByText("Confirm");
  await expect(button).toBeInTheDocument();


  // Simulate clicking the delete icon to open the delete dialog
  const deleteIcon = await canvas.getByAltText("Delete");
  await userEvent.click(deleteIcon);

  // Check if the MessageDialog opens
  const dialogTitle = await canvas.findByText("Delete Task");
  await expect(dialogTitle).toBeInTheDocument();

};
