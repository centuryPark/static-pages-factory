const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  devtool: 'eval-source-map',
  entry: {
    index: './src/login/index.js',
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
              publicPath: '../img',
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
      title: 'Code Splitting',
      template: './src/login/index.html',
      // inlineSource: '.(js|css)$',
    }),
    // new HtmlWebpackInlineSourcePlugin(),
  ],
  devServer: {
    contentBase: '../dist',
    // compress: true, // 一切服务都启用gzip 压缩
    port: 9009,
    host: '0.0.0.0',
    overlay: true,
    historyApiFallback: {
      disableDotRule: true,
    }
  },
};