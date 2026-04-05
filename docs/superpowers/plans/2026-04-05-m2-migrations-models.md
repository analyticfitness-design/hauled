# Módulo 2: Migraciones + Modelos — Plan de Implementación

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans

**Goal:** Crear todas las tablas de la BD y sus modelos Eloquent con relaciones, seeders con datos de prueba.

**Architecture:** 8 tablas. Modelos con relaciones HasMany/BelongsTo. Seeders para tener datos desde el día 1.

**Tech Stack:** Laravel Eloquent, MySQL 8, Faker (seeders)

---

### Task 1: Migraciones

**Files:**
- Create: `database/migrations/xxxx_create_categories_table.php`
- Create: `database/migrations/xxxx_create_brands_table.php`
- Create: `database/migrations/xxxx_create_products_table.php`
- Create: `database/migrations/xxxx_create_orders_table.php`
- Create: `database/migrations/xxxx_create_order_items_table.php`
- Create: `database/migrations/xxxx_create_payments_table.php`
- Create: `database/migrations/xxxx_create_encargos_table.php`
- Modify: `database/migrations/xxxx_create_users_table.php`

- [ ] **Step 1: Modificar migración de users (agregar campos HAULED)**

```bash
cd C:/Users/GODSF/Herd/hauled-api
```

Editar `database/migrations/0001_01_01_000000_create_users_table.php`, en el Schema::create de users agregar después de `$table->string('password')`:
```php
$table->string('phone')->nullable();
$table->json('address')->nullable();
$table->enum('role', ['admin', 'user'])->default('user');
```

- [ ] **Step 2: Crear migración de categories**

```bash
php artisan make:migration create_categories_table
```

Editar el archivo generado:
```php
public function up(): void
{
    Schema::create('categories', function (Blueprint $table) {
        $table->id();
        $table->string('name');
        $table->string('slug')->unique();
        $table->unsignedBigInteger('parent_id')->nullable();
        $table->string('image')->nullable();
        $table->timestamps();

        $table->foreign('parent_id')->references('id')->on('categories')->nullOnDelete();
    });
}
```

- [ ] **Step 3: Crear migración de brands**

```bash
php artisan make:migration create_brands_table
```

```php
public function up(): void
{
    Schema::create('brands', function (Blueprint $table) {
        $table->id();
        $table->string('name');
        $table->string('logo')->nullable();
        $table->timestamps();
    });
}
```

- [ ] **Step 4: Crear migración de products**

```bash
php artisan make:migration create_products_table
```

```php
public function up(): void
{
    Schema::create('products', function (Blueprint $table) {
        $table->id();
        $table->string('sku')->unique();
        $table->string('title');
        $table->string('slug')->unique();
        $table->text('description')->nullable();
        $table->unsignedInteger('price'); // centavos COP. $150.000 = 15000000
        $table->unsignedTinyInteger('discount')->default(0); // porcentaje
        $table->unsignedInteger('quantity')->default(0);
        $table->enum('status', ['in-stock', 'out-of-stock'])->default('in-stock');
        $table->enum('hauled_line', ['originals', 'basics', 'encargo'])->default('originals');
        $table->json('sizes')->nullable(); // ["S","M","L","XL"]
        $table->json('images')->nullable(); // [{color,img}]
        $table->boolean('featured')->default(false);
        $table->unsignedTinyInteger('advance_percent')->default(0); // para encargos
        $table->string('delivery_days')->nullable(); // "7-14 días hábiles"
        $table->unsignedInteger('sell_count')->default(0);
        $table->foreignId('category_id')->nullable()->constrained()->nullOnDelete();
        $table->foreignId('brand_id')->nullable()->constrained()->nullOnDelete();
        $table->softDeletes();
        $table->timestamps();
    });
}
```

- [ ] **Step 5: Crear migración de orders**

```bash
php artisan make:migration create_orders_table
```

```php
public function up(): void
{
    Schema::create('orders', function (Blueprint $table) {
        $table->id();
        $table->foreignId('user_id')->constrained()->cascadeOnDelete();
        $table->string('reference')->unique();
        $table->unsignedInteger('total'); // centavos COP
        $table->enum('status', ['pending','paid','shipped','delivered','cancelled'])->default('pending');
        $table->string('wompi_ref')->nullable();
        $table->json('address'); // snapshot dirección al momento de compra
        $table->json('wompi_data')->nullable(); // respuesta completa Wompi
        $table->timestamps();
    });
}
```

- [ ] **Step 6: Crear migración de order_items**

```bash
php artisan make:migration create_order_items_table
```

```php
public function up(): void
{
    Schema::create('order_items', function (Blueprint $table) {
        $table->id();
        $table->foreignId('order_id')->constrained()->cascadeOnDelete();
        $table->foreignId('product_id')->nullable()->constrained()->nullOnDelete();
        $table->unsignedSmallInteger('quantity');
        $table->unsignedInteger('price'); // precio al momento de compra (centavos)
        $table->string('size')->nullable();
        $table->string('product_title'); // snapshot nombre al momento de compra
        $table->timestamps();
    });
}
```

- [ ] **Step 7: Crear migración de payments**

```bash
php artisan make:migration create_payments_table
```

```php
public function up(): void
{
    Schema::create('payments', function (Blueprint $table) {
        $table->id();
        $table->foreignId('order_id')->constrained()->cascadeOnDelete();
        $table->string('reference')->unique();
        $table->unsignedInteger('amount'); // centavos COP
        $table->enum('status', ['pending','approved','declined','voided'])->default('pending');
        $table->json('wompi_data')->nullable();
        $table->timestamps();
    });
}
```

- [ ] **Step 8: Crear migración de encargos**

```bash
php artisan make:migration create_encargos_table
```

```php
public function up(): void
{
    Schema::create('encargos', function (Blueprint $table) {
        $table->id();
        $table->foreignId('user_id')->constrained()->cascadeOnDelete();
        $table->string('marca');
        $table->string('producto');
        $table->string('talla')->nullable();
        $table->string('color')->nullable();
        $table->string('link_referencia')->nullable();
        $table->unsignedInteger('presupuesto')->default(0); // COP centavos
        $table->unsignedInteger('anticipo')->default(0); // COP centavos
        $table->enum('status', [
            'pendiente',
            'cotizado',
            'aprobado',
            'en_camino',
            'entregado',
            'cancelado'
        ])->default('pendiente');
        $table->text('notas_cliente')->nullable();
        $table->text('notas_admin')->nullable();
        $table->string('wa_link')->nullable();
        $table->timestamps();
    });
}
```

- [ ] **Step 9: Ejecutar todas las migraciones**

```bash
php artisan migrate:fresh
```
Esperado: Todas las tablas creadas sin errores. Verificar en TablePlus que existen: `users, categories, brands, products, orders, order_items, payments, encargos, personal_access_tokens`.

---

### Task 2: Modelos Eloquent

**Files:**
- Modify: `app/Models/User.php`
- Create: `app/Models/Category.php`
- Create: `app/Models/Brand.php`
- Create: `app/Models/Product.php`
- Create: `app/Models/Order.php`
- Create: `app/Models/OrderItem.php`
- Create: `app/Models/Payment.php`
- Create: `app/Models/Encargo.php`

- [ ] **Step 1: Crear modelo Category**

```bash
php artisan make:model Category
```

Editar `app/Models/Category.php`:
```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Category extends Model
{
    protected $fillable = ['name', 'slug', 'parent_id', 'image'];

    public function parent(): BelongsTo
    {
        return $this->belongsTo(Category::class, 'parent_id');
    }

    public function children(): HasMany
    {
        return $this->hasMany(Category::class, 'parent_id');
    }

    public function products(): HasMany
    {
        return $this->hasMany(Product::class);
    }
}
```

- [ ] **Step 2: Crear modelo Brand**

```bash
php artisan make:model Brand
```

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Brand extends Model
{
    protected $fillable = ['name', 'logo'];

    public function products(): HasMany
    {
        return $this->hasMany(Product::class);
    }
}
```

- [ ] **Step 3: Crear modelo Product**

```bash
php artisan make:model Product
```

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'sku', 'title', 'slug', 'description', 'price', 'discount',
        'quantity', 'status', 'hauled_line', 'sizes', 'images',
        'featured', 'advance_percent', 'delivery_days', 'sell_count',
        'category_id', 'brand_id',
    ];

    protected function casts(): array
    {
        return [
            'sizes' => 'array',
            'images' => 'array',
            'featured' => 'boolean',
        ];
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function brand(): BelongsTo
    {
        return $this->belongsTo(Brand::class);
    }

    // Precio formateado en COP (para display)
    public function getPriceFormattedAttribute(): string
    {
        return '$' . number_format($this->price / 100, 0, ',', '.');
    }

    // Precio con descuento en centavos
    public function getFinalPriceAttribute(): int
    {
        if ($this->discount > 0) {
            return (int) ($this->price * (1 - $this->discount / 100));
        }
        return $this->price;
    }
}
```

- [ ] **Step 4: Crear modelo Order**

```bash
php artisan make:model Order
```

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Order extends Model
{
    protected $fillable = [
        'user_id', 'reference', 'total', 'status',
        'wompi_ref', 'address', 'wompi_data',
    ];

    protected function casts(): array
    {
        return [
            'address' => 'array',
            'wompi_data' => 'array',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function items(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }

    public function payment(): HasOne
    {
        return $this->hasOne(Payment::class);
    }
}
```

- [ ] **Step 5: Crear modelo OrderItem**

```bash
php artisan make:model OrderItem
```

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OrderItem extends Model
{
    protected $fillable = [
        'order_id', 'product_id', 'quantity', 'price', 'size', 'product_title',
    ];

    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }
}
```

- [ ] **Step 6: Crear modelo Payment**

```bash
php artisan make:model Payment
```

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Payment extends Model
{
    protected $fillable = [
        'order_id', 'reference', 'amount', 'status', 'wompi_data',
    ];

    protected function casts(): array
    {
        return [
            'wompi_data' => 'array',
        ];
    }

    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }
}
```

- [ ] **Step 7: Crear modelo Encargo**

```bash
php artisan make:model Encargo
```

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Encargo extends Model
{
    protected $fillable = [
        'user_id', 'marca', 'producto', 'talla', 'color',
        'link_referencia', 'presupuesto', 'anticipo', 'status',
        'notas_cliente', 'notas_admin', 'wa_link',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function getStatusLabelAttribute(): string
    {
        return match($this->status) {
            'pendiente'  => '⏳ Pendiente de revisión',
            'cotizado'   => '💬 Cotizado — revisa WhatsApp',
            'aprobado'   => '✅ Aprobado',
            'en_camino'  => '🚚 En camino',
            'entregado'  => '📦 Entregado',
            'cancelado'  => '❌ Cancelado',
            default      => $this->status,
        };
    }
}
```

- [ ] **Step 8: Actualizar User model con relaciones**

Agregar relaciones en `app/Models/User.php` (después de los casts):
```php
use Illuminate\Database\Eloquent\Relations\HasMany;

public function orders(): HasMany
{
    return $this->hasMany(Order::class);
}

public function encargos(): HasMany
{
    return $this->hasMany(Encargo::class);
}

public function isAdmin(): bool
{
    return $this->role === 'admin';
}
```

---

### Task 3: Seeders

**Files:**
- Create: `database/seeders/CategorySeeder.php`
- Create: `database/seeders/BrandSeeder.php`
- Create: `database/seeders/ProductSeeder.php`
- Create: `database/seeders/UserSeeder.php`
- Modify: `database/seeders/DatabaseSeeder.php`

- [ ] **Step 1: Crear UserSeeder**

```bash
php artisan make:seeder UserSeeder
```

```php
<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Admin
        User::create([
            'name' => 'Admin HAULED',
            'email' => 'admin@hauled.co',
            'password' => Hash::make('password'),
            'role' => 'admin',
            'phone' => '3000000000',
        ]);

        // Cliente de prueba
        User::create([
            'name' => 'Cliente Test',
            'email' => 'cliente@test.com',
            'password' => Hash::make('password'),
            'role' => 'user',
            'phone' => '3111111111',
            'address' => [
                'street' => 'Calle 10 # 20-30',
                'city' => 'Bogotá',
                'department' => 'Cundinamarca',
            ],
        ]);
    }
}
```

- [ ] **Step 2: Crear CategorySeeder**

```bash
php artisan make:seeder CategorySeeder
```

```php
<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categorias = [
            ['name' => 'Camisetas', 'slug' => 'camisetas', 'children' => ['Oversize', 'Básicas', 'Gráficas']],
            ['name' => 'Hoodies', 'slug' => 'hoodies', 'children' => ['Pullover', 'Zip-up', 'Cropped']],
            ['name' => 'Pantalones', 'slug' => 'pantalones', 'children' => ['Joggers', 'Cargo', 'Jeans']],
            ['name' => 'Shorts', 'slug' => 'shorts', 'children' => ['Athletic', 'Casual']],
            ['name' => 'Accesorios', 'slug' => 'accesorios', 'children' => ['Gorras', 'Medias', 'Bolsos']],
        ];

        foreach ($categorias as $cat) {
            $parent = Category::create([
                'name' => $cat['name'],
                'slug' => $cat['slug'],
            ]);

            foreach ($cat['children'] as $child) {
                Category::create([
                    'name' => $child,
                    'slug' => \Str::slug($child),
                    'parent_id' => $parent->id,
                ]);
            }
        }
    }
}
```

- [ ] **Step 3: Crear BrandSeeder**

```bash
php artisan make:seeder BrandSeeder
```

```php
<?php

namespace Database\Seeders;

use App\Models\Brand;
use Illuminate\Database\Seeder;

class BrandSeeder extends Seeder
{
    public function run(): void
    {
        $brands = ['Nike', 'Adidas', 'Gap', 'Tommy Hilfiger', 'Jordan', 'Polo Ralph Lauren', 'Under Armour', 'HAULED'];

        foreach ($brands as $name) {
            Brand::create(['name' => $name]);
        }
    }
}
```

- [ ] **Step 4: Crear ProductSeeder**

```bash
php artisan make:seeder ProductSeeder
```

```php
<?php

namespace Database\Seeders;

use App\Models\Brand;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $nike = Brand::where('name', 'Nike')->first();
        $gap = Brand::where('name', 'Gap')->first();
        $tommy = Brand::where('name', 'Tommy Hilfiger')->first();
        $hauled = Brand::where('name', 'HAULED')->first();

        $camisetas = Category::where('slug', 'camisetas')->first();
        $hoodies = Category::where('slug', 'hoodies')->first();

        Product::create([
            'sku' => 'HO-NK-TEE-001',
            'title' => 'Nike Essentials Tee — Outlet USA',
            'slug' => 'nike-essentials-tee-outlet-usa',
            'description' => 'Camiseta Nike original traída de outlets USA. 100% algodón, fit regular.',
            'price' => 18000000, // $180.000 COP en centavos
            'discount' => 0,
            'quantity' => 4,
            'status' => 'in-stock',
            'hauled_line' => 'originals',
            'sizes' => ['S', 'M', 'L', 'XL'],
            'images' => [
                ['color' => ['name' => 'Negro', 'clrCode' => '#111111'], 'img' => '/storage/products/nike-tee-black.jpg'],
            ],
            'featured' => true,
            'sell_count' => 12,
            'category_id' => $camisetas->id,
            'brand_id' => $nike->id,
        ]);

        Product::create([
            'sku' => 'HO-GAP-HOD-001',
            'title' => 'Gap Classic Hoodie — Outlet USA',
            'slug' => 'gap-classic-hoodie-outlet-usa',
            'description' => 'Hoodie Gap original, tela pesada, interior felpa. Traído directo de outlet USA.',
            'price' => 28000000, // $280.000 COP
            'discount' => 10,
            'quantity' => 3,
            'status' => 'in-stock',
            'hauled_line' => 'originals',
            'sizes' => ['S', 'M', 'L'],
            'images' => [
                ['color' => ['name' => 'Gris', 'clrCode' => '#888888'], 'img' => '/storage/products/gap-hoodie-grey.jpg'],
            ],
            'featured' => true,
            'sell_count' => 8,
            'category_id' => $hoodies->id,
            'brand_id' => $gap->id,
        ]);

        Product::create([
            'sku' => 'HB-HAU-TEE-001',
            'title' => 'HAULED Basic Tee',
            'slug' => 'hauled-basic-tee',
            'description' => 'Camiseta básica con tag HAULED. Perfecta para el día a día.',
            'price' => 8500000, // $85.000 COP
            'discount' => 0,
            'quantity' => 20,
            'status' => 'in-stock',
            'hauled_line' => 'basics',
            'sizes' => ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
            'images' => [
                ['color' => ['name' => 'Blanco', 'clrCode' => '#ffffff'], 'img' => '/storage/products/hauled-tee-white.jpg'],
                ['color' => ['name' => 'Negro', 'clrCode' => '#111111'], 'img' => '/storage/products/hauled-tee-black.jpg'],
            ],
            'featured' => false,
            'sell_count' => 35,
            'category_id' => $camisetas->id,
            'brand_id' => $hauled->id,
        ]);

        Product::create([
            'sku' => 'HE-ENC-001',
            'title' => 'Encargo USA — Tú eliges',
            'slug' => 'encargo-usa-tu-eliges',
            'description' => 'Pide cualquier prenda de USA. Nike, Jordan, Gap, Tommy y más. Nosotros la traemos.',
            'price' => 0,
            'discount' => 0,
            'quantity' => 999,
            'status' => 'in-stock',
            'hauled_line' => 'encargo',
            'sizes' => [],
            'images' => [],
            'featured' => true,
            'advance_percent' => 50,
            'delivery_days' => '15-21 días hábiles',
            'sell_count' => 0,
            'category_id' => null,
            'brand_id' => null,
        ]);
    }
}
```

- [ ] **Step 5: Actualizar DatabaseSeeder**

Editar `database/seeders/DatabaseSeeder.php`:
```php
<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            CategorySeeder::class,
            BrandSeeder::class,
            ProductSeeder::class,
        ]);
    }
}
```

- [ ] **Step 6: Ejecutar seeders**

```bash
php artisan migrate:fresh --seed
```
Esperado: Sin errores. Verificar en TablePlus:
- `users`: 2 registros
- `categories`: ~15 registros (5 padres + hijos)
- `brands`: 8 registros
- `products`: 4 registros

- [ ] **Step 7: Commit**

```bash
git add .
git commit -m "feat: migraciones, modelos Eloquent y seeders completos"
```

---

### Verificación Final del Módulo 2

- [ ] `php artisan migrate:fresh --seed` sin errores
- [ ] Tinker: `App\Models\Product::count()` → 4
- [ ] Tinker: `App\Models\User::first()->role` → 'admin'
- [ ] Tinker: `App\Models\Category::whereNull('parent_id')->count()` → 5
- [ ] Relaciones funcionan: `App\Models\Product::first()->category->name` → 'Camisetas'

```bash
php artisan tinker
# Ejecutar los comandos anteriores
```

**Módulo 2 completado. Avanzar a Módulo 3.**
