# HAULED Frontend — Guía de deploy en EasyPanel

> Build se hace en GitHub Actions (no en tu VPS). EasyPanel solo descarga
> la imagen de `ghcr.io` — cero compilación local.

## Setup inicial (una sola vez)

### 1. Verificar el primer build

Tras `git push origin main`, ve a:
**https://github.com/analyticfitness-design/hauled/actions**

El workflow `Build & push Frontend image` debe correr (~6-10 min la
primera vez por el `npm ci`). Cuando termina debe estar en verde ✅.

### 2. Hacer la imagen pública

Por default ghcr.io es privado. Para que EasyPanel la descargue sin
credenciales:

1. **https://github.com/users/analyticfitness-design/packages/container/hauled/settings**
2. Danger Zone → Change visibility → **Public**

### 3. Recrear el servicio en EasyPanel

1. Borra el servicio Frontend actual
2. **Create Service** → **App** → **From Image**
3. Configuración:
   ```
   Image:    ghcr.io/analyticfitness-design/hauled:latest
   Port:     3000
   ```

### 4. Variables de entorno (Environment)

```bash
# ─── App ──────────────────────────────────────────────
NODE_ENV=production
PORT=3000
HOST=0.0.0.0

APP_URL=https://hauled.shop

# ─── API backend (la URL pública de la API) ───────────
API_BASE_URL=https://api.hauled.shop

# ─── WhatsApp ─────────────────────────────────────────
WHATSAPP_NUMBER=573000000000

# ─── Wompi (claves PROD) ──────────────────────────────
WOMPI_PUBLIC_KEY=pub_prod_...
WOMPI_SECRET_KEY=prv_prod_...
```

### 5. Resource limits (para no tumbar otros containers)

```
CPU limit:           1.0
Memory limit:        512 MB
Memory reservation:  128 MB
```

Nuxt SSR consume ~150-300MB en runtime con tráfico moderado. 512MB es
holgado.

### 6. Dominio + SSL

```
hauled.shop  →  Container port 3000  →  HTTPS automático
```

### 7. Deploy → Pull image

Pulsa **Deploy**. Pico ~50MB de RAM en el host durante el `docker pull`.

---

## Verificar

```bash
curl -I https://hauled.shop/                       # → 200
curl -s https://hauled.shop/shop | grep -c GASP    # → muchos (productos cargando)
```

Y abre `https://hauled.shop/shop` → debe mostrar productos con precios
duales USD/COP, tarjetas con "-15%", y carrito funcional.

---

## Workflow día a día

```
1. git commit + git push origin main
2. GitHub Actions builds + push a ghcr.io (~3 min después del cache warm)
3. EasyPanel → "Deploy" (o auto-deploy si lo activaste)
```
