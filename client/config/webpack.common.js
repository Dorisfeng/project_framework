const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
module.exports = {
  entry: {
    index: "./src/index.js",
    framework: ["react", "react-dom", "react-router-dom", "mobx", "mobx-react"]
  },
  output: {
    filename: "js/bundle.js",
    path: path.resolve(__dirname, "../dist")
  },
  plugins: [
    //根据html模板生成index.html
    new HtmlWebpackPlugin({
      template: "public/index.html",
      inject: true,
      hash: false,
      favicon: "./public/favicon.ico",
      minify: {
        // 压缩HTML文件
        removeComments: true, // 移除HTML中的注释
        collapseWhitespace: true, // 删除空白符与换行符
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      },
      hash: true
    }),
    new ProgressBarPlugin({
      format: "  build [:bar] :percent (:elapsed seconds)",
      clear: false,
      width: 60
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: "babel-loader",
        exclude: /node_module/
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: {
          loader: "url-loader",
          options: {
            name: "[name].[ext]",
            outputPath: "images/",
            limit: 1024 * 200
          }
        }
      },
      {
        test: /\.(eot|ttf|svg|woff|woff2)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name]_[hash].[ext]",
            outputPath: "font/"
          }
        }
      }
    ]
  }
};
