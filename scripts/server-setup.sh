#!/usr/bin/env bash
# Serverda birinchi marta ishga tushirish (root yoki docker guruhidagi user)
set -euo pipefail

FINANCE_DIR="${FINANCE_DIR:-/opt/Finance_managment}"
LANDING_DIR="${LANDING_DIR:-/opt/wtma-landing}"

echo "==> 1/3 Finance stack (Caddy + wtma tarmog'i)"
cd "$FINANCE_DIR"
docker compose -f docker-compose.prod.yml --env-file .env.prod up -d

echo "==> 2/3 Landing build"
cd "$LANDING_DIR"
docker compose -f docker-compose.prod.yml up -d --build

echo "==> 3/3 Caddy qayta yuklash"
cd "$FINANCE_DIR"
docker compose -f docker-compose.prod.yml restart caddy

echo ""
echo "Tayyor:"
echo "  Finance: https://wtma.okaposai.uz"
echo "  Landing: https://landing.okaposai.uz"
