const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const originPath = require('./config');

module.exports = {
  mode: "production",
  entry: {
    index: `${originPath}/index.js`,
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '../dist')
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'html-withimg-loader'
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        // url-loader内置了file-loader,不同的是，当文件小于1024字节时，会转换为base64编码
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: '8192',
              outputPath: 'img/',
              publicPath: './img',
            },
          },
        ],
      },
      {
        test: /\.css/,
        // loader处理顺序从下往上
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // 指定一个 publicPath
              // 默认使用 webpackOptions.output中的publicPath
              // publicPath: '../css/'
            },
          },
          {
            loader: 'css-loader', // 将 CSS 转化成 CommonJS 模块
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              config: {
                path: path.resolve(__dirname, '../postcss.config.js'), // 项目根目录创建此文件
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
    new HTMLWebpackPlugin({
      template: `${originPath}/index.html`,
      inlineSource: '.(js|css)$',
    }),
    new HtmlWebpackInlineSourcePlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
  ]
};
