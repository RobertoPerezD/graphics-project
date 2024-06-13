import { createWebHistory, createRouter } from "vue-router";

import ChartsPage from "../pages/Charts/ChartsPage.vue";
import MixedChartsPage from "../pages/Charts/MixedChartsPage.vue";

const routes = [
  {
    path: "/",
    name: "ChartsPage",
    component: ChartsPage,
  },
  {
    path: "/mixed-charts",
    name: "MixedChartsPage",
    component: MixedChartsPage,
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
