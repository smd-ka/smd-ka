# SMD KA

## Backend

For our backend we are using [pocketbase](https://pocketbase.io/). Pocketbase is a very simple backend which can be mostly programmed and used by using their web interface. For now a couple of extensions via javascript exsist. They serve the function to send emails to the users when they sign up for the saft or try to contact us for example. In the future it would be desired to rewrite these extensions in Go as this is the language pocketbase is written in.

## Frontend

For our frontend we are using [Svelte Kit](https://kit.svelte.dev/). SvelteKit is a framework for rapidly developing robust, performant web applications using [Svelte](https://svelte.dev/). It fairly simple to learn and makes the development quite eas. For styling we use [Taiwindcss](https://tailwindcss.com/) which provies many very practical classes to style the website fast. Also it offers easy mobile responsiveness which is super important as most of out users are probably using a mobile device.

## Docker Setup

In order to simplify deployment all the aplications are dockerized. The [docker compose](/docker-compose.yml) specifies which containers exist. The main reason behind the dockerization is reliability. Also as a bonus with a dockerized app, you're not bound to a certain web hoster. We can move our website elsewhere if the provider raises prizes or causes other inconvinences.
The backend and fronend are running in two seperate containers. The [Nginx](https://www.nginx.com/) webserver which serves the two is running in another container. It's conig can be found [here](/nginx/nginx.conf)
