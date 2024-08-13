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
import { defineComponent, reactive, toRefs, watch, PropType } from 'vue';
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
    task: {
      type: Object as PropType<Task>,
      default: () => ({
        id: 0,
        title: '',
        description: '',
        dueDate: new Date().toISOString().split('T')[0], // Default to today's date
        status: 'Pending',
      }),
    },
  },
  emits: ['cancel'],
  setup(props, { emit }) {
    const task = reactive<Task>({ ...props.task });

    watch(
      () => props.task,
      (newTask) => {
        Object.assign(task, newTask);
      },
      { deep: true, immediate: true }
    );

    const submitForm = () => {
      props.onSubmit({ ...task, id: task?.id || Date.now() });
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