'use strict'

const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const INFO = require('../package')

function resolve (dir) {
  return path.join(__dirname, '../', dir)
}

const createLintingRule = () => ({
  test: /\.jsx?$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('src'), resolve('test')],
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: true,
  },
})

module.exports = {
  entry: [
    resolve('src'),
  ],
  output: {
    libraryExport: 'default',
    filename: '[name].[hash:8].js',
    path: resolve('dist'),
  },
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      '@': resolve('src'),
      '@util': resolve('src/util'),
      '@views': resolve('src/views'),
      '@sagas': resolve('src/saga/sagas'),
      '@assets': resolve('src/assets'),
      '@reducer': resolve('src/redux/reducer'),
      '@service': resolve('src/service'),
      '@components': resolve('src/components'),
    },
  },
  module: {
    rules: [
      createLintingRule(),
      {
        test: /\.jsx?$/,
        loader: 'babel-loader?cacheDirectory=true',
        exclude: /node_modules/,
        include: resolve('src'),
      },
      {
        test: /\.(png|jpg|gif|svg|eot)$/,
        use: { loader: 'url-loader', options: { limit: 10000 } },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin([resolve('dist')], {root: process.cwd()}),
    new HtmlWebpackPlugin({
      title: INFO.name,
      filename: 'index.html',
      template: resolve('template.ejs'),
    }),
  ],
  performance: {
    hints: false,
  },
}
