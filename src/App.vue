<template>
  <div class="app">
    <Header />
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import "./style.css";
import { Header } from "@/components";

export default defineComponent({
  name: "App",
  components: { Header },
});
</script>
