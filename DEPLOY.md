# WTMA Landing — serverga chiqarish

Domen: **https://landing.okaposai.uz**

Finance panel allaqachon **wtma.okaposai.uz** da ishlayapti. Landing xuddi shu serverda, alohida Docker konteyner sifatida ishlaydi; Caddy ikkala domenni boshqaradi.

## 1. DNS

Registrator panelida `landing.okaposai.uz` uchun **A yozuv** qo'shing — **wtma.okaposai.uz** bilan bir xil server IP.

| Type | Name    | Value        |
|------|---------|--------------|
| A    | landing | SERVER_IP    |

DNS tarqalishi 5–30 daqiqa olishi mumkin.

## 2. Serverga kod yuklash

Serverda (masalan `/opt/wtma-landing`):

```bash
# Variant A — git orqali (tavsiya)
git clone <repo-url> /opt/wtma-landing
cd /opt/wtma-landing

# Variant B — lokal mashinadan rsync
rsync -avz --exclude node_modules --exclude dist \
  ./ user@SERVER_IP:/opt/wtma-landing/
```

## 3. Finance Caddy ni yangilash (bir marta)

Finance loyihasida (`Finance_managment`) Caddy ikkala domenni qabul qiladi — `Caddyfile` va `docker-compose.prod.yml` allaqachon yangilangan.

`.env.prod` ga qo'shing:

```env
DOMAIN=wtma.okaposai.uz
LANDING_DOMAIN=landing.okaposai.uz
ACME_EMAIL=sizning@email.com
```

Keyin Finance stackni qayta ishga tushiring (bu `wtma` Docker tarmog'ini yaratadi):

```bash
cd /path/to/Finance_managment
docker compose -f docker-compose.prod.yml --env-file .env.prod up -d --build
```

## 4. Landing ni ishga tushirish

```bash
cd /opt/wtma-landing
chmod +x scripts/deploy.sh
./scripts/deploy.sh
```

Yoki qo'lda:

```bash
docker compose -f docker-compose.prod.yml up -d --build
```

## 5. Tekshirish

```bash
docker ps | grep wtma-landing
curl -I http://localhost  # Caddy orqali
curl -H "Host: landing.okaposai.uz" http://127.0.0.1 -I
```

Brauzerda: **https://landing.okaposai.uz**

## Yangilash (keyingi deploylar)

```bash
cd /opt/wtma-landing
git pull   # yoki rsync
docker compose -f docker-compose.prod.yml up -d --build
```

## Muammolar

| Muammo | Yechim |
|--------|--------|
| `network wtma not found` | Avval Finance `docker compose ... up -d` ishga tushiring |
| SSL sertifikat olinmadi | DNS A yozuvi to'g'ri ekanini tekshiring |
| 502 Bad Gateway | `docker ps` da `wtma-landing-web` ishlayotganini tekshiring |
| Eski sahifa | `docker compose ... up -d --build` qayta ishga tushiring |
