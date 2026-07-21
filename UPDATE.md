# Landing yangilash

Yangi o'zgarishlar GitHubga push qilingandan keyin serverda:

```bash
cd /var/www/landing_wtma
git pull
docker compose -f docker-compose.nginx.yml up -d --build
```

Agar `git pull` xato bersa (lokal o'zgarishlar):

```bash
cd /var/www/landing_wtma
git checkout -- .
git pull
docker compose -f docker-compose.nginx.yml up -d --build
```

Tekshirish:

```bash
curl -I https://landing.okaposai.uz
docker ps | grep wtma-landing
```

> Finance panel (`wtma.okaposai.uz`) bu buyruqlar bilan o'zgarmaydi — faqat landing yangilanadi.
