'use strict'

const webpack = require('webpack')
const path = require('path')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base')
const utils = require('./utils')

module.exports = merge(baseWebpackConfig, {
  mode: 'development',
  watch: true,
  devServer: {
    hot: true,
    open: true,
    inline: true,
    compress: true,
    historyApiFallback: true,
    port: 8080,
    host: 'localhost',
    contentBase: path.resolve(__dirname, '../dist'),
    overlay: {
      warnings: true,
      errors: true,
    },
  },
  module: {
    rules: [
      ...utils.styleLoaders({
        px2rem: true,
        extract: false,
        sourceMap: false,
        usePostCSS: true,
      }),
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
})
