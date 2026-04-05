# Módulo 1: Setup Laravel — Plan de Implementación

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans

**Goal:** Crear el proyecto Laravel 11 en Herd, configurar MySQL, Sanctum, CORS y verificar que `hauled-api.test` responde.

**Architecture:** Laravel 11 en `C:/Users/GODSF/Herd/hauled-api/`. Herd lo sirve automáticamente como `hauled-api.test`. MySQL de Herd como BD local.

**Tech Stack:** Laravel 11, Sanctum, fruitcake/laravel-cors (incluido en Laravel), MySQL 8

---

### Task 1: Crear proyecto Laravel

**Files:**
- Create: `C:/Users/GODSF/Herd/hauled-api/` (proyecto completo)

- [ ] **Step 1: Crear el proyecto Laravel 11**

Ejecutar en terminal (desde cualquier directorio):
```bash
cd C:/Users/GODSF/Herd
composer create-project laravel/laravel hauled-api
```
Esperar a que termine (~2 minutos).

- [ ] **Step 2: Verificar que Herd detecta el sitio**

Abrir navegador en `http://hauled-api.test`
Esperado: Página de bienvenida de Laravel ("Laravel" con logo)

- [ ] **Step 3: Verificar versión de Laravel**

```bash
cd C:/Users/GODSF/Herd/hauled-api
php artisan --version
```
Esperado: `Laravel Framework 11.x.x`

---

### Task 2: Configurar MySQL local

**Files:**
- Modify: `C:/Users/GODSF/Herd/hauled-api/.env`

- [ ] **Step 1: Crear la base de datos en MySQL de Herd**

Abrir Herd → Database → Open en TablePlus o similar.
O ejecutar en terminal:
```bash
"C:/Users/GODSF/Herd/bin/mysql" -u root -e "CREATE DATABASE hauled_local CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
```

- [ ] **Step 2: Configurar .env**

Abrir `C:/Users/GODSF/Herd/hauled-api/.env` y actualizar estas líneas:
```env
APP_NAME=HauledAPI
APP_ENV=local
APP_KEY=  # se genera en siguiente paso
APP_DEBUG=true
APP_URL=http://hauled-api.test

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=hauled_local
DB_USERNAME=root
DB_PASSWORD=

FRONTEND_URL=http://hauled.test
```

- [ ] **Step 3: Generar APP_KEY**

```bash
cd C:/Users/GODSF/Herd/hauled-api
php artisan key:generate
```
Esperado: `Application key set successfully.`

- [ ] **Step 4: Probar conexión a BD**

```bash
php artisan migrate
```
Esperado: Tablas `users`, `password_reset_tokens`, `sessions`, `cache`, `jobs` creadas sin errores.

---

### Task 3: Instalar y configurar Sanctum

**Files:**
- Modify: `C:/Users/GODSF/Herd/hauled-api/config/sanctum.php`
- Modify: `C:/Users/GODSF/Herd/hauled-api/app/Models/User.php`
- Modify: `C:/Users/GODSF/Herd/hauled-api/bootstrap/app.php`

- [ ] **Step 1: Instalar Sanctum**

```bash
cd C:/Users/GODSF/Herd/hauled-api
composer require laravel/sanctum
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
php artisan migrate
```
Esperado: Tabla `personal_access_tokens` creada.

- [ ] **Step 2: Agregar HasApiTokens al modelo User**

Editar `app/Models/User.php`:
```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'phone',
        'address',
        'role',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'address' => 'array',
        ];
    }
}
```

- [ ] **Step 3: Registrar middleware Sanctum en bootstrap/app.php**

En `bootstrap/app.php` agregar dentro del `->withMiddleware`:
```php
->withMiddleware(function (Middleware $middleware) {
    $middleware->statefulApi();
})
```

---

### Task 4: Configurar CORS

**Files:**
- Modify: `C:/Users/GODSF/Herd/hauled-api/config/cors.php`

- [ ] **Step 1: Publicar config de CORS**

```bash
php artisan config:publish cors
```

- [ ] **Step 2: Configurar cors.php**

Editar `config/cors.php`:
```php
<?php

return [
    'paths' => ['api/*', 'sanctum/csrf-cookie'],

    'allowed_methods' => ['*'],

    'allowed_origins' => [
        'http://hauled.test',
        'http://localhost:3000',
    ],

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => true,
];
```

---

### Task 5: Crear estructura de rutas API

**Files:**
- Create: `C:/Users/GODSF/Herd/hauled-api/routes/api.php`

- [ ] **Step 1: Crear routes/api.php con estructura base**

```php
<?php

use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {

    // Health check
    Route::get('/health', function () {
        return response()->json([
            'status' => 'ok',
            'app' => config('app.name'),
            'version' => '1.0.0',
        ]);
    });

    // Auth (se implementa en Módulo 3)
    // Productos (se implementa en Módulo 4)
    // Pedidos (se implementa en Módulo 8)
    // Encargos (se implementa en Módulo 9)
});
```

- [ ] **Step 2: Registrar routes/api.php en bootstrap/app.php**

En `bootstrap/app.php`, dentro de `->withRouting`:
```php
->withRouting(
    web: __DIR__.'/../routes/web.php',
    api: __DIR__.'/../routes/api.php',
    commands: __DIR__.'/../routes/console.php',
    health: '/up',
)
```

- [ ] **Step 3: Verificar el endpoint de health**

```bash
curl http://hauled-api.test/api/v1/health
```
Esperado:
```json
{"status":"ok","app":"HauledAPI","version":"1.0.0"}
```

- [ ] **Step 4: Commit**

```bash
cd C:/Users/GODSF/Herd/hauled-api
git init
git add .
git commit -m "feat: setup inicial Laravel 11 + Sanctum + CORS + routes API"
```

---

### Verificación Final del Módulo 1

- [ ] `http://hauled-api.test` → Página Laravel OK
- [ ] `http://hauled-api.test/api/v1/health` → JSON `{"status":"ok"}`
- [ ] `php artisan migrate:status` → Todas las migraciones `Ran`
- [ ] Sin errores en `php artisan config:cache`

**Módulo 1 completado. Avanzar a Módulo 2.**
