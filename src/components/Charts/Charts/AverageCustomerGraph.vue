<template>
  <div class="card mb-25 border-0 rounded-0 bg-white">
    <div class="card-body p-15 p-sm-20 p-sm-25 p-lg-30 letter-spacing">
      <div
        class="mb-lg-15 d-sm-flex align-items-center justify-content-between"
      >
        <h6 class="card-title fw-bold mb-0">
          Calificación promedio de los productos comprados
        </h6>
      </div>
      <div id="averageProductRatingsChart" class="chart">
        <apexchart
          type="bar"
          :options="averageProductRatingsChartOptions"
          :series="[
            {
              name: 'Calificación Promedio',
              data: top5Ratings.map((product) => product.averageRating),
            },
          ]"
        ></apexchart>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";

export default defineComponent({
  name: "AverageProductRatingsChart",
  props: {
    arrayData: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },
  setup: (props) => {
    interface ProductRating {
      productName: string;
      averageRating: number;
    }
    const top5Ratings = ref<ProductRating[]>([]);

    const averageProductRatingsChartOptions = {
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

    const getAverageProductRatings = async (): Promise<void> => {
      try {
        const orders = Object.values(props.arrayData);
        const allOrders = orders[0];
        const allProducts = orders[1];

        const productMap = {};
        allProducts.forEach((product) => {
          productMap[product.objectID] = product.product_name;
        });

        const productRatings: {
          [key: string]: { total: number; count: number };
        } = {};

        allOrders.forEach((order) => {
          const productId = order.product_id;
          const rating = parseFloat(order.rating);

          if (!isNaN(rating)) {
            if (productId.trim() !== "") {
              if (
                Object.prototype.hasOwnProperty.call(productRatings, productId)
              ) {
                productRatings[productId].total += rating;
                productRatings[productId].count++;
              } else {
                productRatings[productId] = { total: rating, count: 1 };
              }
            }
          }
        });

        const averageRatings: ProductRating[] = Object.keys(productRatings).map(
          (productId) => ({
            productName: productMap[productId] || "Nombre no encontrado",
            averageRating:
              productRatings[productId].total / productRatings[productId].count,
          })
        );

        averageRatings.sort((a, b) => b.averageRating - a.averageRating);

        const top5RatingsData = averageRatings.slice(0, 5);

        top5Ratings.value = top5RatingsData;
        averageProductRatingsChartOptions.xaxis.categories =
          top5RatingsData.map((product) => product.productName);
      } catch (error) {
        console.error("Error al obtener las calificaciones promedio:", error);
      }
    };

    onMounted(async () => {
      await getAverageProductRatings();
    });

    return {
      top5Ratings,
      averageProductRatingsChartOptions,
    };
  },
});
</script>