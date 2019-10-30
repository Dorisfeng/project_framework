const merge = require("webpack-merge");
const common = require("./webpack.common");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = merge(common, {
  devtool: "source-map",
  mode: "production",
  output: {
    filename: "js/[name].[hash:8].bundle.js"
  },

  plugins: [
    //打包前清理dist文件
    new CleanWebpackPlugin(),
    //独立打包css
    new MiniCssExtractPlugin({
      filename: "css/[name].[hash].css",
      chunkFilename: "css/[id].[hash].css"
    })
  ],

  optimization: {
    minimizer: [
      //压缩css
      new OptimizeCssAssetsPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessor: require("cssnano"),
        cssProcessorPluginOptions: {
          preset: ["default", { discardComments: { removeAll: true } }]
        },
        canPrint: true
      }),
      //压缩js
      new TerserPlugin({
        terserOptions: {
          compress: {
            // drop_console: true //不打包console.log
          }
        }
      })
    ],
    //分隔代码块
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        framework: {
          //自定义缓存组
          test: "framework",
          name: "framework",
          enforce: true
        },
        vendors: {
          priority: -10,
          test: /node-modules/,
          name: "vendor",
          enforce: true
        }
      }
    }
  },

  //性能
  performance: {
    hints: false //关闭性能提示
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: true
            }
          },
          "postcss-loader"
        ]
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: true
            }
          },
          "postcss-loader",
          "less-loader"
        ]
      },
      {
        test: /\.(sass|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: true
            }
          },
          "postcss-loader",
          "sass-loader"
        ]
      }
    ]
  }
});
