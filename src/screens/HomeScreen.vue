<template>
  <div class="container">
    <div class="content">
      <h1>Task List</h1>
      <button @click="showFormModal = true">+</button>
    </div>
    <div class="list-container">
      <TaskCard v-for="task in tasks" :key="task.id" :task="task" />
    </div>
    <FormModal v-if="showFormModal" submitButtonLabel="Add Task" :onSubmit="handleFormSubmit" @cancel="cancelForm" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useTaskStore } from '@/stores/taskStore';
import { Task } from '@/types';
import { FormModal, TaskCard } from '@/components';
import './HomeScreen.css';

export default defineComponent({
  name: 'HomeScreen',
  components: {
    FormModal,
    TaskCard,
  },
  setup() {
    const taskStore = useTaskStore();
    const showFormModal = ref(false);
    const tasks = computed(() => taskStore.tasks);

    const handleFormSubmit = (task: Task) => {
      taskStore.addTask(task);
      showFormModal.value = false;
    };

    const cancelForm = () => {
      showFormModal.value = false;
    };

    return {
      tasks: tasks,
      showFormModal,
      handleFormSubmit,
      cancelForm,
    };
  },
});
</script>