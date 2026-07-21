# WTMA Landing — serverga chiqarish

Domen: **https://landing.okaposai.uz**

> **Finance allaqachon ishlayapti?** — quyidagi [Mavjud serverga qo'shish](#mavjud-serverga-qoshish) bo'limidan foydalaning. Finance qayta o'rnatilmaydi.

## Server papkalari

| Loyiha  | Yo'l                    | Domen                  |
|---------|-------------------------|------------------------|
| Finance | `/var/www/finance`      | wtma.okaposai.uz       |
| Landing | `/var/www/landing_wtma` | landing.okaposai.uz    |

---

## Mavjud serverga qo'shish

Finance o'tgan oy o'rnatilgan bo'lsa, faqat 3 narsa kerak:

1. **DNS** — `landing.okaposai.uz` A yozuvi (wtma bilan bir xil IP)
2. **Landing** — `/var/www/landing_wtma` ga clone + Docker
3. **Caddy** — landing domeni uchun yangi blok (Finance qayta build qilinmaydi)

### Tez yo'l (bitta skript)

Serverda:

```bash
git clone https://github.com/SunnatDevPy/landing_wtma.git /var/www/landing_wtma
cd /var/www/landing_wtma
chmod +x scripts/add-to-existing-server.sh
./scripts/add-to-existing-server.sh
```

Skript nima qiladi:
- Landing ni build qiladi
- `wtma` Docker tarmog'ini yaratadi (yoki mavjudidan foydalanadi)
- Caddy ni shu tarmoqqa ulaydi
- Finance `Caddyfile` ni yangilaydi va **faqat Caddy** ni restart qiladi
- `db`, `api`, `web` konteynerlariga **tegmaydi**

### Qo'lda (agar skript ishlamasa)

**1. DNS** — `landing` → server IP

**2. Landing clone:**
```bash
git clone https://github.com/SunnatDevPy/landing_wtma.git /var/www/landing_wtma
cd /var/www/landing_wtma
```

**3. Docker tarmoq** (Caddy va landing bir-birini ko'rishi uchun):
```bash
docker network create wtma 2>/dev/null || true

# Caddy konteyner nomini toping:
docker ps | grep caddy
# Masalan: finance-caddy-1

docker network connect wtma finance-caddy-1
```

**4. Finance Caddyfile** — `/var/www/finance/Caddyfile` oxiriga qo'shing:

```caddyfile
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
```

`/var/www/finance/.env.prod` ga qo'shing:
```env
LANDING_DOMAIN=landing.okaposai.uz
```

**5. Faqat Caddy ni yangilash** (Finance panel ishda qoladi):
```bash
cd /var/www/finance
docker compose -f docker-compose.prod.yml --env-file .env.prod up -d caddy
```

**6. Landing ishga tushirish:**
```bash
cd /var/www/landing_wtma
docker compose -f docker-compose.prod.yml up -d --build
```

**7. Tekshirish:**
```bash
curl -I -H "Host: landing.okaposai.uz" http://127.0.0.1
```

Brauzerda: **https://landing.okaposai.uz**

### Eski Finance tarmog'i boshqacha bo'lsa

Agar `network wtma not found` xatosi chiqsa, mavjud tarmoq nomini toping:

```bash
docker network ls
docker inspect finance-caddy-1 --format '{{range $k,$v := .NetworkSettings.Networks}}{{$k}}{{end}}'
```

Keyin landing ishga tushiring:
```bash
cd /var/www/landing_wtma
DOCKER_NETWORK=finance_default docker compose -f docker-compose.prod.yml up -d --build
```

(`finance_default` o'rniga o'zingiz topgan tarmoq nomini yozing)

---

## Yangi server (noldan o'rnatish)

Agar Finance hali o'rnatilmagan bo'lsa:

```bash
git clone https://github.com/SunnatDevPy/Finance_kpi.git /var/www/finance
cd /var/www/finance
cp .env.prod.example .env.prod
docker compose -f docker-compose.prod.yml --env-file .env.prod up -d --build

git clone https://github.com/SunnatDevPy/landing_wtma.git /var/www/landing_wtma
cd /var/www/landing_wtma
./scripts/deploy.sh
```

---

## Landing yangilash (keyingi deploylar)

```bash
cd /var/www/landing_wtma
git pull
docker compose -f docker-compose.prod.yml up -d --build
```

Finance panelga tegmaydi.

---

## Muammolar

| Muammo | Yechim |
|--------|--------|
| `network wtma not found` | `docker network create wtma` yoki `DOCKER_NETWORK=...` bilan ishga tushiring |
| SSL sertifikat olinmadi | DNS A yozuvi to'g'ri ekanini tekshiring |
| 502 Bad Gateway | `docker ps` da `wtma-landing-web` ishlayotganini tekshiring |
| Finance ishlamay qoldi | Faqat `caddy` ni restart qiling, `up -d --build` emas |
| Caddy landing ni ko'rmayapti | `docker network connect wtma <caddy-container>` |
| `ERR_SSL_PROTOCOL_ERROR` | `./scripts/fix-ssl.sh` — Certbot/nginx ziddiyati + sertifikat qayta olish |

### SSL xato (ERR_SSL_PROTOCOL_ERROR)

**Belgilar:** HTTP ishlaydi (`curl` 308 redirect), brauzerda HTTPS ochilmaydi.

**Sabab:** Caddy landing uchun Let's Encrypt sertifikat ololmagan. Eski **Certbot** yoki **host nginx** 443 portni band qilgan bo'lishi mumkin.

**Tuzatish (serverda):**
```bash
cd /var/www/landing_wtma
git pull
chmod +x scripts/fix-ssl.sh
./scripts/fix-ssl.sh
```

**Qo'lda:**
```bash
# Eski certbot/nginx to'xtatish
sudo systemctl stop nginx certbot.timer 2>/dev/null || true

# Caddy loglari
docker logs finance-caddy-1 --tail 30

# Caddy qayta ishga tushirish
cd /var/www/finance
docker compose -f docker-compose.prod.yml --env-file .env.prod restart caddy

# HTTPS test
curl -vI https://landing.okaposai.uz
```

> **Eslatma:** Endi SSL **Caddy** orqali avtomatik olinadi. Certbot kerak emas — faqat Caddy 80 va 443 portlarni ishlatishi kerak.
