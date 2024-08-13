<template>
  <div @click="showEditModal = true" class="card-container">
    <h2 class="task-title">{{ task?.title }}</h2>
    <p class="task-description">{{ task?.description }}</p>
    <p class="task-due-date">Due: {{ task?.dueDate }}</p>
    <p class="task-status">Status: {{ task?.status }}</p>
  </div>
  <FormModal v-if="showEditModal" :task="task" submitButtonLabel="Confirm" :onSubmit="handleFormSubmit" @cancel="cancelForm" />
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import { FormModal } from '@/components';
import { Task } from '@/types';
import { useTaskStore } from '@/stores/taskStore';
import './TaskCard.css';

export default defineComponent({
  name: 'TaskCard',
  components: {
    FormModal,
  },
  props: {
    task: {
      type: Object as PropType<Task>,
      required: true,
    },
  },
  setup() {
    const taskStore = useTaskStore();
    const showEditModal = ref(false);

    const handleFormSubmit = (task: Task) => {
      taskStore.editTask(task);
      showEditModal.value = false;
    };

    const cancelForm = () => {
      showEditModal.value = false;
    };

    return {
      showEditModal,
      handleFormSubmit,
      cancelForm,
    };
  },
});
</script>