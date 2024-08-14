import { Search } from '@/components';
import { Meta, StoryFn } from '@storybook/vue3';

export default {
  title: 'Components/Inputs/Search',
  component: Search,
  parameters: {
    docs: {
      description: {
        component: 'The `Search` component allows users to input a search term and trigger a search action.',
      },
    },
  },
  argTypes: {
    onButtonClick: {
      description: 'Callback function to handle the button click.',
      action: 'button clicked',
    },
    placeholder: {
      description: 'Placeholder text for the search input.',
      control: {
        type: 'text',
      },
    },
  },
} as Meta<typeof Search>;

const Template: StoryFn<typeof Search> = (args: any) => ({
  components: { Search },
  setup() {
    return { args };
  },
  template: '<Search v-bind="args"/>',
});

export const Default = Template.bind({});
Default.args = {
  placeholder: 'Search...',
};

export const WithCustomPlaceholder = Template.bind({});
WithCustomPlaceholder.args = {
  placeholder: 'Enter your search term...',
};