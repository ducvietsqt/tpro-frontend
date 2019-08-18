// const VuetifyLoaderPlugin = require("vuetify-loader/lib/plugin");

module.exports = {
  css: {
    sourceMap: process.env.NODE_ENV !== "production",
    loaderOptions: {
      sass: {
        outputStyle: "compressed"
      }
    }
  },
  configureWebpack: {
    devtool: "source-map",
    devServer: {
      disableHostCheck: true
    },
    // plugins: [new VuetifyLoaderPlugin()]
  }
};
