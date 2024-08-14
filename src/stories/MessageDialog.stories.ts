import { MessageDialog } from "@/components";
import { Meta, StoryFn } from "@storybook/vue3";

export default {
  title: "Components/Dialogs/MessageDialog",
  component: MessageDialog,
  argTypes: {
    title: {
      description: "The title of the dialog",
      control: "text",
    },
    description: {
      description: "The description of the dialog",
      control: "text",
    },
    button: {
      description: "The text for the primary button",
      control: "text",
    },
    closeButton: {
      description: "The text for the close button (optional)",
      control: "text",
    },
    onButtonClick: {
      description: "Callback function when the primary button is clicked",
      action: "button clicked",
    },
    onCloseButtonClick: {
      description:
        "Callback function when the close button is clicked (optional)",
      action: "close button clicked",
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "The `MessageDialog` component is used to display a dialog with a title, description, and buttons for user actions.",
      },
    },
  },
} as Meta<typeof MessageDialog>;

const Template: StoryFn<typeof MessageDialog> = (args) => ({
  components: { MessageDialog },
  setup() {
    return { args };
  },
  template: '<MessageDialog v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  title: "Default Title",
  description: "This is a default description",
  button: "Confirm",
  closeButton: "Cancel",
};

export const WithoutCloseButton = Template.bind({});
WithoutCloseButton.args = {
  title: "No Close Button",
  description: "This dialog does not have a close button",
  button: "Confirm",
  closeButton: "",
};
