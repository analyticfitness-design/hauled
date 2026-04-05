# HAULED — Diseño Fullstack Local
**Fecha:** 2026-04-05
**Estado:** Aprobado

---

## Resumen

Conectar el frontend Nuxt 4 existente (HAULED ecommerce) con un backend Laravel 11 nuevo, construido módulo por módulo, probando cada uno antes de avanzar al siguiente.

---

## Stack

| Capa | Tecnología |
|------|-----------|
| Frontend | Nuxt 4.2 (Vue 3) — ya existe |
| Backend | Laravel 11 |
| Admin | Filament 3 |
| Auth | Laravel Sanctum |
| Base de datos | MySQL 8 (Herd local) |
| Storage | Laravel local disk (máx. 50 productos) |
| Pagos | Wompi (redirect + webhook) |
| Notificaciones | wa.me links (WhatsApp) |
| Deploy futuro | Nuxt → Vercel / Laravel → EasyPanel + MySQL |

---

## Arquitectura

```
hauled.test (Nuxt 4, puerto 3000)
    ↕ HTTP JSON (Sanctum token en header)
hauled-api.test (Laravel 11, Herd PHP)
    ↕ Eloquent ORM
MySQL 8 (Herd local)

hauled-api.test/admin → Filament 3 (solo admin)
```

**CORS:** Laravel acepta requests de `hauled.test` en desarrollo.

**Auth flow:**
1. Nuxt POST /api/v1/auth/login → Laravel devuelve token
2. Nuxt guarda token en Pinia + localStorage
3. Cada request lleva `Authorization: Bearer {token}`

---

## Base de Datos

### users
```
id, name, email, password, phone, address (JSON), role (admin|user),
email_verified_at, remember_token, timestamps
```

### products
```
id, sku, title, slug, description, price (int, centavos COP),
discount (int, %), quantity, status (in-stock|out-of-stock),
hauled_line (originals|basics|encargo), sizes (JSON), images (JSON),
category_id (FK), brand_id (FK), featured (bool),
advance_percent (int, para encargos), delivery_days (string),
sell_count, timestamps
```

### categories
```
id, name, slug, parent_id (FK self), image, timestamps
```

### brands
```
id, name, logo, timestamps
```

### orders
```
id, user_id (FK), reference (unique), total (int, centavos),
status (pending|paid|shipped|delivered|cancelled),
wompi_ref, address (JSON), items (JSON snapshot), wompi_data (JSON),
timestamps
```

### order_items
```
id, order_id (FK), product_id (FK), quantity, price, size, timestamps
```

### payments
```
id, order_id (FK), reference (unique), amount (int),
status (pending|approved|declined|voided), wompi_data (JSON), timestamps
```

### encargos
```
id, user_id (FK), marca, producto, talla, color, link_referencia,
presupuesto (int, COP), anticipo (int, COP),
status (pendiente|cotizado|aprobado|en_camino|entregado|cancelado),
notas_cliente, notas_admin, wa_link, timestamps
```

---

## API Endpoints

**Base:** `hauled-api.test/api/v1`
**Formato:** JSON. Autenticación: Bearer token (Sanctum). 🔒 = requiere auth.

### Auth
```
POST   /auth/register
POST   /auth/login
POST   /auth/logout        🔒
GET    /auth/me            🔒
```

### Productos
```
GET    /products           ?hauled_line=&category=&brand=&min_price=&max_price=&sort=&search=
GET    /products/featured
GET    /products/:slug
```

### Categorías y Marcas
```
GET    /categories
GET    /brands
```

### Pedidos
```
POST   /orders             🔒
GET    /orders             🔒
GET    /orders/:id         🔒
```

### Pagos
```
GET    /payments/verify/:ref   🔒
POST   /payments/webhook       (público, verificado con firma Wompi)
```

### Encargos
```
POST   /encargos           🔒
GET    /encargos           🔒
GET    /encargos/:id       🔒
```

### Perfil
```
PUT    /profile            🔒
PUT    /profile/password   🔒
```

---

## Flujo de Encargos (completo)

1. Cliente llena formulario en Nuxt `/encargos` o product page
2. Nuxt POST `/api/v1/encargos` → Laravel crea encargo `status: pendiente`
3. Filament muestra encargo nuevo en dashboard admin
4. Admin revisa, cotiza precio, guarda en `presupuesto` → `status: cotizado`
5. Laravel genera `wa_link` = `https://wa.me/57{numero}?text=...` con cotización pre-llenada
6. Nuxt muestra en perfil del cliente: "Encargo cotizado" + botón WhatsApp
7. Cliente habla con admin por WhatsApp, acuerdan pago
8. Admin actualiza status en Filament: `aprobado → en_camino → entregado`
9. Cliente ve tracking en tiempo real en `/profile` → tab Encargos

---

## Flujo de Pago Wompi

1. Cliente llena checkout en Nuxt
2. Nuxt POST `/api/v1/orders` → Laravel crea orden `status: pending`, genera referencia
3. Laravel devuelve URL de Wompi checkout
4. Nuxt redirige a Wompi
5. Wompi procesa pago → redirect a `/checkout/confirmacion?ref=XXX`
6. Nuxt GET `/api/v1/payments/verify/XXX` → Laravel consulta Wompi API → confirma estado
7. Si aprobado: orden `status: paid`, carrito limpio, mostrar confirmación
8. Wompi también llama al webhook POST `/api/v1/payments/webhook` → doble verificación

---

## Filament Admin Resources

- **ProductosResource** — CRUD completo con upload de imágenes
- **CategoriasResource** — árbol jerárquico
- **MarcasResource** — CRUD simple
- **PedidosResource** — tabla con filtros por estado, vista detalle
- **EncargosResource** — tabla con pipeline de estados, campo notas admin, generador wa_link
- **UsuariosResource** — lista usuarios, ver pedidos/encargos por usuario

---

## Módulos de Implementación (orden)

Cada módulo se construye y prueba completo antes de avanzar.

| # | Módulo | Incluye |
|---|--------|---------|
| 1 | **Setup Laravel** | Proyecto nuevo, Herd, MySQL, Sanctum, CORS, estructura |
| 2 | **Migraciones + Modelos** | Todas las tablas, Eloquent models, seeders |
| 3 | **Auth API** | Register, login, logout, /me — prueba con Postman |
| 4 | **Productos API** | CRUD read-only, filtros, featured — conectar Nuxt home y shop |
| 5 | **Filament Setup + Productos** | Panel admin, ProductosResource con upload |
| 6 | **Categorías y Marcas** | API + Filament resource |
| 7 | **Auth en Nuxt** | Login/register forms conectados a Laravel, Pinia auth store |
| 8 | **Pedidos + Checkout** | API pedidos, flujo Wompi completo, webhook, confirmación |
| 9 | **Encargos** | API + Filament resource + tracking en perfil Nuxt |
| 10 | **Perfil usuario** | Datos personales, historial pedidos, historial encargos |

---

## Decisiones Técnicas

- **No paginación compleja** para Fase 1 — máximo 50 productos, simple_paginate(12) suficiente
- **Precios en enteros (centavos)** — evita errores de flotante. $150.000 COP = 15000000 centavos
- **Images en JSON** en products — evita tabla pivot para catálogo pequeño
- **Sanctum SPA mode** — no cookies, tokens por header para máxima compatibilidad con Nuxt
- **Soft deletes** en products y users — nunca borrar datos reales
- **Sin queues** en Fase 1 — todo síncrono, suficiente para el volumen inicial
