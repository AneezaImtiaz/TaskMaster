import { Meta, StoryFn } from "@storybook/vue3";
import { within, userEvent } from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import { FormModal } from "@/components";
import { Task } from "@/types";

export default {
  title: "Components/Modals/FormModal",
  component: FormModal,
  parameters: {
    docs: {
      description: {
        component:
          "The `FormModal` component is used to edit or create tasks with a form.",
      },
    },
  },
  argTypes: {
    submitButtonLabel: {
      description: "Label for the submit button.",
      control: {
        type: "text",
      },
    },
    onSubmit: {
      description: "Callback function to handle the form submission.",
      action: "form submitted",
    },
    task: {
      description: "The task object containing details of the task to edit.",
      control: {
        type: "object",
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
  template: '<FormModal v-bind="args" @onSubmit="handleSubmit" @cancel="handleCancel" />',
});

export const Default = Template.bind({});
Default.args = {
  submitButtonLabel: "Create",
  task: {
    id: 0,
    title: "",
    description: "",
    dueDate: new Date().toISOString().split("T")[0],
    status: "Pending",
  } as Task,
};

export const EditForm = Template.bind({});
EditForm.args = {
  submitButtonLabel: "Confirm",
  task: {
    id: 1,
    title: "Sample Task",
    description: "This is a sample task description.",
    dueDate: "2023-12-31",
    status: "Completed",
  } as Task,
};

export const WithInteraction = Template.bind({});
WithInteraction.args = {
  submitButtonLabel: "Create",
  task: {
    id: 0,
    title: "",
    description: "",
    dueDate: new Date().toISOString().split("T")[0],
    status: "Pending",
  } as Task,
  onSubmit: (task: Task) => {
    console.log("Form submitted:", task);
  },
  onCancel: () => {
    console.log("Form cancelled");
  }
};

WithInteraction.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  // Simulate filling out the form fields
  const titleInput = await canvas.getByPlaceholderText("Title");
  await userEvent.type(titleInput, "New Task Title");
  await expect(titleInput).toHaveValue("New Task Title");

  const descriptionInput = await canvas.getByPlaceholderText("Description");
  await userEvent.type(descriptionInput, "New Task Description");
  await expect(descriptionInput).toHaveValue("New Task Description");

  const dueDateInput = await canvas.getByDisplayValue(new Date().toISOString().split("T")[0]);
  await userEvent.clear(dueDateInput);
  await userEvent.type(dueDateInput, "2023-12-31");
  await expect(dueDateInput).toHaveValue("2023-12-31");

  // Simulate clicking the submit button
  const submitButton = await canvas.getByRole("button", { name: "Create" });
  await userEvent.click(submitButton);
  await expect(submitButton).toBeCalled;

  // Simulate clicking the cancel button
  const cancelButton = await canvas.getByRole("button", { name: "Cancel" });
  await userEvent.click(cancelButton);
  await expect(cancelButton).toBeCalled;
};
