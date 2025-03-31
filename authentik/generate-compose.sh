#!/usr/bin/env bash

set -euxo pipefail

# automatically executed by pipeline

curl -O https://goauthentik.io/docker-compose.yml
git apply docker-compose.patch
