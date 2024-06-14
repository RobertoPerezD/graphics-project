<template>
  <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing bg-white">
    <div
      class="mb-15 mb-sm-0 d-sm-flex align-items-center justify-content-between"
    >
      <div class="title">
        <span class="fw-medium text-muted fs-13 d-block mb-5 text-uppercase">
          Tasa de devoluciones (cancelaciones) de producto
        </span>
      </div>
    </div>
    <div class="chart">
      <apexchart
        type="bar"
        height="374"
        id="weeklySalesChart"
        :options="timeSeriesChartOptions"
        :series="timeSeriesData"
      ></apexchart>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import VueApexCharts from "vue3-apexcharts";

export default defineComponent({
  name: "WebsiteVisitors",
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
    const timeSeriesData = ref<any[]>([]);
    const timeSeriesChartOptions = ref<any>({
      chart: {
        type: "bar",
        height: 374,
        stacked: true,
        toolbar: {
          show: false,
        },
      },
      xaxis: {
        categories: [] as string[],
        labels: {
          style: {
            fontFamily: "Red Hat Display, sans-serif",
            colors: "#9C9AB6",
            fontSize: "14px",
            fontWeight: 500,
          },
        },
      },
      yaxis: {
        title: {
          text: "Cantidad de compras",
        },
        labels: {
          style: {
            fontFamily: "Red Hat Display, sans-serif",
            colors: "#9C9AB6",
            fontSize: "14px",
            fontWeight: 500,
          },
        },
      },
    });

    const createDeliveredOrders = () => {
      try {
        const orders = Object.values(props.arrayData);
        const deliveredData: { [key: string]: number[] } = {};

        let count = 0; // Contador para los primeros 5 elementos

        orders[0].forEach((order: any) => {
          const status = order.order_status;
          if (status === "delivered") {
            if (count < 5) {
              // Solo recopila los primeros 5 elementos
              if (deliveredData[status]) {
                deliveredData[status].push(1);
              } else {
                deliveredData[status] = [1];
              }
              count++; // Incrementa el contador
            }
          }
        });

        const categories = Object.keys(deliveredData);
        const series = Object.values(deliveredData);

        timeSeriesData.value = series.map((data: number[]) => ({ data }));
        timeSeriesChartOptions.value.xaxis.categories = categories;
      } catch (error) {
        console.error(
          "Error al crear los datos del gráfico de entregas:",
          error
        );
      }
    };

    onMounted(() => {
      createDeliveredOrders();
    });

    return {
      timeSeriesData,
      timeSeriesChartOptions,
    };
  },
});
</script>
