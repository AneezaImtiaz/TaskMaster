<template>
  <div class="modal-overlay" @click.self="cancel">
    <div class="modal-card">
      <form @submit.prevent="submitForm">
        <input v-model="task.title" placeholder="Title" required />
        <textarea v-model="task.description" placeholder="Description" required />
        <input v-model="task.dueDate" type="date" required />
        <div class="buttons">
          <button type="submit">{{ submitButtonLabel }}</button>
          <button type="button" @click="cancel">Cancel</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, PropType } from 'vue';
import { Task } from '@/types';
import './FormModal.css';

export default defineComponent({
  name: 'FormModal',
  props: {
    submitButtonLabel: {
      type: String,
      required: true,
    },
    onSubmit: {
      type: Function as PropType<(task: Task) => void>,
      required: true,
    },
  },
  emits: ['cancel'],
  setup(props, { emit }) {
    const formatDate = (date: Date): string => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    const task = reactive<Task>({
      id: 0,
      title: '',
      description: '',
      dueDate: formatDate(new Date()),
      status: 'pending',
    });

    const submitForm = () => {
      props.onSubmit({ ...task, id: Date.now() });
    };

    const cancel = () => {
      emit('cancel');
    };

    return {
      ...toRefs(task),
      submitForm,
      cancel,
      task,
    };
  },
});
</script>