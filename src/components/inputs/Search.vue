<template>
  <div class="search-container">
    <MessageDialog v-if="showEmptyDialog" :title="EMPTY_SEARCH_DIALOG.title"
      :description="EMPTY_SEARCH_DIALOG.description" :button="CLOSE" @buttonClick="showEmptyDialog = false" />
    <div class="search-content">
      <input class="search-input" type="text" :placeholder="placeholder" v-model="text" @input="handleInputChange" />
      <button @click="handleButtonClick">{{ SEARCH }}</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from 'vue';
import { SEARCH, EMPTY_SEARCH_DIALOG, CLOSE } from '@/utils/Constants';
import { MessageDialog } from '@/components';
import './Search.css';

export default defineComponent({
  name: 'Search',
  components: {
    MessageDialog,
  },
  props: {
    onButtonClick: {
      type: Function as PropType<(value: string) => void>,
      required: true
    },
    placeholder: {
      type: String,
      default: `${SEARCH}...`,
    },
  },
  setup(props) {
    const text = ref('');
    const showEmptyDialog = ref(false);

    const handleButtonClick = () => {
      if (!text.value) {
        showEmptyDialog.value = true;
      } else {
        props.onButtonClick(text.value);
      }
    };

    const handleInputChange = () => {
      if (!text.value.trim()) {
        props.onButtonClick('');
      }
    };

    return {
      text,
      showEmptyDialog,
      handleButtonClick,
      handleInputChange,
      SEARCH,
      EMPTY_SEARCH_DIALOG,
      CLOSE,
    };
  },
});
</script>