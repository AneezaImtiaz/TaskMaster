import type { Preview } from '@storybook/vue3';
import { setup } from '@storybook/vue3';
import { createPinia } from 'pinia';

// Setup function to initialize Pinia
setup((app) => {
  const pinia = createPinia();
  app.use(pinia);
});

const preview: Preview = {
  tags: ["autodocs"]
};

export default preview;