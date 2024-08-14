import { defineConfig } from 'cypress';
import { devServer } from '@cypress/vite-dev-server';

export default defineConfig({
  component: {
    devServer: {
      framework: 'vue',
      bundler: 'vite',
    },
    specPattern: 'tests/cypress/**/*.cy.{js,ts,jsx,tsx}',
    indexHtmlFile: 'cypress/support/component-index.html',
    supportFile: 'cypress/support/component.js',
  },
  setupNodeEvents(on, config) {
    on('dev-server:start', (options) => {
      return devServer(options);
    });
  },
});