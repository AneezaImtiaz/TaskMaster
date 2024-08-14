<template>
  <div class="card-container" @click="showEditModal = true">
    <h2 class="task-title">{{ task?.title }}</h2>
    <p class="task-description">{{ task?.description }}</p>
    <div class="card-footer">
      <div>
        <p class="task-due-date">Due: {{ task?.dueDate }}</p>
        <select
          class="task-status"
          v-model="task.status"
          @change="handleFormSubmit({ ...task, status: task.status })"
          @click.stop
        >
          <option v-for="status in statuses" :key="status" :value="status">
            {{ status }}
          </option>
        </select>
      </div>
      <img
        :src="deleteIcon"
        alt="Delete"
        class="delete-icon"
        @click.stop="showDeleteDialog = true"
      />
    </div>
  </div>

  <MessageDialog
    v-if="showDeleteDialog"
    :title="DELETE_DIALOG.title"
    :description="DELETE_DIALOG.description"
    button="Yes"
    closeButton="No"
    :onCloseButtonClick="() => (showDeleteDialog = false)"
    :onButtonClick="deleteTask"
  />

  <FormModal
    v-if="showEditModal"
    :task="task"
    submitButtonLabel="Confirm"
    :onSubmit="
      (task: Task) => {
        handleFormSubmit(task);
        showEditModal = false;
      }
    "
    @cancel="cancelForm"
  />
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import { FormModal } from "@/components";
import { deleteIcon } from "@/assets";
import { Task } from "@/types";
import { useTaskStore } from "@/stores/taskStore";
import { DELETE_DIALOG } from "@/utils/Constants";
import { MessageDialog } from "@/components/dialogs";
import "./TaskCard.css";

export default defineComponent({
  name: "TaskCard",
  components: {
    FormModal,
    MessageDialog,
  },
  props: {
    task: {
      type: Object as PropType<Task>,
      required: true,
    },
  },
  setup(props) {
    const taskStore = useTaskStore();
    const showEditModal = ref(false);
    const showDeleteDialog = ref(false);
    const statuses = ["Pending", "In Progress", "Completed"];

    const handleFormSubmit = (task: Task) => {
      taskStore.editTask(task);
    };

    const cancelForm = () => {
      showEditModal.value = false;
    };

    const deleteTask = () => {
      taskStore.deleteTask(props.task.id);
      showDeleteDialog.value = false;
    };

    return {
      showEditModal,
      showDeleteDialog,
      handleFormSubmit,
      cancelForm,
      deleteTask,
      deleteIcon,
      DELETE_DIALOG,
      statuses,
    };
  },
});
</script>
