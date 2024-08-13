<template>
  <div class="card-container">
    <h2 class="task-title">{{ task?.title }}</h2>
    <p class="task-description">{{ task?.description }}</p>
    <p class="task-due-date">Due: {{ task?.dueDate }}</p>
    <p class="task-status">Status: {{ task?.status }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Task } from '@/types';
import './TaskCard.css';

export default defineComponent({
  props: {
    task: {
      type: Object as PropType<Task>,
      required: true,
    },
  },
});
</script>