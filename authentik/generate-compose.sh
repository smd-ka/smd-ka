#!/usr/bin/env bash

set -euxo pipefail

# automatically executed by pipeline

curl -O https://goauthentik.io/docker-compose.yml
patch -p1 < docker-compose.patch
