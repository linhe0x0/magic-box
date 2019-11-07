const path = require('path')

module.exports = {
  dev: {
    assetsPublicPath: '',
    assetsSubDirectory: '',
    outputDir: path.resolve(__dirname, '../dist'),
    viewExtension: 'ejs',
    devtool: 'source-map',
    cssSourceMap: true,
  },
  prod: {
    assetsPublicPath: '',
    assetsSubDirectory: '',
    outputDir: path.resolve(__dirname, '../dist'),
    viewExtension: 'ejs',
    productionSourceMap: false,
    devtool: '',
    bundleAnalyzerReport: false,
  },
}
