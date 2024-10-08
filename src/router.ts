import { createRouter, createWebHistory } from "vue-router";
import HomeScreen from "@/screens/HomeScreen.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeScreen,
  },
  // Add more routes here
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
