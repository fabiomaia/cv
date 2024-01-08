# Curriculum Vitae

My résumé as a document for the webFuck LaTeX.

## Features

- Simple, minimal, [motherfuckingwebsite.com](https://motherfuckingwebsite.com/)-esque design
- Mobile-first and responsive
- Print-friendly and made to be exported to a one-page PDF with <kbd>ctrl</kbd>+<kbd>p</kbd> on any modern web browser
- [`prefers-color-scheme`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme)-friendly
- Highly semantic, accessible, specification compliant HTML5
- Zero additional HTTP requests besides `GET /index.html`
    - Relies on available system fonts by setting `font-family: sans-serif` because incurring an external HTTP request of 1-3KB responses of Google Fonts CSS that will trigger additional external HTTP requests with 10-20KB responses for each selected font format provides questionable impact on readability of a one page résumé
    - Zero JavaScript because why would you need JavaScript for what is obviously a static one page document?
    - Inlined CSS because why would you incur an additional HTTP request to load ~1000 bytes of CSS?
    - base64-encoded transparent favicon `<link rel="icon" href="data:;base64,iVBORw0KGgo=">` (50 additional bytes in `index.html`) to prevent the browser from requesting `GET /favicon.ico` by default (whose response is certainly, albeit variably, larger than the favicon's 50 mere bytes)
- Class-less HTML because why would you need classes for a single static document on which you can predictably target the elements themselves?

## Deployment

```
apt update
apt install ca-certificates curl vim git gnupg tmux

adduser fabio
usermod -aG sudo fabio

sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/debian/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

echo \
  "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/debian \
  "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt-get update

sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

sudo groupadd docker
sudo usermod -aG docker $USER
newgrp docker

sudo systemctl enable docker.service
sudo systemctl enable containerd.service
reboot

docker run -d -p 80:80 -p 443:443 -v "$PWD:/srv" -v "$PWD/Caddyfile:/etc/caddy/Caddyfile" caddy caddy run
```
