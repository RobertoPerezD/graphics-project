import { createWebHistory, createRouter } from "vue-router";

import ChartsPage from "../pages/Charts/ChartsPage.vue";

const routes = [
  {
    path: "/",
    name: "ChartsPage",
    component: ChartsPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  linkExactActiveClass: "active",
  routes: routes,
  scrollBehavior() {
    return { top: 0, behavior: "smooth" };
  },
});

export default router;
