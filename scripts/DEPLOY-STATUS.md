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

## ESTADO ACTUAL (2026-05-05 ~02:18)

- ✅ Host AWS arriba (panel responde 200)
- ✅ Imagen `:latest` en GHCR con commit f85d44f
- ✅ Dominios apuntan a port 3000 (matching nuevo Dockerfile)
- ❌ **Container hauled NO arranca** — Docker swarm "task has not been scheduled"
- ❌ hauled.shop devuelve 502/503

### Lo que probé (todo sin éxito)
- `node scripts/easypanel-deploy.cjs` — click Implementar
- `node scripts/easypanel-deploy.cjs --rebuild` — click hammer (force pull)
- `node scripts/easypanel-restart-cycle.cjs` — Stop → Start ciclo
- `node scripts/easypanel-set-image.cjs sha-XXX` — image tag distinto
- Click Play (▶) directo → 0% CPU, 0 B memoria (no arranca)
- Cambio de port 80 → 3000 en proxy de dominios

Después de 60s con Play clickeado, container sigue en 0%/0B/Red.

### Diagnóstico
Docker Swarm scheduler está bloqueado para hauled. Los otros 4 servicios
(prowaylab, wellcorefitness, mysql, redis) corren OK, así que el swarm
en sí funciona — solo se niega a programar la task de hauled.

Host tiene RAM disponible (1.1 GB / 1.9 GB usado, ~800 MB libre — Nuxt
container debería caber), así que NO es OOM directo.

Posibles causas (requiere SSH al host):
1. Stale swarm state después del crash/reboot — necesita cleanup manual
2. Constraint de recursos en el servicio (memory limit) > free reservado
3. Image pull failing silently (auth/cache GHCR)

## Recovery — qué hacer

### Vía SSH al host AWS
```bash
ssh ubuntu@13.59.70.113   # o el user correspondiente

# Ver el estado del swarm
docker service ls | grep hauled
docker service ps wellcorefitness_hauled --no-trunc

# Esto te dirá EXACTAMENTE por qué la task no se programa
# Si "no suitable node" → constraint o resources
# Si "rejected" → problema de pull o port

# Forzar nuevo pull manual (bypass cache de Docker)
docker pull ghcr.io/analyticfitness-design/hauled:latest

# Reiniciar el servicio en swarm
docker service update --force wellcorefitness_hauled

# Ver logs del último intento
docker service logs wellcorefitness_hauled --tail 50

# Si nada funciona, eliminar y dejar que EasyPanel recree
docker service rm wellcorefitness_hauled
# Luego en EasyPanel UI → click Implementar
```

### Si el problema es resource limits
En EasyPanel UI → hauled → Recursos → ajustar memory limit a algo bajo
(256MB o así) y guardar.

### Si necesitas reiniciar AWS manualmente
1. AWS Console → EC2 → `13.59.70.113`
2. Reboot (o Stop + Start)
3. Espera 2-3 min para Docker daemon
4. Login a panel → click Implementar en hauled

### Si nada funciona — rollback de port

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
