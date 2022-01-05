#!/bin/sh
set -ex

docker run -d -p 80:80 -p 443:443 \
	-v "$PWD:/srv" \
	-v "$PWD/Caddyfile:/etc/caddy/Caddyfile" \
	caddy caddy run
