const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')

const baseWebpackConfig = require('./webpack.base.conf')
const config = require('../config')

module.exports = merge(baseWebpackConfig, {
  devtool: config.build.productionSourceMap ? config.build.devtool : false,

  output: {
    filename: 'scripts/[name].[chunkhash].js',
    chunkFilename: 'scripts/[id].[chunkhash].js',
  },

  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              sourceMap: config.build.productionSourceMap,
            },
          },
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              outputStyle: 'compressed',
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles/[name].[contenthash].css',
      chunkFilename: 'styles/[id].[contenthash].css',
    }),

    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*'],
      },
    ]),

    // generate a manifest.json file in root output directory with a mapping of all source file names to their corresponding output file
    new ManifestPlugin(),
  ],
})
