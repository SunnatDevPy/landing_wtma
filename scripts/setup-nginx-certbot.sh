#!/usr/bin/env bash
# Certbot + host nginx orqali landing.okaposai.uz ni ishga tushirish.
# Caddy to'xtatiladi — nginx 80/443 portlarni oladi (wtma + landing).
set -euo pipefail

FINANCE_DIR="${FINANCE_DIR:-/var/www/finance}"
LANDING_DIR="${LANDING_DIR:-/var/www/landing_wtma}"
LANDING_DOMAIN="${LANDING_DOMAIN:-landing.okaposai.uz}"
FINANCE_DOMAIN="${FINANCE_DOMAIN:-wtma.okaposai.uz}"
CERTBOT_EMAIL="${CERTBOT_EMAIL:-}"

echo "=========================================="
echo " Nginx + Certbot — landing va wtma SSL"
echo "=========================================="
echo ""

if [ "$(id -u)" -ne 0 ]; then
  echo "Bu skriptni sudo bilan ishga tushiring:"
  echo "  sudo ./scripts/setup-nginx-certbot.sh"
  exit 1
fi

# --- 1. Paketlar ---
echo "==> [1/8] nginx va certbot..."
apt-get update -qq
apt-get install -y nginx certbot python3-certbot-nginx

# --- 2. Caddy to'xtatish (80/443 port uchun) ---
echo ""
echo "==> [2/8] Caddy to'xtatilmoqda (nginx 80/443 ni oladi)..."
if docker ps --format '{{.Names}}' | grep -q caddy; then
  docker ps --format '{{.Names}}' | grep caddy | xargs -r docker stop
  echo "    Caddy to'xtatildi"
else
  echo "    Caddy ishlamayapti — OK"
fi

# --- 3. Finance docker portlari (localhost) ---
echo ""
echo "==> [3/8] Finance docker portlari..."
cd "$FINANCE_DIR"

# docker-compose.override.yml yaratish (web:8081, api:8000)
cat > docker-compose.override.yml <<'OVERRIDE'
services:
  web:
    ports:
      - "127.0.0.1:8081:80"
  api:
    ports:
      - "127.0.0.1:8000:8000"
  caddy:
    profiles:
      - disabled
OVERRIDE

docker compose -f docker-compose.prod.yml -f docker-compose.override.yml --env-file .env.prod up -d db api web
echo "    Finance web → 127.0.0.1:8081, api → 127.0.0.1:8000"

# --- 4. Landing docker (localhost:8082) ---
echo ""
echo "==> [4/8] Landing docker build..."
cd "$LANDING_DIR"
git pull --ff-only 2>/dev/null || true

docker compose -f docker-compose.nginx.yml up -d --build
echo "    Landing → 127.0.0.1:8082"

# --- 5. Nginx konfiguratsiya ---
echo ""
echo "==> [5/8] Nginx konfiguratsiya..."
cp "$LANDING_DIR/deploy/nginx/landing.okaposai.uz.conf" /etc/nginx/sites-available/landing.okaposai.uz
cp "$LANDING_DIR/deploy/nginx/wtma.okaposai.uz.conf" /etc/nginx/sites-available/wtma.okaposai.uz

ln -sf /etc/nginx/sites-available/landing.okaposai.uz /etc/nginx/sites-enabled/
ln -sf /etc/nginx/sites-available/wtma.okaposai.uz /etc/nginx/sites-enabled/

# Default site o'chirish (port ziddiyati)
rm -f /etc/nginx/sites-enabled/default

nginx -t
systemctl enable nginx
systemctl restart nginx

# --- 6. Certbot SSL ---
echo ""
echo "==> [6/8] Certbot SSL olish..."
if [ -z "$CERTBOT_EMAIL" ]; then
  if [ -f "$FINANCE_DIR/.env.prod" ]; then
    CERTBOT_EMAIL="$(grep '^ACME_EMAIL=' "$FINANCE_DIR/.env.prod" | cut -d= -f2- || true)"
  fi
fi
CERTBOT_EMAIL="${CERTBOT_EMAIL:-admin@okaposai.uz}"

certbot --nginx \
  -d "$LANDING_DOMAIN" \
  -d "$FINANCE_DOMAIN" \
  --non-interactive \
  --agree-tos \
  -m "$CERTBOT_EMAIL" \
  --redirect

# --- 7. Avtomatik yangilash ---
echo ""
echo "==> [7/8] Certbot timer..."
systemctl enable certbot.timer 2>/dev/null || true
systemctl start certbot.timer 2>/dev/null || true

# --- 8. Test ---
echo ""
echo "==> [8/8] Test..."
curl -sI "https://$LANDING_DOMAIN" | head -5 || true
curl -sI "https://$FINANCE_DOMAIN" | head -5 || true

echo ""
echo "=========================================="
echo " Tayyor!"
echo "   Landing: https://$LANDING_DOMAIN"
echo "   Finance: https://$FINANCE_DOMAIN"
echo ""
echo " Caddy endi ishlatilmaydi — SSL Certbot orqali."
echo " Sertifikat yangilash: certbot renew (avtomatik timer)"
echo "=========================================="
