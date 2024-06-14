<template>
  <div class="card mb-25 border-0 rounded-0 bg-white">
    <div class="card-body p-15 p-sm-20 p-sm-25 p-lg-30 letter-spacing">
      <div class="mb-md-10 d-flex align-items-center justify-content-between">
        <h5 class="card-title fw-bold mb-0">Productos más vendido</h5>
        <div class="dropdown">
          <button
            class="dropdown-toggle card-dot-btn lh-1 position-relative top-4 bg-transparent border-0 shadow-none p-0 transition"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i class="flaticon-dots"></i>
          </button>
          <ul class="dropdown-menu">
            <li>
              <a
                class="dropdown-item d-flex align-items-center"
                href="javascript:void(0);"
              >
                <i class="flaticon-view lh-1 me-8 position-relative top-1"></i>
                View
              </a>
            </li>
            <li>
              <a
                class="dropdown-item d-flex align-items-center"
                href="javascript:void(0);"
              >
                <i class="flaticon-pen lh-1 me-8 position-relative top-1"></i>
                Edit
              </a>
            </li>
            <li>
              <a
                class="dropdown-item d-flex align-items-center"
                href="javascript:void(0);"
              >
                <i
                  class="flaticon-delete lh-1 me-8 position-relative top-1"
                ></i>
                Delete
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div id="topProductsChart" class="chart">
        <apexchart
          type="bar"
          :options="topProductsChartOptions"
          :series="[
            {
              name: 'Cantidad de compras',
              data: top10Products.map((product) => product.quantity),
            },
          ]"
        ></apexchart>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import VueApexCharts from "vue3-apexcharts";

interface Product {
  quantity: number;
  productName: string;
}

export default defineComponent({
  name: "BestSellingProductChart",
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
    const top10Products = ref<Product[]>([]);

    const topProductsChartOptions = {
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
          horizontal: true, // Make the chart horizontal
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

    const getTopProducts = async (): Promise<void> => {
      try {
        const orders = Object.values(props.arrayData);
        const allOrders = orders[0];
        const allProducts = orders[1];

        const productMap: { [key: string]: string } = {};
        allProducts.forEach((product) => {
          productMap[product.objectID] = product.product_name;
        });

        const productQuantityMap: { [key: string]: number } = {};
        allOrders.forEach((order) => {
          const productId = order.product_id;
          const quantity = parseInt(order.quantity);
          if (productId.trim() !== "") {
            if (Object.prototype.hasOwnProperty.call(productQuantityMap, productId)) {
              productQuantityMap[productId] += quantity;
            } else {
              productQuantityMap[productId] = quantity;
            }
          }
        });

        const products: Product[] = Object.keys(productQuantityMap).map((productId) => ({
          quantity: productQuantityMap[productId],
          productName: productMap[productId] || "Nombre no encontrado",
        }));

        products.sort((a, b) => b.quantity - a.quantity);
        const top10ProductsData = products.slice(0, 10);

        top10Products.value = top10ProductsData;
        topProductsChartOptions.xaxis.categories = top10ProductsData.map((product) => product.productName);
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    };

    onMounted(async () => {
      await getTopProducts();
    });

    return {
      top10Products,
      topProductsChartOptions,
    };
  },
});
</script>