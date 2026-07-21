#!/usr/bin/env bash
# ERR_SSL_PROTOCOL_ERROR — landing.okaposai.uz uchun SSL tuzatish.
# Eski Certbot + yangi Caddy ziddiyatini bartaraf etadi.
set -euo pipefail

FINANCE_DIR="${FINANCE_DIR:-/var/www/finance}"
LANDING_DIR="${LANDING_DIR:-/var/www/landing_wtma}"
DOCKER_NETWORK="${DOCKER_NETWORK:-wtma}"
LANDING_DOMAIN="${LANDING_DOMAIN:-landing.okaposai.uz}"
CADDY_CONTAINER="$(docker ps --format '{{.Names}}' | grep -E 'caddy' | head -1 || true)"

echo "=========================================="
echo " WTMA Landing SSL diagnostika va tuzatish"
echo "=========================================="
echo ""

# --- 1. Eski Certbot / host nginx to'xtatish (443 port ziddiyati) ---
echo "==> [1/8] Eski Certbot va host nginx tekshiruvi..."
if systemctl is-active --quiet nginx 2>/dev/null; then
  echo "    !! Host nginx ishlayapti — to'xtatilmoqda (Caddy bilan ziddiyat)"
  sudo systemctl stop nginx
  sudo systemctl disable nginx 2>/dev/null || true
fi
if systemctl is-active --quiet certbot.timer 2>/dev/null; then
  echo "    !! Certbot timer ishlayapti — to'xtatilmoqda"
  sudo systemctl stop certbot.timer 2>/dev/null || true
  sudo systemctl disable certbot.timer 2>/dev/null || true
fi

echo "    Port 80/443 kim band qilgan:"
sudo ss -tlnp | grep -E ':80|:443' || true
echo ""

# --- 2. DNS ---
echo "==> [2/8] DNS tekshiruvi ($LANDING_DOMAIN)..."
if command -v dig >/dev/null 2>&1; then
  dig +short "$LANDING_DOMAIN" || true
else
  getent hosts "$LANDING_DOMAIN" || true
fi
echo ""

# --- 3. Caddyfile da landing bloki bormi? ---
echo "==> [3/8] Caddyfile tekshiruvi..."
CADDYFILE="$FINANCE_DIR/Caddyfile"
if [ -f "$CADDYFILE" ]; then
  if grep -q "wtma-landing-web" "$CADDYFILE"; then
    echo "    OK — landing bloki mavjud"
  else
    echo "    !! Landing bloki YO'Q — qo'shilmoqda..."
    cat >> "$CADDYFILE" <<'CADDYBLOCK'

# WTMA Marketing landing
{$LANDING_DOMAIN:landing.okaposai.uz} {
	encode gzip
	reverse_proxy wtma-landing-web:80

	header {
		Strict-Transport-Security "max-age=31536000; includeSubDomains"
		X-Content-Type-Options "nosniff"
		X-Frame-Options "SAMEORIGIN"
		Referrer-Policy "strict-origin-when-cross-origin"
	}
}
CADDYBLOCK
    echo "    Landing bloki qo'shildi"
  fi
else
  echo "    !! Caddyfile topilmadi: $CADDYFILE"
fi

# --- 4. .env.prod ---
echo ""
echo "==> [4/8] .env.prod tekshiruvi..."
ENV_FILE="$FINANCE_DIR/.env.prod"
if [ -f "$ENV_FILE" ]; then
  grep -E '^(DOMAIN|LANDING_DOMAIN|ACME_EMAIL)=' "$ENV_FILE" || true
  if ! grep -q '^LANDING_DOMAIN=' "$ENV_FILE"; then
    echo "LANDING_DOMAIN=$LANDING_DOMAIN" >> "$ENV_FILE"
    echo "    LANDING_DOMAIN qo'shildi"
  fi
else
  echo "    !! .env.prod topilmadi"
fi

# --- 5. Docker tarmoq ---
echo ""
echo "==> [5/8] Docker tarmoq ($DOCKER_NETWORK)..."
docker network create "$DOCKER_NETWORK" 2>/dev/null || true

if [ -n "$CADDY_CONTAINER" ]; then
  if ! docker inspect "$CADDY_CONTAINER" --format '{{range $k,$v := .NetworkSettings.Networks}}{{$k}} {{end}}' | grep -q "$DOCKER_NETWORK"; then
    echo "    Caddy ($CADDY_CONTAINER) tarmoqqa ulanmoqda..."
    docker network connect "$DOCKER_NETWORK" "$CADDY_CONTAINER" || true
  else
    echo "    OK — Caddy allaqachon $DOCKER_NETWORK da"
  fi
else
  echo "    !! Caddy konteyner topilmadi!"
fi

if docker ps --format '{{.Names}}' | grep -q wtma-landing-web; then
  if ! docker inspect wtma-landing-web --format '{{range $k,$v := .NetworkSettings.Networks}}{{$k}} {{end}}' | grep -q "$DOCKER_NETWORK"; then
    echo "    Landing tarmoqqa qayta ulanmoqda..."
    cd "$LANDING_DIR"
    DOCKER_NETWORK="$DOCKER_NETWORK" docker compose -f docker-compose.prod.yml up -d
  fi
fi

# --- 6. Finance repo yangilash (DNS fix docker-compose uchun) ---
echo ""
echo "==> [6/8] Finance repo yangilanmoqda..."
if [ -d "$FINANCE_DIR/.git" ]; then
  cd "$FINANCE_DIR"
  git pull --ff-only || echo "    !! git pull xato — qo'lda yangilang"
else
  echo "    !! Finance git repo topilmadi"
fi

# --- 7. Caddy qayta yaratish (Let's Encrypt sertifikat olish) ---
echo ""
echo "==> [7/8] Caddy qayta yaratilmoqda (DNS 8.8.8.8 + sertifikat olish)..."
cd "$FINANCE_DIR"
docker compose -f docker-compose.prod.yml --env-file .env.prod up -d --force-recreate caddy

CADDY_CONTAINER="$(docker ps --format '{{.Names}}' | grep -E 'caddy' | head -1 || true)"
echo "    Caddy konteyner: $CADDY_CONTAINER"

echo "    Caddy ichidagi DNS test:"
docker exec "$CADDY_CONTAINER" nslookup acme-v02.api.letsencrypt.org 2>&1 | tail -3 || \
  echo "    !! DNS hali ishlamayapti"

echo "    Konteynerdagi Caddyfile:"
docker exec "$CADDY_CONTAINER" grep -E 'landing|wtma-landing' /etc/caddy/Caddyfile || \
  echo "    !! Landing bloki konteynerda ko'rinmayapti!"

echo "    30 soniya kutilmoqda (ACME challenge)..."
sleep 30

echo ""
echo "    Caddy oxirgi loglar (landing/acme):"
docker logs "$CADDY_CONTAINER" --tail 40 2>&1 | grep -iE 'landing|acme|certificate|error|obtain' || \
  docker logs "$CADDY_CONTAINER" --tail 15 2>&1 || true

# --- 8. Test ---
echo ""
echo "==> [8/8] Test..."
echo "    HTTP:"
curl -sI -H "Host: $LANDING_DOMAIN" http://127.0.0.1 | head -5 || true
echo ""
echo "    HTTPS:"
if curl -sI --max-time 15 "https://$LANDING_DOMAIN" | head -8; then
  echo "    OK — HTTPS ishlayapti!"
else
  echo "    !! HTTPS hali ishlamayapti"
  echo ""
  echo "    Qo'lda sertifikat olish uchun:"
  echo "      curl -vI http://$LANDING_DOMAIN"
  echo "      docker logs $CADDY_CONTAINER 2>&1 | grep -i landing"
fi
echo ""

if [ -n "$CADDY_CONTAINER" ]; then
  echo "    Caddy -> landing bog'lanish:"
  docker exec "$CADDY_CONTAINER" wget -qO- --timeout=3 http://wtma-landing-web:80 2>&1 | head -c 80 || \
    echo "    !! Caddy landing konteynerini ko'rmayapti"
  echo ""
fi

echo "=========================================="
echo " Loglarda faqat wtma.okaposai.uz ko'rinsa —"
echo " landing uchun sertifikat olinmagan."
echo ""
echo " Tekshirish:"
echo "   docker logs $CADDY_CONTAINER 2>&1 | grep -i landing"
echo "   docker exec $CADDY_CONTAINER cat /etc/caddy/Caddyfile"
echo "=========================================="
