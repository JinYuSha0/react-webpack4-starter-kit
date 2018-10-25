'use strict'

const merge = require('webpack-merge')
const utils = require('./utils')
const baseWebpackConfig = require('./webpack.base')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = merge(baseWebpackConfig, {
  mode: 'production',
  module: {
    rules: [
      ...utils.styleLoaders({
        px2rem: true,
        extract: true,
        sourceMap: false,
        usePostCSS: true,
      }),
    ],
  },
  plugins: [
    new ExtractTextPlugin('main.[hash:8].css'),
    new OptimizeCSSPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: ['default', { discardComments: { removeAll: true } }],
      },
      canPrint: true,
    }),
  ],
})
