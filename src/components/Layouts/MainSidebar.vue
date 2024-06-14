<template>
  <div :class="[
    'sidebar-area position-fixed start-0 top-0 bg-black h-100vh transition',
    { active: stateStoreInstance.open },
  ]" id="sidebar-area">
    <div class="logo position-absolute start-0 end-0 top-0 bg-black">
      <router-link to="/" class="d-flex align-items-center text-white text-decoration-none">
        <span class="fw-bold ms-10">GRAFICAS</span>
      </router-link>
      <div class="border-bottom"></div>
      <button class="sidebar-burger-menu position-absolute lh-1 bg-transparent p-0 border-0"
        @click="stateStoreInstance.onChange">
        <i class="ph-duotone ph-caret-double-right"></i>
      </button>
    </div>
    <div class="sidebar-menu">
      <ul class="sidebar-navbar-nav ps-0 mb-0 list-unstyled accordion" id="sidebarNavAccordion">
        <li class="sidebar-nav-item accordion-item bg-transparent border-0 rounded-0">
          <a href="#" class="accordion-button collapsed rounded-0 shadow-none bg-transparent d-block"
            data-bs-toggle="collapse" data-bs-target="#sidebarCollapseFourteen" aria-expanded="false"
            aria-controls="sidebarCollapseFourteen">
            <i class="flaticon-pie-chart"></i>
            <span class="title">Graficas</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import stateStore from "../../utils/store";

export default defineComponent({
  name: "MainSidebar",
  setup() {
    const stateStoreInstance = stateStore;
    return {
      stateStoreInstance,
    };
  },
});
</script>