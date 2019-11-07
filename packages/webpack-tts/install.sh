tempDir=.webpack-tts
defaultAppName=web
dependencies="\
  webpack \
  webpack-cli \
  webpack-merge \
  webpackbar \
  html-webpack-plugin \
  copy-webpack-plugin \
  clean-webpack-plugin \
  friendly-errors-webpack-plugin \
  sass \
  sass-loader \
  css-loader \
  style-loader \
  postcss-loader \
  autoprefixer \
  terser-webpack-plugin \
  url-loader \
  webpack-bundle-analyzer \
  mini-css-extract-plugin \
  optimize-css-assets-webpack-plugin \
  image-webpack-loader \
  glob
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
  \"web:dev\": \"cross-env NODE_ENV=development webpack --watch --config build/webpack.dev.conf.js\",
  \"web:build\": \"cross-env NODE_ENV=production webpack --config build/webpack.prod.conf.js\"
"

echo "\033[32m[✔]\033[0m Done"
