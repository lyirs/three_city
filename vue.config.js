/*
 * @Author:
 * @Date: 2022-11-07 16:01:35
 * @LastEditTime: 2022-11-07 17:26:07
 * @Description:
 */
const path = require("path");
const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: (config) => {
    config.module.rules.push({
      test: /\.glsl$/,
      use: [
        {
          loader: "webpack-glsl-loader",
        },
      ],
    });
    // config.resolve.alias
    //   .set("@", resolve("src"))
    //   .set("assets", resolve("src/assets"))
    //   .set("utils", resolve("src/utils"));
  },
});
