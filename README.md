# SMD KA

This repository contains the configuration & content of the SMD Karlsruhe web page.
The web page is split into a backend and a frontend, which might be hosted on different servers.

## Backend

For our backend we are using [pocketbase](https://pocketbase.io/). Pocketbase is a very simple backend which can be mostly programmed and used by using their web interface. For now a couple of extensions via JavaScript exist. They serve the function to send emails to the users when they sign up for the SAFT or try to contact us for example. In the future it would be desired to rewrite these extensions in Go as this is the language pocketbase is written in.

## Frontend

For our frontend we are using [Svelte Kit](https://kit.svelte.dev/). SvelteKit is a framework for rapidly developing robust, performant web applications using [Svelte](https://svelte.dev/). It fairly simple to learn and makes the development quite easy. For styling we use [Taiwindcss](https://tailwindcss.com/) which provides many very practical classes to style the website fast. Also it offers easy mobile responsiveness which is super important as most of out users are probably using a mobile device.

## Docker Setup

In order to simplify deployment all the applications are dockerized. The [docker compose](/docker-compose.yml) specifies which containers exist. The main reason behind the dockerization is reliability. Also as a bonus with a dockerized app, you're not bound to a certain web hoster. We can move our website elsewhere if the provider raises prizes or causes other inconvinences.
The backend and frontend are running in two separate containers. The [Nginx](https://www.nginx.com/) webserver which serves the two is running in another container. Its config can be found [here](/nginx/nginx.conf).

## Development

### Frontend

In order to run the frontend you need to have [Node.js](https://nodejs.org/en/) installed. We recommend installing it via the node version manager. After that you can run the following commands to start the development server:

```bash
cd frontend
# Install dependencies
npm install 
# Start the development server
npm run dev
```
