# SMD KA

This repository contains the configuration & content of the SMD Karlsruhe web page.
The web page is split into a backend and a frontend, which might be hosted on different servers.


## Setup Overview

### Backend

For our backend we are using [pocketbase](https://pocketbase.io/). Pocketbase is a very simple backend which can be mostly programmed and used by using their web interface. For now a couple of extensions via JavaScript exist. They serve the function to send emails to the users when they sign up for the SAFT or try to contact us for example. In the future it would be desired to rewrite these extensions in Go as this is the language pocketbase is written in.

### Frontend

For our frontend we are using [Svelte Kit](https://kit.svelte.dev/). SvelteKit is a framework for rapidly developing robust, performant web applications using [Svelte](https://svelte.dev/). It fairly simple to learn and makes the development quite easy. For styling we use [Taiwindcss](https://tailwindcss.com/) which provides many very practical classes to style the website fast. Also it offers easy mobile responsiveness which is super important as most of out users are probably using a mobile device.

### Docker Setup

In order to simplify deployment all the applications are dockerized. The [docker compose](/docker-compose.yml) specifies which containers exist. The main reason behind the dockerization is reliability. Also as a bonus with a dockerized app, you're not bound to a certain web hoster. We can move our website elsewhere if the provider raises prizes or causes other inconvinences.
The backend and frontend are running in two separate containers. The [Nginx](https://www.nginx.com/) webserver which serves the two is running in another container. Its config can be found [here](/nginx/nginx.conf).


<!-- title parsed by flake.nix -->
## Development

This section serves as a short intro on how to get a suitable development environment
for making changes & adaptions quickly
and also on how to test them quickly locally.

<!-- title parsed by flake.nix -->
### Configure Environment

> [!NOTE]
> There is a [Nix flake](./flake.nix) defined, so you can use `nix develop` if you have Nix installed.
> This setups, or checks, if setuping it is not possible, for everything listed here.
> Otherwise, just continue reading this paragraph.

You should have following prepared & installed:
- a POSIX / UNIX environment (Linux, Mac OSX, WSL on Windows, …)
- Docker (making `docker compose` available)
  - alternatively Podman & Podman-Compose (making `podman-compose` available)

Then you should execute following commands in your shell making your life easier:
<!-- first sh code block will be executed by flake.devShells -->
```sh
# create alias "compose"
# check podman first, because it can provide docker-compatible commands
if command -v podman && command -v podman-compose; then
    alias compose="podman-compose";
elif __check_command docker; then
    alias compose="docker compose";
else
    echo "WARNING: you’re missing either podman & podman-compose or docker for testing this deployment!" >&2
fi
# setup .env for development
echo "# DO NOT CHANGE ANYTHING HERE - IT GETS AUTOMATICALLY OVERWRITTEN!" > .env
echo "# This file gets created by a script in README.md, as adaption of prod.env" >> .env
# sed: removes comments; replaces TLDs with .local; increases port numbers by 8000
sed -E '/^#/d;s/^(DOMAIN_.+=.+).[^.]+/\1local/;s/(.*_PORT)=([0-9]+)/echo "\1$((\2+8000))"/e' env.prod >> .env
```

### Running the Setup Locally

This section focuses on running the website only.
Testing the whole compose stack is out of scope.

You can run the website in two different configs:
- run only the frontend locally, leveraging the productive backend
  ```sh
  cd frontend  # or "kings-cafe"
  npm run dev
  # open the localhost:XXXX url given, or insert `o` then enter
  ```
- run both backend & frontend locally
  (TODO add instructions and/or script)

Hint: The `kings-cafe` is an alternative frontend.
Meaning to run that, replace occurencies of the directory `frontend` with `kings-cafe`.


<!--
Overall hints for editing this file:
- devShells in flake.nix does attempt to parse sections of this README to show it to the user when launching `nix develop`.
  So please, even if you do not use `nix develop`,
  if you change titles of these sections (which are commented)
  or change other markers (which are commented),
  change them in flake.nix in the `readmeMarkers` variable as well.
-->
