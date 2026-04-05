# Módulo 4: Productos API — Plan de Implementación

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans

**Goal:** Endpoints de productos (listado con filtros, detalle, featured) funcionando y conectados al frontend Nuxt — home y shop cargan datos reales de Laravel.

**Architecture:** ProductController (read-only), ProductResource para formato JSON, filtros por query params. Nuxt reemplaza el array estático product-data.ts con llamadas $fetch a la API.

**Tech Stack:** Laravel Eloquent + API Resources, Nuxt $fetch, Pinia store actualizado

---

### Task 1: ProductResource

**Files:**
- Create: `app/Http/Resources/ProductResource.php`
- Create: `app/Http/Resources/ProductCollection.php`

- [ ] **Step 1: Crear ProductResource**

```bash
cd C:/Users/GODSF/Herd/hauled-api
php artisan make:resource ProductResource
```

Editar `app/Http/Resources/ProductResource.php`:
```php
<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'sku' => $this->sku,
            'title' => $this->title,
            'slug' => $this->slug,
            'description' => $this->description,
            'price' => $this->price,
            'price_formatted' => $this->price_formatted,
            'discount' => $this->discount,
            'final_price' => $this->final_price,
            'quantity' => $this->quantity,
            'status' => $this->status,
            'hauled_line' => $this->hauled_line,
            'sizes' => $this->sizes ?? [],
            'images' => $this->images ?? [],
            'featured' => $this->featured,
            'advance_percent' => $this->advance_percent,
            'delivery_days' => $this->delivery_days,
            'sell_count' => $this->sell_count,
            'category' => $this->whenLoaded('category', fn() => [
                'id' => $this->category->id,
                'name' => $this->category->name,
                'slug' => $this->category->slug,
            ]),
            'brand' => $this->whenLoaded('brand', fn() => [
                'id' => $this->brand->id,
                'name' => $this->brand->name,
            ]),
        ];
    }
}
```

---

### Task 2: ProductController

**Files:**
- Create: `app/Http/Controllers/Api/ProductController.php`

- [ ] **Step 1: Crear ProductController**

```bash
php artisan make:controller Api/ProductController
```

Editar `app/Http/Controllers/Api/ProductController.php`:
```php
<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Product::with(['category', 'brand']);

        // Filtro por línea HAULED
        if ($request->filled('hauled_line')) {
            $query->where('hauled_line', $request->hauled_line);
        }

        // Filtro por categoría (slug)
        if ($request->filled('category')) {
            $query->whereHas('category', fn($q) =>
                $q->where('slug', $request->category)
            );
        }

        // Filtro por marca (nombre)
        if ($request->filled('brand')) {
            $query->whereHas('brand', fn($q) =>
                $q->where('name', 'like', '%' . $request->brand . '%')
            );
        }

        // Filtro por rango de precio (centavos)
        if ($request->filled('min_price')) {
            $query->where('price', '>=', (int) $request->min_price);
        }
        if ($request->filled('max_price')) {
            $query->where('price', '<=', (int) $request->max_price);
        }

        // Filtro por status
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        // Búsqueda por texto
        if ($request->filled('search')) {
            $query->where('title', 'like', '%' . $request->search . '%');
        }

        // Ordenamiento
        match ($request->get('sort', 'default')) {
            'price_asc'    => $query->orderBy('price', 'asc'),
            'price_desc'   => $query->orderBy('price', 'desc'),
            'new_added'    => $query->orderBy('created_at', 'desc'),
            'on_sale'      => $query->where('discount', '>', 0)->orderBy('discount', 'desc'),
            'best_selling' => $query->orderBy('sell_count', 'desc'),
            default        => $query->orderBy('id', 'asc'),
        };

        $products = $query->paginate(12);

        return response()->json([
            'data' => ProductResource::collection($products),
            'meta' => [
                'total' => $products->total(),
                'per_page' => $products->perPage(),
                'current_page' => $products->currentPage(),
                'last_page' => $products->lastPage(),
            ],
        ]);
    }

    public function show(string $slug): JsonResponse
    {
        $product = Product::with(['category', 'brand'])
            ->where('slug', $slug)
            ->firstOrFail();

        return response()->json([
            'data' => new ProductResource($product),
        ]);
    }

    public function featured(): JsonResponse
    {
        $products = Product::with(['category', 'brand'])
            ->where('featured', true)
            ->where('status', 'in-stock')
            ->orderBy('sell_count', 'desc')
            ->limit(8)
            ->get();

        return response()->json([
            'data' => ProductResource::collection($products),
        ]);
    }
}
```

---

### Task 3: Rutas de Productos

**Files:**
- Modify: `routes/api.php`

- [ ] **Step 1: Agregar rutas de productos**

```php
<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ProductController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {

    Route::get('/health', function () {
        return response()->json(['status' => 'ok', 'app' => config('app.name'), 'version' => '1.0.0']);
    });

    // Auth
    Route::prefix('auth')->group(function () {
        Route::post('/register', [AuthController::class, 'register']);
        Route::post('/login', [AuthController::class, 'login']);
        Route::middleware('auth:sanctum')->group(function () {
            Route::post('/logout', [AuthController::class, 'logout']);
            Route::get('/me', [AuthController::class, 'me']);
        });
    });

    // Productos (públicos)
    Route::get('/products', [ProductController::class, 'index']);
    Route::get('/products/featured', [ProductController::class, 'featured']);
    Route::get('/products/{slug}', [ProductController::class, 'show']);

});
```

- [ ] **Step 2: Verificar endpoints con curl**

```bash
# Todos los productos
curl "http://hauled-api.test/api/v1/products" -H "Accept: application/json"

# Solo originals
curl "http://hauled-api.test/api/v1/products?hauled_line=originals" -H "Accept: application/json"

# Featured
curl "http://hauled-api.test/api/v1/products/featured" -H "Accept: application/json"

# Detalle por slug
curl "http://hauled-api.test/api/v1/products/nike-essentials-tee-outlet-usa" -H "Accept: application/json"
```

Esperado: JSON con `data` array, cada producto con todos los campos incluyendo `category` y `brand` cargados.

---

### Task 4: Categorías y Marcas API (endpoints básicos)

**Files:**
- Create: `app/Http/Controllers/Api/CategoryController.php`
- Create: `app/Http/Controllers/Api/BrandController.php`
- Modify: `routes/api.php`

- [ ] **Step 1: Crear CategoryController**

```bash
php artisan make:controller Api/CategoryController
```

```php
<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\JsonResponse;

class CategoryController extends Controller
{
    public function index(): JsonResponse
    {
        $categories = Category::whereNull('parent_id')
            ->with('children')
            ->get()
            ->map(fn($cat) => [
                'id' => $cat->id,
                'name' => $cat->name,
                'slug' => $cat->slug,
                'image' => $cat->image,
                'children' => $cat->children->map(fn($child) => [
                    'id' => $child->id,
                    'name' => $child->name,
                    'slug' => $child->slug,
                ]),
            ]);

        return response()->json(['data' => $categories]);
    }
}
```

- [ ] **Step 2: Crear BrandController**

```bash
php artisan make:controller Api/BrandController
```

```php
<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Brand;
use Illuminate\Http\JsonResponse;

class BrandController extends Controller
{
    public function index(): JsonResponse
    {
        $brands = Brand::select('id', 'name', 'logo')->get();
        return response()->json(['data' => $brands]);
    }
}
```

- [ ] **Step 3: Agregar rutas en api.php**

Agregar al grupo v1 en `routes/api.php`:
```php
// Categorías y marcas (públicos)
Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/brands', [BrandController::class, 'index']);
```

Y agregar el import al tope del archivo:
```php
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\BrandController;
```

---

### Task 5: Conectar Nuxt al backend

**Files:**
- Create: `C:/Users/GODSF/Herd/Hauled/app/composables/useApi.ts`
- Modify: `C:/Users/GODSF/Herd/Hauled/.env`
- Modify: `C:/Users/GODSF/Herd/Hauled/nuxt.config.ts`
- Modify: `C:/Users/GODSF/Herd/Hauled/app/pinia/useProductFilterStore.ts`
- Modify: `C:/Users/GODSF/Herd/Hauled/app/components/hauled/HauledFeatured.vue`

- [ ] **Step 1: Agregar API_URL al .env de Nuxt**

Editar `C:/Users/GODSF/Herd/Hauled/.env`:
```env
APP_URL=http://localhost:3000
WOMPI_PUBLIC_KEY=pub_test_XXXXXXXX
WOMPI_SECRET_KEY=prv_test_XXXXXXXX
WHATSAPP_NUMBER=573000000000
API_BASE_URL=http://hauled-api.test/api/v1
```

- [ ] **Step 2: Exponer API_BASE_URL en nuxt.config.ts**

En `nuxt.config.ts`, dentro de `runtimeConfig.public`:
```typescript
public: {
  wompiPublicKey: process.env.WOMPI_PUBLIC_KEY ?? 'pub_test_XXXXXXXX',
  appUrl: process.env.APP_URL ?? 'http://localhost:3000',
  whatsappNumber: process.env.WHATSAPP_NUMBER ?? '573000000000',
  apiBaseUrl: process.env.API_BASE_URL ?? 'http://hauled-api.test/api/v1',
},
```

- [ ] **Step 3: Crear composable useApi.ts**

Crear `app/composables/useApi.ts`:
```typescript
export const useApi = () => {
  const config = useRuntimeConfig()
  const baseURL = config.public.apiBaseUrl

  const apiFetch = <T>(url: string, options: Record<string, any> = {}) => {
    return $fetch<T>(`${baseURL}${url}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    })
  }

  return { apiFetch, baseURL }
}
```

- [ ] **Step 4: Actualizar HauledFeatured.vue para cargar desde API**

Editar `app/components/hauled/HauledFeatured.vue`, reemplazar el import estático por:
```typescript
<script setup lang="ts">
const { apiFetch } = useApi()

const { data: featuredData } = await useAsyncData('featured-products', () =>
  apiFetch<{ data: any[] }>('/products/featured')
)

const products = computed(() => featuredData.value?.data ?? [])
</script>
```

- [ ] **Step 5: Verificar en el navegador**

1. Correr Nuxt: `cd C:/Users/GODSF/Herd/Hauled && npm run dev`
2. Abrir `http://localhost:3000`
3. La sección HauledFeatured debe mostrar los 4 productos del seeder (Nike Tee, Gap Hoodie, HAULED Basic, Encargo)
4. Abrir DevTools → Network → verificar que hay request a `hauled-api.test/api/v1/products/featured`

- [ ] **Step 6: Commit en ambos proyectos**

```bash
# Laravel
cd C:/Users/GODSF/Herd/hauled-api
git add .
git commit -m "feat: productos API completa con filtros, detalle, featured, categorias y marcas"

# Nuxt
cd C:/Users/GODSF/Herd/Hauled
git add .
git commit -m "feat: conectar Nuxt a API Laravel - composable useApi + HauledFeatured desde backend"
```

---

### Verificación Final del Módulo 4

- [ ] `GET /api/v1/products` → JSON con productos paginados (meta.total = 4)
- [ ] `GET /api/v1/products?hauled_line=originals` → Solo originals (2 productos)
- [ ] `GET /api/v1/products/featured` → Productos con featured=true
- [ ] `GET /api/v1/products/nike-essentials-tee-outlet-usa` → Detalle completo
- [ ] `GET /api/v1/categories` → 5 categorías padre con children
- [ ] `GET /api/v1/brands` → 8 marcas
- [ ] Home de Nuxt carga productos reales desde la API

**Módulo 4 completado. Avanzar a Módulo 5.**
