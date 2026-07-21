#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

echo "==> Building and starting WTMA landing (landing.okaposai.uz)"
docker compose -f docker-compose.prod.yml up -d --build

echo ""
echo "Done. Landing container: wtma-landing-web"
echo "Ensure Finance Caddy routes landing.okaposai.uz -> wtma-landing-web:80"
echo "Then restart Caddy: cd /path/to/Finance_managment && docker compose -f docker-compose.prod.yml restart caddy"
