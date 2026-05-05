# Estado del deploy — 2026-05-05 (sesión Claude Opus 4.7)

## TL;DR

- Todo el código nuevo está en `main` (5 commits, todos con CI verde)
- Imagen `:latest` en GHCR contiene el commit `f85d44f` (verificado vía OCI manifest)
- **Servidor EasyPanel `13.59.70.113` cayó tras cambiar config de dominios**
  100% packet loss, hauled.shop y panel.wellcorefitness.com unreachable
- Cuando el server vuelva, el deploy debería completar solo (port 3000 ↔ 3000)

## Commits hechos en esta sesión

```
f85d44f  add: scripts easypanel-fix-port + restart-cycle (autonomous deploy helpers)
6fec24f  fix: invalidar cache Docker para forzar build fresh + scripts deploy autónomos
0d1e499  fix: limpiar category-data.ts — eliminar referencias a productos borrados
7e73ad4  fix: precios TRM 3650 + 15% off, eliminar 5 productos no recibidos, favicon HAULED
```

## Cambios funcionales

### Producto / catálogo
- 5 productos eliminados (no llegaron en pedido GASP):
  `gasp-005 Track Suit V2`, `gasp-006 Track Pants`, `gasp-009 Washed Baggy`,
  `gasp-011 Legacy Gym Tee`, `gasp-014 Original Cut Out Tank`
- 15 productos GASP activos con precios recalculados:
  `priceUsd × 3650 × 0.85` = COP final (15% off vs precio público)
- Categorías limpiadas (sin referencias a IDs eliminados)

### Branding
- `favicon.svg` HAULED (caja isométrica + cyan #4CC9F0)
- Generadas variantes PNG: 16, 32, 48, 64, 96, 192, 256, 512 + apple-touch-icon
- `logo.svg` y `logo-white.svg` con HAULED brand
- `nuxt.config.ts`: links de favicon + theme-color

### Infraestructura
- `Dockerfile`: ARG CACHE_BUST + echo en RUN para invalidar cache stale
- `.github/workflows/build-and-push.yml`: cache-from/cache-to GHA disabled

## Cambios en EasyPanel (lado servidor, NO en git)

Estos cambios los hice via Puppeteer en la UI:

1. **Source → Image tag** modificado a `sha-0d1e499` y luego de regreso a `:latest`
2. **Dominios → puerto target** cambiado de `80` → `3000` para ambos:
   - `https://wellcorefitness-hauled.v9xcpt.easypanel.host/`
   - `https://hauled.shop/`
3. **Container restart cycle** (Stop → Start) — fuerza fresh image pull

## Por qué el server cayó

Probable causa: el cambio de proxy (puerto 80 → 3000) coincidió con una
transición del container en la que el viejo aún corría en 80 mientras el
nuevo intentaba arrancar en 3000. El reverse proxy de EasyPanel (Traefik
o similar) quedó sin upstream válido y posiblemente saturó la cola, OOM
matando al host AWS.

Ya tenías memoria previa: *"EasyPanel tumba el servidor al levantar la API"*.
Mismo patrón.

## Recovery — qué hacer cuando vuelvas

### Si el server vuelve solo
1. Espera al Monitor que esté corriendo (`task bfbbrl0jj`).
2. El nuevo container debería arrancar con port 3000.
3. Verifica con: `node scripts/verify-live.cjs`
4. Si dice `✅ DEPLOY FRESH`, listo.

### Si necesitas reiniciar AWS manualmente
1. Entra a AWS Console → EC2 → instancia `13.59.70.113`
2. Si está running pero unresponsive → Reboot
3. Si está stopped → Start
4. Espera 2-3 min para que EasyPanel y Docker arranquen
5. Logueate al panel: https://panel.wellcorefitness.com/
6. Servicio `hauled` debería arrancar solo. Si no:
   ```
   node scripts/easypanel-deploy.cjs
   node scripts/verify-live.cjs
   ```

### Si el nuevo container no arranca (port mismatch persistente)

Dos opciones:

**A) Forzar nuevo build con port 80** (matching la config original del proxy):
```bash
# Editar Dockerfile línea ENV PORT=3000 → ENV PORT=80
# Editar nuxt.config.ts si necesario
git commit -am "revert: port back to 80"
git push
```
Luego en EasyPanel:
```
node scripts/easypanel-fix-port.cjs 80
node scripts/easypanel-deploy.cjs
```

**B) Confirmar que el container arranca en 3000**:
- Click "Console" (>_) en EasyPanel del servicio hauled
- Verifica con `netstat -tlnp` que el proceso bind a :3000
- Si bind a otro port, ajustar PORT env en `Entorno`

## Scripts disponibles ahora

```powershell
.\scripts\full-deploy.ps1 "fix: msg"     # commit + push + CI + EasyPanel deploy + verify
node scripts\verify-live.cjs              # audit hauled.shop
node scripts\easypanel-deploy.cjs         # solo trigger Implementar
node scripts\easypanel-deploy.cjs --rebuild  # icono hammer (force pull)
node scripts\easypanel-restart-cycle.cjs  # Stop → Start (fresh container)
node scripts\easypanel-set-image.cjs main # cambiar tag de imagen
node scripts\easypanel-fix-port.cjs 3000  # cambiar puerto del proxy
```

## Lo que NO toqué (por instrucción tuya)

- `hauled-api` (Laravel) — sigue local-only
- Database (`wellcorefitness-mysql`)
- Servicios `wellcorefitness`, `prowaylab`, `wellcorefitness-redis`

---
*Generado: 2026-05-05 ~01:35*
