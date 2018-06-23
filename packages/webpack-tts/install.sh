tempDir=.webpack-tts
defaultAppName=web
dependencies="\
  babel-core \
  babel-loader \
  babel-preset-env \
  babel-preset-stage-3 \
  copy-webpack-plugin \
  css-loader \
  file-loader \
  friendly-errors-webpack-plugin \
  glob \
  http-proxy-middleware \
  koa-connect \
  mini-css-extract-plugin \
  node-sass-chokidar \
  optimize-css-assets-webpack-plugin \
  postcss-loader \
  sass-loader \
  style-loader \
  uglifyjs-webpack-plugin \
  url-loader \
  webpack \
  webpack-command \
  webpack-manifest-plugin \
  webpack-merge \
  webpack-serve
"

hasCommand() {
  if command -v $1 > /dev/null 2>&1; then
    return 0
  else
    return 1
  fi
}

shouldUseYarn=true

if hasCommand yarn; then
  shouldUseYarn=true
else
  shouldUseYarn=false
fi

echo "\033[1;34m==>\033[0m Download configurations"

git clone --depth=1 https://github.com/sqrthree/magic-box.git $tempDir

echo "\033[1;34m==>\033[0m Create your app"

read -p "Input your app name($defaultAppName): " app

if test -z "$app"; then
  app=$defaultAppName
fi

if test -e "$app"; then
  echo "\033[31m[✗]\033[0m Target directory $app already exists."
  exit 1
fi

cp -r "$tempDir/packages/webpack-tts/web" "$app"

rm -rf "$tempDir"

echo "\033[1;34m==>\033[0m Install dependencies"

if $shouldUseYarn; then
  yarn add --dev "$dependencies"
else
  npm install --dev "$dependencies"
fi

echo "\033[1;34m==>\033[0m Additionally, you need to add the following script to package.json:"

echo "
  \"web:dev\": \"webpack-serve --log-level silent --cache --config web/build/webpack.dev.conf.js\",
  \"web:build\": \"webpack --run-prod --config web/build/webpack.prod.conf.js\"
"

echo "\033[32m[✔]\033[0m Done"
