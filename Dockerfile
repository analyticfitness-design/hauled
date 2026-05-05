# syntax=docker/dockerfile:1.7
# ─────────────────────────────────────────────────────────────────────
# HAULED FRONTEND — Nuxt 4 SSR
#
# Diseñado para construirse en GitHub Actions (7GB RAM), NO en el host
# de EasyPanel. EasyPanel solo hace `docker pull` de la imagen final.
#
# Tradeoffs:
#   - Build stage usa node:20 (Debian slim) en vez de alpine porque
#     algunos packages npm (sharp, esbuild) tardan más en alpine por
#     compilación. node:20-slim ahorra ~3 min en el build.
#   - Runtime usa alpine (más ligero, ~80MB vs 200MB).
# ─────────────────────────────────────────────────────────────────────

# Cache buster: 2026-05-05 — fuerza rebuild fresco (descartar cache GHA estancada)
ARG CACHE_BUST=2026-05-05-v2

# ===== Stage 1: build (Nuxt) =====
FROM node:20-slim AS builder

WORKDIR /app

# Solo manifest → maximiza cache hit
COPY package.json package-lock.json ./

# --ignore-scripts: evita postinstall hooks que descargan binaries
#   inesperados (puppeteer, etc).
RUN npm ci --ignore-scripts --no-audit --no-fund

# Copia el resto del código
COPY . .

# Build de Nuxt — genera .output/ con server SSR + cliente.
# NUXT_TELEMETRY_DISABLED=1 evita pings a nuxt.com durante el build.
ENV NUXT_TELEMETRY_DISABLED=1
ENV NODE_OPTIONS=--max-old-space-size=4096
ARG CACHE_BUST
RUN echo "cache-bust=$CACHE_BUST" && npm run build

# ===== Stage 2: runtime (alpine ligero) =====
FROM node:20-alpine AS runtime

WORKDIR /app

# Copia SOLO lo que necesita el server SSR — sin node_modules ni código fuente.
# El bundle de Nuxt en .output/server ya tiene sus deps inlineadas.
COPY --from=builder /app/.output .output
COPY --from=builder /app/public public

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

# Healthcheck — Nuxt responde 200 en cualquier ruta del SSR.
# wget viene en busybox de alpine.
HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
    CMD wget -q --spider http://127.0.0.1:3000/ || exit 1

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]
