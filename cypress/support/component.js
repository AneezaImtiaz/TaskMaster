import { mount } from '@cypress/vue';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPersistedstate from 'pinia-plugin-persistedstate';
import router from '../../src/router';
import '../../src/style.css';

Cypress.Commands.add('mount', (component, options = {}) => {
  const app = createApp(component);
  const pinia = createPinia();
  pinia.use(piniaPersistedstate);

  app.use(router);
  app.use(pinia);

  return mount(component, {
    global: {
      plugins: [router, pinia],
      ...options.global,
    },
  });
});