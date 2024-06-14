<template>
  <div class="card mb-25 border-0 rounded-0 bg-white">
    <div class="card-body p-15 p-sm-20 p-sm-25 p-lg-30 letter-spacing">
      <div class="mb-lg-15 d-sm-flex align-items-center justify-content-between">
        <h6 class="card-title fw-bold mb-0">
          Cliente que ha realizado más compras
        </h6>
      </div>
      <div id="topClientsChart" class="chart">
        <apexchart type="bar" :options="topClientsChartOptions" :series="[
          {
            name: 'Cantidad de compras',
            data: top5Clients.map((client) => client.totalPurchase),
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
      totalPurchase: number;
    }

    const top5Clients = ref<TopClient[]>([]);

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
          horizontal: true, // Hacer que el gráfico sea horizontal
          columnWidth: "50%", // Ajustar el ancho de la barra
          endingShape: "rounded",
        },
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#6560F0"],
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

        const clientPurchaseMap = {};

        allOrders.forEach((order) => {
          const clientId = order.customer_id;
          const totalPurchase = parseFloat(order.payment.replace(",", "."));

          if (clientId.trim() !== "" && !isNaN(totalPurchase)) {
            if (
              Object.prototype.hasOwnProperty.call(clientPurchaseMap, clientId)
            ) {
              clientPurchaseMap[clientId] += totalPurchase;
            } else {
              clientPurchaseMap[clientId] = totalPurchase;
            }
          }
        });

        const clients = Object.keys(clientPurchaseMap).map((clientId) => ({
          clientId: clientId,
          totalPurchase: clientPurchaseMap[clientId],
        }));

        clients.sort((a, b) => b.totalPurchase - a.totalPurchase);

        const top5ClientsData = clients.slice(0, 5);

        top5Clients.value = top5ClientsData;
        topClientsChartOptions.xaxis.categories = top5ClientsData.map(
          (client) => client.clientId
        );
      } catch (error) {
        console.error("Error al obtener los clientes:", error);
      }
    };

    onMounted(async () => {
      await getTopClients();
    });

    return {
      top5Clients,
      topClientsChartOptions,
    };
  },
});
</script>
