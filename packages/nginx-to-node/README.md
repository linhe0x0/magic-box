# Configure Nginx as a web server and reverse proxy for Nodejs application

## Getting started

1.  Use curl or wget to download this file into the nginx configuration directory.

```bash
curl -fsSL https://raw.githubusercontent.com/sqrthree/magic-box/master/packages/nginx-to-node/app.conf -o app.conf && echo "\033[32m[✔]\033[0m Done."
```

```bash
wget -q --show-progress https://raw.githubusercontent.com/sqrthree/magic-box/master/packages/nginx-to-node/app.conf -O app.conf && echo "\033[32m[✔]\033[0m Done."
```

2.  Adjust with your own configuration like `server_name`, `root`. (Maybe you also need to adjust the port and log dir.)

```shell
sed -i '' 's/APPNAME/YOUR_REAL_APP_NAME/g' ./app.conf
sed -i '' 's/APP_DOMAIN/YOUR_REAL_APP_DOMAIN/g' ./app.conf
```

3.  Note that if you are using HTTP, the listen directive should be set to port 80 instead of 443.
