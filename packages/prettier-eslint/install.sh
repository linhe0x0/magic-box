#!/bin/bash
shouldUseYarn=false

if [ -f "yarn.lock" ]; then
  shouldUseYarn=true
else
  shouldUseYarn=false
fi

echo "\033[1;34m==>\033[0m Download configurations"

curl -sL https://raw.githubusercontent.com/sqrthree/magic-box/master/packages/prettier-eslint/.prettierrc -o .prettierrc
curl -sL https://raw.githubusercontent.com/sqrthree/magic-box/master/packages/prettier-eslint/.eslintrc -o .eslintrc

echo "\033[1;34m==>\033[0m Install dependencies"

if $shouldUseYarn; then
  yarn add --dev eslint prettier @sqrtthree/eslint-config-base
else
  npm install --save-dev eslint prettier @sqrtthree/eslint-config-base
fi

echo "\033[1;34m==>\033[0m Additionally, you need to add the following script to package.json:"
echo "
  \"lint\": \"eslint ./\",
  \"lint-with-fix\": \"eslint --fix ./\"
"

echo "\033[32m[✔]\033[0m Done"
