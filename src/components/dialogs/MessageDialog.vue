<template>
  <div class="alert-content">
    <h2>{{ title }}</h2>
    <p>{{ description }}</p>
    <div class="alert-button-container">
      <button @click="onButtonClick">{{ button }}</button>
      <button v-if="closeButton" @click="onCloseButtonClick">{{ closeButton }}</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import './MessageDialog.css';

export default defineComponent({
  name: 'MessageDialog',
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    button: {
      type: String,
      required: true
    },
    closeButton: {
      type: String,
      default: ''
    },
    onButtonClick: {
      type: Function as PropType<() => void>,
      required: true
    },
    onCloseButtonClick: {
      type: Function as PropType<() => void>,
      default: () => { }
    }
  },
});
</script>