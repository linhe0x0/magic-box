# Configure Nginx as a web server and reverse proxy for Nodejs application

## Getting started

1. Use curl or wget to download this file into the nginx configuration directory.

```bash
curl https://raw.githubusercontent.com/sqrthree/magic-box/master/packages/nginx-to-node/app.conf -o app.conf
```

```bash
wget https://raw.githubusercontent.com/sqrthree/magic-box/master/packages/nginx-to-node/app.conf -O app.conf
```

2. Adjust with your own configuration like `server_name`, `root`. (Maybe you also need to adjust the port and log dir.)
