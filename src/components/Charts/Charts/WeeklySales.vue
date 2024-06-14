<template>
  <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing bg-white">
    <div
      class="mb-15 mb-sm-0 d-sm-flex align-items-center justify-content-between"
    >
      <div class="title">
        <span class="fw-medium text-muted fs-13 d-block mb-5 text-uppercase">
          Ventas a lo largo del tiempo
        </span>
      </div>
    </div>
    <div class="chart">
      <apexchart
        type="line"
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
    interface ProductRating {
      category: string;
      quantity: number;
    }

    const topProducts = ref<ProductRating[]>([]);

    const weeklySalesChart = {
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

    const timeSeriesData = ref<any[]>([]);
    const timeSeriesChartOptions = ref<any>({
      chart: {
        type: "line",
        height: 374,
        toolbar: {
          show: false,
        },
      },
      xaxis: {
        type: "datetime",
      },
      yaxis: {
        title: {
          text: "Cantidad de compras",
        },
      },
      tooltip: {
        x: {
          format: "dd/MM/yyyy HH:mm:ss",
        },
      },
    });

    const createTimeSeriesData = () => {
      try {
        const orders = Object.values(props.arrayData);
        const allOrders = orders[0];

        const seriesData = allOrders.slice(0, 10).map((order: any) => {
          const timestamp = new Date(order.timestamp).getTime();
          const quantity = parseInt(order.quantity);

          if (isNaN(timestamp) || isNaN(quantity)) {
            console.error(
              `Error de conversión: timestamp = ${order.timestamp}, quantity = ${order.quantity}`
            );
            return null;
          }

          return [timestamp, quantity];
        });


        timeSeriesData.value = [
          {
            name: "Cantidad de compras",
            data: seriesData.filter((dataPoint) => dataPoint !== null),
          },
        ];
      } catch (error) {
        console.error("Error al crear los datos de la serie de tiempo:", error);
      }
    };

    onMounted(() => {
      createTimeSeriesData();
    });

    return {
      topProducts,
      weeklySalesChart,
      timeSeriesData,
      timeSeriesChartOptions,
    };
  },
});
</script>
