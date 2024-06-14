<template>
  <VueLoading :active="isLoading" :is-full-page="true" loader="bars" :text="'Cargando...'" />
  <div class="row">
    <div class="col-lg-6">
      <BestSellingProduct v-if="res" :arrayData="res" />
    </div>
    <div class="col-lg-6">
      <WebsiteVisitors v-if="res" :arrayData="res" />
    </div>

    <div class="col-lg-6">
      <TopClient v-if="res" :arrayData="res" />
    </div>

    <div class="col-lg-6">
      <ClientGraph v-if="res" :arrayData="res" />
    </div>

    <div class="col-lg-6">
      <AverageCustomerGraph v-if="res" :arrayData="res" />
    </div>

    <div class="col-lg-6">
      <CustomerSatisfaction v-if="res" :arrayData="res" />
    </div>

    <div class="col-lg-6">
      <CustomerCity v-if="res" :arrayData="res" />
    </div>

    <div class="col-lg-6">
      <CustomerWeight v-if="res" :arrayData="res" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import BestSellingProduct from "../../components/Charts/Charts/BestSellingProduct.vue";
import CustomerSatisfaction from "../../components/Charts/Charts/CustomerSatisfaction.vue";
import CustomerCity from "../../components/Charts/Charts/CustomerCity.vue";
import WebsiteVisitors from "../../components/Charts/Charts/WebsiteVisitors.vue";
import ClientGraph from "../../components/Charts/Charts/ClientGraph.vue";
import AverageCustomerGraph from "../../components/Charts/Charts/AverageCustomerGraph.vue";
import TopClient from "../../components/Charts/Charts/TopClient.vue";
import DataInformation from "@/controller/DataInformation";
import CustomerWeight from "../../components/Charts/Charts/CustomerWeight.vue";

export default defineComponent({
  name: "ChartsPage",
  components: {
    BestSellingProduct,
    CustomerSatisfaction,
    WebsiteVisitors,
    ClientGraph,
    AverageCustomerGraph,
    TopClient,
    CustomerCity,
    CustomerWeight
  },
  setup: () => {
    const res = ref<any>(null);
    const isLoading = ref(false);

    onMounted(async () => {
      try {
        isLoading.value = true;
        res.value = await new DataInformation().convertInformationJSON();
      } catch (error) {
        console.log("error")
      } finally {
        isLoading.value = false;
      }

    });

    return { res, isLoading };
  },
});
</script>
