#!/bin/sh -ex

#docker run -it --rm -v ${PWD}:/tmp validator/validator vnu --Werror --also-check-css --also-check-svg --verbose /tmp/index.html
#docker run -it --rm -v ${PWD}:/tmp linkchecker/linkchecker --verbose --check-extern /tmp/index.html
#docker run -it --rm -v ${PWD}:/tmp flungo/html-minify sh -c "mkdir /tmp/out && html-minifier --collapse-whitespace --remove-comments --remove-optional-tags --remove-redundant-attributes --remove-script-type-attributes --remove-tag-whitespace --use-short-doctype --minify-css true --minify-js true /tmp/index.html > /tmp/out/index.html"

docker run -d -p 443:443 -v ${PWD}:/srv caddy caddy file-server --domain fabiomaia.eu
