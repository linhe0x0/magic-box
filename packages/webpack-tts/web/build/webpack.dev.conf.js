const merge = require('webpack-merge')
const WebpackBar = require('webpackbar')

const config = require('../config')
const baseWebpackConfig = require('./webpack.base.conf')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

module.exports = merge(baseWebpackConfig, {
  mode: 'development',
  devtool: config.dev.devtool,
  stats: 'none',
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              sourceMap: config.dev.cssSourceMap,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
              sourceMap: config.prod.cssSourceMap,
            },
          },
        ],
      },
    ],
  },
  plugins: [new WebpackBar(), new FriendlyErrorsPlugin()],
})
