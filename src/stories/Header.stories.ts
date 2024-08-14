import { Header } from '@/components';
import { Meta, StoryFn } from '@storybook/vue3';

export default {
    title: 'Components/Layouts/Header',
    component: Header,
    parameters: {
        docs: {
            description: {
                component: 'The `Header` component displays the application title and a navigation bar.',
            },
        },
    },
} as Meta<typeof Header>;

const Template: StoryFn<typeof Header> = (args) => ({
    components: { Header },
    setup() {
        return { args };
    },
    template: '<Header v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {};