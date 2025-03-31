#!/usr/bin/env bash

set -euxo pipefail


# manual work required:
# - ssh into host
# - execute this script
# - insert mail password


# source: https://docs.goauthentik.io/docs/install-config/install/docker-compose


if [[ -e .env ]]; then
    echo "ERROR: .env already exists!" >&2
    exit 1
fi


# those passwords can be regenerated without problems
echo "PG_PASS=$(openssl rand -base64 36 | tr -d '\n')" >> .env
echo "AUTHENTIK_SECRET_KEY=$(openssl rand -base64 60 | tr -d '\n')" >> .env


# take those from our E-Mail provider
cat >> .env <<EOF
# SMTP Host Emails are sent to
AUTHENTIK_EMAIL__HOST=w00ab2dc.kasserver.com
AUTHENTIK_EMAIL__PORT=587
# Optionally authenticate (don't add quotation marks to your password)
AUTHENTIK_EMAIL__USERNAME=webmaster@smd-karlsruhe.de
AUTHENTIK_EMAIL__PASSWORD=
# Use StartTLS
AUTHENTIK_EMAIL__USE_TLS=true
# Use SSL
AUTHENTIK_EMAIL__USE_SSL=false
AUTHENTIK_EMAIL__TIMEOUT=10
# Email address authentik will send from, should have a correct @domain
AUTHENTIK_EMAIL__FROM=webmaster@smd-karlsruhe.de
EOF
