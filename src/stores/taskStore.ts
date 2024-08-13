import { defineStore } from 'pinia';
import { Task } from '../types';

export const useTaskStore = defineStore('taskStore', {
    state: () => ({
        tasks: [] as Task[],
    }),

    actions: {
        addTask(task: Task) {
            this.tasks.push(task);
        },
    },
});