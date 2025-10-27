#!/usr/bin/env bash

set -euxo pipefail

# automatically executed by pipeline

curl -O https://goauthentik.io/docker-compose.yml
if patch --fuzz=3 --ignore-whitespace --strip=1 < docker-compose.patch; then
    :
else
    err=$?
    cat docker-compose.yml{,.rej}
    exit $err
fi
