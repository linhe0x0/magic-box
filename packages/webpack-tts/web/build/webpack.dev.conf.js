const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

const baseWebpackConfig = require('./webpack.base.conf')
const config = require('../config')

const host = process.env.HOST || config.dev.host
const port = Number(process.env.PORT) || config.dev.port

module.exports = merge(baseWebpackConfig, {
  devtool: config.dev.devtool,

  module: {
    rules: [
      {
        test: /\.scss$/,
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
            },
          },
        ],
      },
    ],
  },

  // https://webpack.js.org/configuration/dev-server/
  devServer: {
    host,
    port,
    hot: true,
    quiet: true,
    open: config.dev.autoOpenBrowser,
    openPage: config.dev.assetsPublicPath.substring(1) + 'index.js',
    proxy: config.dev.proxyTable,
    overlay: {
      warnings: false,
      errors: config.dev.errorOverlay,
    },
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*'],
      },
    ]),
    new FriendlyErrorsPlugin({
      compilationSuccessInfo: {
        messages: [`Your application is running here: http://${host}:${port}`],
      },
    }),
  ],
})
