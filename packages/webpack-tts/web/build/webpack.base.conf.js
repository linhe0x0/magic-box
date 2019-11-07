const path = require('path')
const _ = require('lodash')
const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const consola = require('consola')

const config = require('../config')

const isProdEnv = process.env.NODE_ENV === 'production'

const srcDir = path.resolve(__dirname, '../src')
const entryPath = path.resolve(srcDir, './**/index.js')
const outputDir = isProdEnv ? config.prod.outputDir : config.dev.outputDir
const viewExtension = isProdEnv
  ? config.prod.viewExtension
  : config.dev.viewExtension
const assetsPublicPath = isProdEnv
  ? config.prod.assetsPublicPath
  : config.dev.assetsPublicPath

const assetsPath = function(target) {
  const assetsSubDirectory = isProdEnv
    ? config.prod.assetsSubDirectory
    : config.dev.assetsSubDirectory

  return path.posix.join(assetsSubDirectory, target)
}

const entries = {}
const templates = {}

glob.sync(entryPath).forEach(function(filePath) {
  const { dir } = path.parse(filePath)
  const name = path.relative(srcDir, dir)

  entries[name] = filePath
  templates[name] = path.resolve(dir, `./index.${viewExtension}`)
})

const maxLength = _.max(_.map(_.keys(templates), item => item.length))

consola.info('Template List that will be outputed to views directory:')
consola.info('')

_.map(templates, (value, key) => {
  consola.info(
    `  ${_.padEnd(key, maxLength)} <== ${path.relative(srcDir, value)}`
  )
})

consola.info('')

const webpackConfig = {
  mode: process.env.NODE_ENV || 'production',
  entry: entries,
  output: {
    publicPath: assetsPublicPath || '/mobile/',
    filename: 'scripts/[name].[contenthash:6].js',
    chunkFilename: 'scripts/[id].[contenthash:6].js',
    path: outputDir,
  },
  resolve: {
    extensions: ['.js'],
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: assetsPath('images/[name].[hash:7].[ext]'),
        },
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: assetsPath('media/[name].[hash:7].[ext]'),
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: assetsPath('fonts/[name].[hash:7].[ext]'),
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin(
      [
        {
          from: path.resolve(srcDir, '../public'),
          to: outputDir,
        },
      ],
      {
        copyUnmodified: true,
      }
    ),
  ],
}

_.forEach(templates, (value, key) => {
  webpackConfig.plugins.push(
    new HtmlWebpackPlugin({
      template: value,
      filename: `views/${key}.${viewExtension}`,
      chunks: [key],
    })
  )
})

module.exports = webpackConfig
