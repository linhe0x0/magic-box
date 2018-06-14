const path = require('path')
const glob = require('glob')

const config = require('../config')

const entryPath = path.resolve(__dirname, '../src/scripts/pages/**/*.js')

const entries = {}

glob.sync(entryPath).forEach(function(filePath) {
  const { name } = path.parse(filePath)

  entries[name] = filePath
})

module.exports = {
  mode: process.env.WEBPACK_SERVE ? 'development' : 'production',
  entry: entries,
  output: {
    publicPath:
      process.env.NODE_ENV === 'production'
        ? config.build.assetsPublicPath
        : config.dev.assetsPublicPath,
    filename: 'scripts/[name].js',
    path: config.build.assetsRoot,
  },
}
