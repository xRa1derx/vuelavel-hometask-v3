const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "~@/sass/app.scss";`
      },
    }
  },
  devServer: {
    proxy: "http://localhost:8000/",
  },
  outputDir: "../public",
  indexPath:
    process.env.NODE_ENV === "production"
      ? "../resources/views/index.blade.php"
      : "index.html",
});
