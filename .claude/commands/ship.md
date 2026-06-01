---
description: Pre-deploy de Hauled (Nuxt). Verifica typecheck + build (+ gate de diseño/voz si tocaste UI) antes de pushear; GitHub Actions buildea la imagen.
---

# /ship — Hauled (frontend)

El deploy real lo hace GitHub Actions → ghcr.io → EasyPanel. Este comando verifica que el build no rompa ANTES de pushear.

## Gates (parar al primer fallo)

1. **Typecheck**
   ```bash
   npx nuxi typecheck
   ```
2. **Build SSR** (lo que correrá en CI)
   ```bash
   npm run build
   ```
   ⚠️ Build **local**, NUNCA en el container EasyPanel.
3. **Identidad & voz (si tocaste UI/copy):** corre los gates de marca —
   - `tokens-canonical-compliance` (cero hex sueltos, cero Raleway, cero `!important`),
   - `hauled-design-reviewer` (no se ve genérico/Bootstrap; usa acento `#4CC9F0`, Raleway, firma),
   - `hauled-brand-voice-guardian` (tuteo, cero voseo/humo, precios `$149.900`).
   - **Mobile 390px** verificado en Chrome MCP · **WCAG AA** contraste ≥4.5:1 en texto sobre fondo.
4. **Humo manual** (si tocaste flujo crítico): `npm run preview` y probar carrito/checkout/encargo.
5. **Secretos**: confirmar que no se cuela `.env`, tokens, ni `node_modules/`.
   ```bash
   git status
   ```

## Si todo pasa
1. `git add <archivos>` (nunca `.env` ni `node_modules`).
2. `git commit -m "<mensaje convencional>"` — **sin atribución de IA**.
3. `git push` → GitHub Actions buildea y sube `ghcr.io/analyticfitness-design/hauled:latest`.
4. EasyPanel hace `docker pull`; verificar `https://hauled.shop` (móvil 414×896 + desktop 1440×900, 0 errores de consola).

## Reglas
- Solo `runtimeConfig.public.*` es público — no filtrar secretos al cliente.
- Si el build rompe por SSR (uso de `window`/`document`), delega a `nuxt-frontend`/`build-error-resolver`.
