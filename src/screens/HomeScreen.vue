<template>
  <div class="container">
    <div class="content">
      <h1>Task List</h1>
      <button @click="showFormModal = true">+</button>
    </div>
    <FormModal v-if="showFormModal" submitButtonLabel="Add Task" :onSubmit="handleFormSubmit" @cancel="cancelForm" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useTaskStore } from '@/stores/taskStore';
import { Task } from '@/types';
import { FormModal } from '@/components';
import './HomeScreen.css';

export default defineComponent({
  name: 'HomeScreen',
  components: {
    FormModal,
  },
  setup() {
    const taskStore = useTaskStore();
    const showFormModal = ref(false);

    const handleFormSubmit = (task: Task) => {
      taskStore.addTask(task);
      showFormModal.value = false;
    };

    const cancelForm = () => {
      showFormModal.value = false;
    };

    return {
      showFormModal,
      handleFormSubmit,
      cancelForm,
    };
  },
});
</script>