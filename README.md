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

### Automatic Backups

<!-- describing this here, so this info is accessible in case of failure of our wiki -->

We have automatic backups for the most crucial data enabled.
This backup mechanism is enabled by Nextcloud AiO’s integration of BorgBackup.
Nextcloud AiO should be configured to currently include the following volumes in its backups:
- `authentik_database` (our user database)
- `smd-ka_dokuwiki_data` (our internal wiki)
- `smd-ka_pb_data` (data of web backend)

<!-- serve some hints in case of catrastophic failure of our server -->
The backup location is currently under control of @Zocker1999_NET (as of 2026-03-15).
All backups created by BorgBackup are encrypted,
therefore to access our backups, the encryption key is required,
This key should be accessible by the leaders of our group
and by the the leader of our PrIT team.
The backup service does additionally create weekly snapshots
which are not accessible to our server in case of a ransomware attack.

Nextcloud AiO can guide users through restoring its own data,
while the additional containers need to be restored manually.


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
  (explicit pin to productive backend required because otherwise the frontend does pin itself to the local one)
  ```sh
  cd frontend  # or "kings-cafe"
  grep VITE_API_URL= .env > .env.prod  # pin to productive backend
  npm run dev
  # open the localhost:XXXX url given, or insert `o` then enter
  ```
- run both backend & frontend locally
    1.  For that, you need a recent backup from the production site so that the backend can actually run.
        Download this as superadmin from our backend.
    2.  Then run the following snippet:
        ```sh
        fr_dir="frontend"  # or "kings-cafe"
        echo "VITE_API_URL=http://127.0.0.1:8090/" > "$fr_dir/.env.local"  # pin to local backend
        cd backend
        # rollback database to latest backup available
        rm -rf pb_data
        backup_list=( ~/Downloads/pb_backup_smd_ka_backend_*.zip )  # auto-picks latest backup
        unzip "${backup_list[-1]}" -d ./pb_data
        # start backend
        AUTHENTIK_BEARER_TOKEN=DISABLED:local-debugging go run . serve
        # afterwards start frontend with same command from above
        (cd "../$fr_dir" && npm run dev)
        ```

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
