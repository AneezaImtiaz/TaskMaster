import { defineStore } from "pinia";
import { Task } from "@/types";

export const useTaskStore = defineStore("taskStore", {
  state: () => ({
    tasks: [] as Task[],
  }),

  actions: {
    addTask(task: Task) {
      this.tasks.push(task);
    },

    editTask(task: Task) {
      const index = this.tasks.findIndex((t) => t.id === task.id);
      if (index !== -1) {
        this.tasks[index] = task;
      }
    },

    deleteTask(taskId: number) {
      this.tasks = this.tasks.filter((task) => task.id !== taskId);
    },
  },

  persist: {
    key: "taskStore", // Key to store the state under in localStorage
    storage: localStorage, // Storage mechanism
  },
});
