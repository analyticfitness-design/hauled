# Scripts — Hauled Frontend

Helpers para deploy, verificación y operaciones en EasyPanel + GitHub.

## Quick reference

```powershell
# Deploy completo: commit + push + CI build + EasyPanel deploy + verify
.\scripts\full-deploy.ps1 "fix: descripción del cambio"

# Solo trigger deploy + verify (no push)
.\scripts\full-deploy.ps1 -SkipPush

# Solo verificar el sitio live
node scripts\verify-live.cjs

# Solo trigger deploy en EasyPanel
node scripts\easypanel-deploy.cjs            # botón "Implementar"
node scripts\easypanel-deploy.cjs --rebuild  # icono hammer (force pull)
node scripts\easypanel-deploy.cjs --restart  # solo restart container
node scripts\easypanel-deploy.cjs --show     # browser visible (debug)
```

## Archivos

| Script | Propósito |
|--------|-----------|
| `full-deploy.ps1`        | Orquestación completa (git → CI → EasyPanel → verify) |
| `easypanel-deploy.cjs`   | Login en panel.wellcorefitness.com y trigger deploy |
| `verify-live.cjs`        | Carga hauled.shop con Puppeteer, audita productos y precios |

## Variables de entorno (opcionales)

```bash
EASYPANEL_EMAIL=info@wellcorefitness.com
EASYPANEL_PASS=<password>
```

Si no se definen, los scripts usan los valores hardcodeados (solo dev local —
no commitear creds reales en producción).

## Cómo funciona el deploy de Hauled

```
git push main
   │
   ▼
GitHub Actions (.github/workflows/build-and-push.yml)
   │  Construye imagen Docker con Buildx
   │  Push a ghcr.io/analyticfitness-design/hauled:latest
   │  + tag sha-<hash> + tag main
   ▼
EasyPanel (panel.wellcorefitness.com)
   │  Servicio "wellcorefitness/hauled" configurado con
   │  Source = Docker Image, Image = :latest
   │  Click "Implementar" → docker pull + restart
   ▼
hauled.shop (Cloudflare/edge → contenedor en 13.59.70.113)
```

## Verificación

`verify-live.mjs` chequea contra dos listas:

- **EXCLUDED_TITLES**: productos que NO deberían aparecer (los 5 eliminados:
  Track Suit V2, Track Pants, Washed Baggy, Legacy Gym Tee, Original Cut Out)
- **OLD_PRICE_TOKENS** vs **NEW_PRICE_TOKENS**: precios TRM 4200 vs TRM 3650 -15%

Sale con exit code 0 si fresh, 2 si stale.

## Troubleshooting

### "Deploy stale" después de full-deploy

EasyPanel a veces no hace fresh pull con "Implementar". Soluciones:

1. `node scripts\easypanel-deploy.cjs --rebuild` — usa icono hammer
2. En el panel UI: detener servicio → arrancar (force pull)
3. Verificar que la imagen `:latest` en ghcr.io tiene el commit esperado:
   `gh api /users/analyticfitness-design/packages/container/hauled/versions`

### GitHub Actions tarda mucho

`build-and-push.yml` usa `cache-from: type=gha` así que builds posteriores
son ~1-2 min. Primer build sin caché puede tardar 5+ min.
