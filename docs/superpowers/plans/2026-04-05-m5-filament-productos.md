# Módulo 5: Filament + Admin Productos — Plan de Implementación

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans

**Goal:** Panel admin Filament 3 funcionando en `hauled-api.test/admin` con CRUD completo de productos, incluyendo upload de imágenes.

**Architecture:** Filament 3 instalado en el proyecto Laravel. Un AdminPanelProvider y un resource por modelo (Productos, Categorías, Marcas en este módulo).

**Tech Stack:** Filament 3, Laravel Storage (local disk)

---

### Task 1: Instalar Filament

**Files:**
- Modify: `composer.json` (via composer)
- Create: `app/Providers/Filament/AdminPanelProvider.php`

- [ ] **Step 1: Instalar Filament 3**

```bash
cd C:/Users/GODSF/Herd/hauled-api
composer require filament/filament:"^3.3" -W
php artisan filament:install --panels
```

Cuando pregunte el ID del panel: escribir `admin`
Cuando pregunte si crear usuario: escribir `no` (ya tenemos uno en el seeder)

- [ ] **Step 2: Verificar instalación**

Abrir `http://hauled-api.test/admin`
Esperado: Pantalla de login de Filament.

- [ ] **Step 3: Configurar qué usuarios pueden entrar al admin**

En `app/Models/User.php`, implementar la interfaz `FilamentUser`:
```php
use Filament\Models\Contracts\FilamentUser;
use Filament\Panel;

class User extends Authenticatable implements FilamentUser
{
    // ... código existente ...

    public function canAccessPanel(Panel $panel): bool
    {
        return $this->role === 'admin';
    }
}
```

- [ ] **Step 4: Login en Filament**

Ir a `http://hauled-api.test/admin`
Login con: `admin@hauled.co` / `password`
Esperado: Dashboard vacío de Filament (sin recursos todavía).

---

### Task 2: Configurar Storage para imágenes

**Files:**
- Modify: `.env`
- Modify: `config/filesystems.php`

- [ ] **Step 1: Configurar disco local público**

En `.env` de Laravel:
```env
FILESYSTEM_DISK=public
```

- [ ] **Step 2: Crear symlink de storage**

```bash
php artisan storage:link
```
Esperado: `The [public/storage] link has been connected to [storage/app/public].`

- [ ] **Step 3: Crear carpeta de productos**

```bash
mkdir -p storage/app/public/products
```

---

### Task 3: ProductResource en Filament

**Files:**
- Create: `app/Filament/Resources/ProductResource.php`
- Create: `app/Filament/Resources/ProductResource/Pages/ListProducts.php`
- Create: `app/Filament/Resources/ProductResource/Pages/CreateProduct.php`
- Create: `app/Filament/Resources/ProductResource/Pages/EditProduct.php`

- [ ] **Step 1: Generar ProductResource**

```bash
php artisan make:filament-resource Product --generate
```

- [ ] **Step 2: Reemplazar el contenido de ProductResource.php**

Editar `app/Filament/Resources/ProductResource.php`:
```php
<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ProductResource\Pages;
use App\Models\Brand;
use App\Models\Category;
use App\Models\Product;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Support\Str;

class ProductResource extends Resource
{
    protected static ?string $model = Product::class;
    protected static ?string $navigationIcon = 'heroicon-o-shopping-bag';
    protected static ?string $navigationLabel = 'Productos';
    protected static ?string $modelLabel = 'Producto';
    protected static ?string $pluralModelLabel = 'Productos';
    protected static ?int $navigationSort = 1;

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Section::make('Información Principal')->schema([
                Forms\Components\TextInput::make('title')
                    ->label('Nombre del producto')
                    ->required()
                    ->maxLength(255)
                    ->live(onBlur: true)
                    ->afterStateUpdated(fn($state, callable $set) =>
                        $set('slug', Str::slug($state))
                    ),

                Forms\Components\TextInput::make('slug')
                    ->label('Slug (URL)')
                    ->required()
                    ->unique(Product::class, 'slug', ignoreRecord: true),

                Forms\Components\TextInput::make('sku')
                    ->label('SKU')
                    ->required()
                    ->unique(Product::class, 'sku', ignoreRecord: true),

                Forms\Components\Textarea::make('description')
                    ->label('Descripción')
                    ->rows(4)
                    ->columnSpanFull(),
            ])->columns(2),

            Forms\Components\Section::make('Precio y Stock')->schema([
                Forms\Components\TextInput::make('price')
                    ->label('Precio (centavos COP). $150.000 = 15000000')
                    ->required()
                    ->numeric()
                    ->minValue(0),

                Forms\Components\TextInput::make('discount')
                    ->label('Descuento (%)')
                    ->numeric()
                    ->minValue(0)
                    ->maxValue(100)
                    ->default(0),

                Forms\Components\TextInput::make('quantity')
                    ->label('Stock disponible')
                    ->required()
                    ->numeric()
                    ->minValue(0),

                Forms\Components\Select::make('status')
                    ->label('Estado')
                    ->options([
                        'in-stock' => 'En stock',
                        'out-of-stock' => 'Agotado',
                    ])
                    ->default('in-stock')
                    ->required(),
            ])->columns(2),

            Forms\Components\Section::make('Línea HAULED')->schema([
                Forms\Components\Select::make('hauled_line')
                    ->label('Línea')
                    ->options([
                        'originals' => '🇺🇸 HAULED Originals (stock USA)',
                        'basics' => 'HAULED Basics (private label)',
                        'encargo' => '📦 Encargo bajo demanda',
                    ])
                    ->required()
                    ->default('originals')
                    ->live(),

                Forms\Components\TextInput::make('advance_percent')
                    ->label('% Anticipo (solo encargos)')
                    ->numeric()
                    ->minValue(0)
                    ->maxValue(100)
                    ->default(0)
                    ->visible(fn($get) => $get('hauled_line') === 'encargo'),

                Forms\Components\TextInput::make('delivery_days')
                    ->label('Tiempo de entrega (solo encargos)')
                    ->placeholder('ej: 15-21 días hábiles')
                    ->visible(fn($get) => $get('hauled_line') === 'encargo'),

                Forms\Components\Toggle::make('featured')
                    ->label('Producto destacado (aparece en home)')
                    ->default(false),
            ])->columns(2),

            Forms\Components\Section::make('Categoría y Marca')->schema([
                Forms\Components\Select::make('category_id')
                    ->label('Categoría')
                    ->options(Category::whereNull('parent_id')->pluck('name', 'id'))
                    ->searchable()
                    ->nullable(),

                Forms\Components\Select::make('brand_id')
                    ->label('Marca')
                    ->options(Brand::pluck('name', 'id'))
                    ->searchable()
                    ->nullable(),
            ])->columns(2),

            Forms\Components\Section::make('Tallas e Imágenes')->schema([
                Forms\Components\TagsInput::make('sizes')
                    ->label('Tallas disponibles')
                    ->placeholder('Agregar talla (S, M, L, XL...)')
                    ->separator(','),

                Forms\Components\FileUpload::make('main_image')
                    ->label('Imagen principal')
                    ->image()
                    ->disk('public')
                    ->directory('products')
                    ->imageEditor()
                    ->columnSpanFull(),
            ])->columns(2),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('sku')
                    ->label('SKU')
                    ->searchable()
                    ->sortable(),

                Tables\Columns\TextColumn::make('title')
                    ->label('Producto')
                    ->searchable()
                    ->limit(40),

                Tables\Columns\BadgeColumn::make('hauled_line')
                    ->label('Línea')
                    ->colors([
                        'warning' => 'originals',
                        'success' => 'basics',
                        'info' => 'encargo',
                    ]),

                Tables\Columns\TextColumn::make('price')
                    ->label('Precio')
                    ->formatStateUsing(fn($state) => '$' . number_format($state / 100, 0, ',', '.')),

                Tables\Columns\TextColumn::make('quantity')
                    ->label('Stock')
                    ->sortable(),

                Tables\Columns\BadgeColumn::make('status')
                    ->label('Estado')
                    ->colors([
                        'success' => 'in-stock',
                        'danger' => 'out-of-stock',
                    ]),

                Tables\Columns\IconColumn::make('featured')
                    ->label('Destacado')
                    ->boolean(),

                Tables\Columns\TextColumn::make('sell_count')
                    ->label('Vendidos')
                    ->sortable(),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('hauled_line')
                    ->label('Línea')
                    ->options([
                        'originals' => 'Originals',
                        'basics' => 'Basics',
                        'encargo' => 'Encargo',
                    ]),

                Tables\Filters\SelectFilter::make('status')
                    ->label('Estado')
                    ->options([
                        'in-stock' => 'En stock',
                        'out-of-stock' => 'Agotado',
                    ]),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListProducts::route('/'),
            'create' => Pages\CreateProduct::route('/create'),
            'edit' => Pages\EditProduct::route('/{record}/edit'),
        ];
    }
}
```

- [ ] **Step 3: Verificar ProductResource en el admin**

1. Ir a `http://hauled-api.test/admin/products`
2. Debe mostrar los 4 productos del seeder en tabla
3. Hacer clic en "Nuevo Producto" → verificar que el formulario carga
4. Editar el Nike Tee → cambiar featured a true → guardar
5. Verificar que `GET /api/v1/products/featured` devuelve el producto actualizado

---

### Task 4: Commit y verificación

- [ ] **Step 1: Commit**

```bash
cd C:/Users/GODSF/Herd/hauled-api
git add .
git commit -m "feat: Filament 3 instalado + ProductResource con CRUD y filtros"
```

---

### Verificación Final del Módulo 5

- [ ] `http://hauled-api.test/admin` → Login de Filament
- [ ] Login con `admin@hauled.co` / `password` → Dashboard
- [ ] `http://hauled-api.test/admin/products` → Lista de 4 productos
- [ ] Crear nuevo producto desde Filament → aparece en `GET /api/v1/products`
- [ ] Editar producto → cambios se reflejan en API
- [ ] Usuario con `role=user` NO puede acceder al admin (401/403)

**Módulo 5 completado. Avanzar a Módulo 6.**
