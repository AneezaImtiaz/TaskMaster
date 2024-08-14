import { defineConfig } from 'cypress';

export default defineConfig({
  component: {
    devServer: {
      framework: 'vue',
      bundler: 'vite',
    },
    specPattern: 'tests/cypress/**/*.cy.{js,ts,jsx,tsx}',
    supportFile: 'cypress/support/component.js',
  },
});