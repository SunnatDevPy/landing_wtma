#!/usr/bin/env bash
# Finance allaqachon ishlayotgan serverga landing qo'shish.
# Finance qayta o'rnatilmaydi — faqat Caddy yangilanadi va landing konteyneri qo'shiladi.
set -euo pipefail

FINANCE_DIR="${FINANCE_DIR:-/var/www/finance}"
LANDING_DIR="${LANDING_DIR:-/var/www/landing_wtma}"
DOCKER_NETWORK="${DOCKER_NETWORK:-wtma}"

echo "==> Mavjud Finance: $FINANCE_DIR"
echo "==> Yangi Landing:  $LANDING_DIR"
echo "==> Docker tarmoq:  $DOCKER_NETWORK"
echo ""

# 1. Landing kodini yuklash (agar yo'q bo'lsa)
if [ ! -d "$LANDING_DIR/.git" ]; then
  echo "==> Landing clone qilinmoqda..."
  git clone https://github.com/SunnatDevPy/landing_wtma.git "$LANDING_DIR"
fi

# 2. Docker tarmoq — landing va Caddy bir-birini ko'rishi kerak
if ! docker network inspect "$DOCKER_NETWORK" >/dev/null 2>&1; then
  echo "==> '$DOCKER_NETWORK' tarmog'i yaratilmoqda..."
  docker network create "$DOCKER_NETWORK"
fi

# 3. Caddy konteynerini tarmoqqa ulash (eski Finance o'rnatilgan bo'lsa kerak bo'ladi)
CADDY_CONTAINER="$(docker ps --format '{{.Names}}' | grep -E 'caddy' | head -1 || true)"
if [ -n "$CADDY_CONTAINER" ]; then
  if ! docker inspect "$CADDY_CONTAINER" --format '{{range $k,$v := .NetworkSettings.Networks}}{{$k}} {{end}}' | grep -q "$DOCKER_NETWORK"; then
    echo "==> Caddy ($CADDY_CONTAINER) '$DOCKER_NETWORK' tarmog'iga ulanmoqda..."
    docker network connect "$DOCKER_NETWORK" "$CADDY_CONTAINER" || true
  fi
else
  echo "!! Caddy konteyner topilmadi. Finance ishlayotganini tekshiring."
fi

# 4. Finance Caddyfile yangilash (git pull orqali)
if [ -d "$FINANCE_DIR/.git" ]; then
  echo "==> Finance repo yangilanmoqda (Caddyfile)..."
  cd "$FINANCE_DIR"
  git pull --ff-only || echo "!! git pull xato — Caddyfile ni qo'lda yangilang"
fi

# 5. .env.prod ga LANDING_DOMAIN qo'shish (agar yo'q bo'lsa)
ENV_FILE="$FINANCE_DIR/.env.prod"
if [ -f "$ENV_FILE" ] && ! grep -q '^LANDING_DOMAIN=' "$ENV_FILE"; then
  echo "LANDING_DOMAIN=landing.okaposai.uz" >> "$ENV_FILE"
  echo "==> .env.prod ga LANDING_DOMAIN qo'shildi"
fi

# 6. Faqat Caddy ni qayta yuklash (db/api/web ga tegmaydi)
echo "==> Caddy qayta yuklanmoqda..."
cd "$FINANCE_DIR"
docker compose -f docker-compose.prod.yml --env-file .env.prod up -d caddy

# 7. Landing build va ishga tushirish
echo "==> Landing build..."
cd "$LANDING_DIR"
DOCKER_NETWORK="$DOCKER_NETWORK" docker compose -f docker-compose.prod.yml up -d --build

echo ""
echo "Tayyor!"
echo "  Finance: https://wtma.okaposai.uz  (o'zgarmagan)"
echo "  Landing: https://landing.okaposai.uz"
echo ""
echo "Tekshirish:"
echo "  docker ps | grep -E 'caddy|landing'"
echo "  curl -I -H 'Host: landing.okaposai.uz' http://127.0.0.1"
