const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const proxy = require('http-proxy-middleware')
const convert = require('koa-connect')

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
          'sass-loader',
        ],
      },
    ],
  },

  // https://github.com/webpack-contrib/webpack-serve#serveoptions
  serve: {
    dev: {
      publicPath: config.dev.assetsPublicPath,
      logLevel: 'silent',
    },
    host,
    port,
    hot: {
      logLevel: 'silent',
    },
    logLevel: 'silent',
    open: config.dev.autoOpenBrowser && {
      path: config.dev.assetsPublicPath + 'index.js',
    },
    add: (app, middleware, options) => {
      Object.keys(config.dev.proxyTable).forEach(prefixURL => {
        app.use(convert(proxy(prefixURL, config.dev.proxyTable[prefixURL])))
      })
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
