<template>
  <div class="container">
    <div class="content">
      <h1>Task List</h1>
      <button @click="showFormModal = true">+</button>
    </div>
    <div class="filters">
      <select class="modal" v-model="selectedStatus">
        <option value="">All</option>
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>

      <select class="modal" v-model="sortOrder">
        <option value="dueDateDesc">Latest to Earlier</option>
        <option value="dueDateAsc">Earlier to Latest</option>
      </select>
    </div>

    <Search :onButtonClick="handleSearch" :placeholder="`${SEARCH} task here...`" />

    <div class="list-container">
      <TaskCard v-for="task in filteredTasks" :key="task.id" :task="task" />
    </div>

    <FormModal v-if="showFormModal" submitButtonLabel="Create" :onSubmit="handleFormSubmit" @cancel="cancelForm" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useTaskStore } from '@/stores/taskStore';
import { Task } from '@/types';
import { SEARCH } from '@/utils/Constants';
import { FormModal, TaskCard, Search } from '@/components';
import './HomeScreen.css';

export default defineComponent({
  name: 'HomeScreen',
  components: {
    FormModal,
    TaskCard,
    Search,
  },
  setup() {
    const taskStore = useTaskStore();
    const showFormModal = ref(false);
    const selectedStatus = ref('');
    const sortOrder = ref('dueDateDesc');
    const searchQuery = ref('');
    const tasks = computed(() => taskStore.tasks);

    const filteredTasks = computed(() => {
      let filtered = tasks.value;
      if (selectedStatus.value) {
        filtered = filtered.filter(task => task.status === selectedStatus.value);
      }
      if (sortOrder.value === 'dueDateAsc') {
        filtered = filtered.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
      } else if (sortOrder.value === 'dueDateDesc') {
        filtered = filtered.sort((a, b) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime());
      }
      if (searchQuery.value) {
        filtered = filtered.filter(task => task.title.toLowerCase().includes(searchQuery.value.toLowerCase()));
      }
      return filtered;
    });

    const handleFormSubmit = (task: Task) => {
      taskStore.addTask(task);
      showFormModal.value = false;
    };

    const handleSearch = (value: string) => {
      searchQuery.value = value;
    };

    const cancelForm = () => {
      showFormModal.value = false;
    };

    return {
      tasks,
      showFormModal,
      handleFormSubmit,
      cancelForm,
      selectedStatus,
      sortOrder,
      filteredTasks,
      SEARCH,
      handleSearch,
    };
  },
});
</script>