#!/bin/bash

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

curl -sL https://raw.githubusercontent.com/sqrthree/magic-box/master/packages/prettier-eslint/.prettierrc -o .prettierrc
curl -sL https://raw.githubusercontent.com/sqrthree/magic-box/master/packages/prettier-eslint/.eslintrc -o .eslintrc

echo "\033[1;34m==>\033[0m Install dependencies"

if $shouldUseYarn; then
  yarn add --dev eslint eslint-config-airbnb-base eslint-config-prettier eslint-plugin-import eslint-plugin-prettier prettier
else
  npm install --dev eslint eslint-config-airbnb-base eslint-config-prettier eslint-plugin-import eslint-plugin-prettier prettier
fi

echo "\033[1;34m==>\033[0m Additionally, you need to add the following script to package.json:"
echo "
  \"lint\": \"eslint ./\",
  \"lint-with-fix\": \"eslint --fix ./\"
"

echo "\033[32m[✔]\033[0m Done"
