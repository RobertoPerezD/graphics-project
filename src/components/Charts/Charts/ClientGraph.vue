<template>
  <div class="card mb-25 border-0 rounded-0 bg-white">
    <div class="card-body p-15 p-sm-20 p-sm-25 p-lg-30 letter-spacing">
      <div class="mb-lg-15 d-sm-flex align-items-center justify-content-between">
        <h6 class="card-title fw-bold mb-0">
          Cantidad total gastada por el cliente que más ha gastado
        </h6>
      </div>
      <div id="topClientsChart" class="chart">
        <apexchart type="bar" :options="topClientsChartOptions" :series="[
          {
            name: 'Total gastado',
            data: topClients.map((client) => client.totalSpent),
          },
        ]"></apexchart>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import VueApexCharts from "vue3-apexcharts";

export default defineComponent({
  name: "TopClientsChart",
  props: {
    arrayData: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },
  components: {
    apexchart: VueApexCharts,
  },
  setup: (props) => {
    interface TopClient {
      clientId: string;
      totalSpent: number;
    }

    const topClients = ref<TopClient[]>([]);

    const topClientsChartOptions = {
      chart: {
        type: "bar",
        height: 385,
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          borderRadius: 5,
          horizontal: false,
          columnWidth: "28%",
          endingShape: "rounded",
        },
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#FF4560"],
      stroke: {
        show: false,
      },
      xaxis: {
        categories: [] as string[],
        labels: {
          show: true,
          style: {
            fontFamily: "Red Hat Display, sans-serif",
            colors: "#9C9AB6",
            fontSize: "14px",
            fontWeight: 500,
          },
        },
      },
      yaxis: {
        show: true,
        tickAmount: 8,
        labels: {
          show: true,
          style: {
            fontFamily: "Red Hat Display, sans-serif",
            colors: ["#9C9AB6"],
            fontSize: "14px",
            fontWeight: 500,
          },
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        style: {
          fontSize: "14px",
          fontFamily: "Red Hat Display, sans-serif",
        },
      },
      grid: {
        show: true,
        strokeDashArray: 5,
        borderColor: "#d9e9ef",
      },
    };

    const getTopClients = async (): Promise<void> => {
      try {
        const orders = Object.values(props.arrayData);
        const allOrders = orders[0];

        const clientTotalSpent: { [key: string]: number } = {};

        allOrders.forEach((order) => {
          const clientId = order.customer_id;
          const payment = parseFloat(order.payment.replace(",", "."));
          const total = (clientTotalSpent[clientId] || 0) + payment;

          clientTotalSpent[clientId] = parseFloat(total.toFixed(2));
        });

        const topClientsIds = Object.keys(clientTotalSpent)
          .sort((a, b) => clientTotalSpent[b] - clientTotalSpent[a])
          .slice(0, 5);

        const topClientsData: TopClient[] = topClientsIds.map((clientId) => ({
          clientId: clientId,
          totalSpent: clientTotalSpent[clientId],
        }));

        topClients.value = topClientsData;
        topClientsChartOptions.xaxis.categories = topClientsData.map(
          (client) => client.clientId
        );
      } catch (error) {
        console.error("Error al obtener los clientes principales:", error);
      }
    };

    onMounted(async () => {
      await getTopClients();
    });

    return {
      topClients,
      topClientsChartOptions,
    };
  },
});
</script>
