import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import BootstrapVueNext from "bootstrap-vue-next";
import VueApexCharts from "vue3-apexcharts";
import { QuillEditor } from "@vueup/vue-quill";
import Vue3Prism from "vue3-prism/lib/Vue3Prism.common.js";
import PrimeVue from "primevue/config";
import Loading from "vue-loading-overlay";
import moment from "moment-timezone";
import VueToast from "vue-toastification";
import ConfirmationService from "primevue/confirmationservice";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue-next/dist/bootstrap-vue-next.css";
import "swiper/css";
import "swiper/css/bundle";
import "flatpickr/dist/flatpickr.css";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import "@vueup/vue-quill/dist/vue-quill.bubble.css";
import "vue3-prism/lib/Vue3Prism.css";
import "./assets/custom.scss";
import "primevue/resources/themes/saga-blue/theme.css";
// import "primevue/resources/themes/lara-dark-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import "vue-loading-overlay/dist/css/index.css";
import "vue-toastification/dist/index.css";

const app = createApp(App).use(router);
app.use(VueApexCharts);
app.use(BootstrapVueNext);
app.use(PrimeVue);
app.use(ConfirmationService);
app.use(VueToast);
app.component("VueLoading", Loading);
app.component("QuillEditor", QuillEditor).use(Vue3Prism);
app.mount("#app");
moment.tz.setDefault("America/Mexico_City");
