# Finance docker-compose.prod.yml uchun qo'shimcha qatorlar.
# Finance_managment/docker-compose.prod.yml fayliga qo'llang.

# --- Har bir servisga networks qo'shing ---
# db, api, web, caddy:
#   networks:
#     - wtma

# --- caddy environment ga qo'shing ---
#   LANDING_DOMAIN: ${LANDING_DOMAIN:-landing.okaposai.uz}

# --- DOMAIN default ni yangilang ---
#   DOMAIN: ${DOMAIN:-wtma.okaposai.uz}

# --- Fayl oxiriga qo'shing ---
# networks:
#   wtma:
#     name: wtma
