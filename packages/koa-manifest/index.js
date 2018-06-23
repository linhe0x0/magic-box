const path = require('path')

/**
 * Dynamically load assets into your views from your `manifest.json` manifest revision file.
 * And the helper function `assets(str)` will be bound to ctx.state when this middleware is included in your app.
 *
 * @param  {Object} options argument for setup.
 * @return {Function} koa middleware
 *
 * @options
 *    manifest: path to a valid manifest.json file.
 *    prepend: string to prepend before file paths rendered after lookup.
 *    proxy: A proxy url-string to prepend before file paths rendered. If it given, will ignore `prepend` and `manifest`.
 *
 * @example
 *    manifest: path.resolve(__dirname, 'web/dist/manifest.json'),
 *    prepend: '',
 *    proxy: process.env.NODE_ENV === 'development' && 'http://localhost:8080/static/',
 * }
 */
module.exports = function(options) {
  if (typeof options !== 'object') {
    throw new TypeError('`options` argument required.')
  }

  if (typeof options.manifest !== 'string') {
    throw new TypeError('`manifest` property is required')
  }

  if (
    typeof options.prepend !== 'undefined' &&
    typeof options.prepend !== 'string'
  ) {
    throw new TypeError('`prepend` property defined, but it was not a string')
  }

  if (!path.isAbsolute(options.manifest)) {
    const cmd = process.cwd()

    console.warn(
      'Warning:',
      `'${
        options.manifest
      }' is not an absolute path, we will try to resolve it from '${cmd}'`
    )
    options.manifest = path.resolve(cmd, options.manifest)
  }

  return function(ctx, next) {
    ctx.state.assets = str => {
      let filePath = str

      if (options.proxy) {
        return options.prepend
          ? options.proxy + options.prepend + str
          : options.proxy + str
      }

      try {
        const manifest = require(options.manifest)

        if (!manifest[str]) {
          throw new Error(`Cannot find file '${str}'`)
        }

        filePath = manifest[str]
      } catch (err) {
        console.error(err)
      }

      return options.prepend ? options.prepend + filePath : filePath
    }

    return next()
  }
}
