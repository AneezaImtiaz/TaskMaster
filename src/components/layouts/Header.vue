<template>
  <header class="header">
    <h1 class="title">{{ APP_TITLE }}</h1>
    <div class="navbar">
      <ul class="navbar-list">
        <li :class="['navbar-item', isSelected('/') ? 'selected' : '']">
          <a href="/">{{ ROUTES.home }}</a>
        </li>
        <!-- All other navigation items you want to add in header -->
      </ul>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import './Header.css';
import { APP_TITLE, ROUTES } from '@/utils/Constants';

export default defineComponent({
  name: 'Header',
  data() {
    return {
      APP_TITLE,
      ROUTES,
    };
  },
  methods: {
    isSelected(path: string): boolean {
      return window.location.pathname === path;
    },
  },
});
</script>