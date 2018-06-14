const webpack = require('webpack')
const merge = require('webpack-merge')

const baseWebpackConfig = require('./webpack.base.conf')
const config = require('../config')

module.exports = merge(baseWebpackConfig, {
  serve: {
    dev: {
      publicPath: config.dev.assetsPublicPath,
    },
  },
})
