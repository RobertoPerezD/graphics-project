<template>
  <div class="card mb-25 border-0 rounded-0 bg-white customer-satisfaction-box">
    <div class="card-body p-15 p-sm-20 p-sm-25 p-lg-30 letter-spacing">
      <div class="mb-15 mb-md-25 d-flex align-items-center justify-content-between">
        <h6 class="card-title fw-bold mb-0">Ciudades con más compras</h6>
      </div>
      <div class="chart">
        <apexchart type="pie" height="430" id="customerSatisfactionChart" v-if="customer"
          :options="customerSatisfactionChart" :series="customer"></apexchart>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";

export default defineComponent({
  name: "CustomerCity",
  props: {
    arrayData: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },
  setup: (props) => {
    const customer = ref();
    const customerSatisfactionChart = ref();

    const getPaymentMethods = async () => {
      try {
        const orders = Object.values(props.arrayData.orders);

        const mPay = orders.reduce((acc: Record<string, number>, item: any) => {
          const type = item.customer_city;
          if (type)
            acc[type] = (acc[type] || 0) + 1;
          return acc;
        }, {});

        const sortedCities = Object.entries(mPay)
          .sort((a, b) => b[1] - a[1]) // Orden descendente por cantidad
          .slice(0, 5);

        const topCities = Object.fromEntries(sortedCities);

        customer.value = Object.values(topCities)
        customerSatisfactionChart.value = {
          chart: {
            height: 430,
            type: "polarArea",
          },
          labels: Object.keys(topCities),
          dataLabels: {
            enabled: true,
            formatter: function (val, opts) {
              return val.toFixed(1) + "%"
            },
            textAnchor: 'middle',
            distributed: false,
            offsetX: 0,
            offsetY: 0,
            style: {
              fontSize: '14px',
              fontFamily: 'Helvetica, Arial, sans-serif',
              fontWeight: 'bold',
              colors: undefined
            },
            dropShadow: {
              enabled: false,
              top: 1,
              left: 1,
              blur: 1,
              color: '#000',
              opacity: 0.45
            }
          },
          stroke: {
            width: 0,
          },
          legend: {
            show: true,
            fontWeight: 500,
            fontSize: "14px",
            fontFamily: "Red Hat Display, sans-serif",
            labels: {
              colors: "#8E8DA1",
            },
            markers: {
              offsetX: -4,
              height: 10,
              width: 10,
            },
            itemMargin: {
              horizontal: 10,
              vertical: 5,
            },
          },
          tooltip: {
            style: {
              fontSize: "14px",
              fontFamily: "Red Hat Display, sans-serif",
            },
          },
        }
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    };

    onMounted(async () => {
      await getPaymentMethods();
    });

    return {
      customer,
      customerSatisfactionChart
    };
  },
});
</script>