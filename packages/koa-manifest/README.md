# koa-manifest

[![](https://img.shields.io/badge/version-v0.1.0-brightgreen.svg)]()

> Dynamically load assets into your views from your `manifest.json` manifest revision file.

## Getting Started

```bash
mkdir -p middlewares/koa-manifest

curl -sL https://raw.githubusercontent.com/sqrthree/magic-box/master/packages/koa-manifest/index.js -o middlewares/koa-manifest/index.js && echo "\033[32m[✔]\033[0m Done."
```

## Usage

```js
// app.js
const koaManifestMiddleware = require('./middlewares/koa-manifest')

const app = new Koa()

// ... some codes.

app.use(
  koaManifestMiddleware({
    manifest: path.resolve(__dirname, 'web/dist/manifest.json'),
    prepend: '',
    proxy:
      process.env.NODE_ENV === 'development' && 'http://localhost:8080/static/',
  })
)
```