const webpack = require("webpack");

module.exports = {
  productionSourceMap: false,
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: true,
      }),
    ],
    performance: {
      hints: process.env.NODE_ENV === "production" ? "warning" : false,
    },
  },
};
