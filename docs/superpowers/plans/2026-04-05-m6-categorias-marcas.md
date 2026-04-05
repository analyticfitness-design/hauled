# Módulo 6: Categorías + Marcas (Filament) — Plan de Implementación

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans

**Goal:** Filament resources para categorías y marcas. Nuxt shop sidebar filtra usando datos reales de la API.

**Architecture:** Dos resources simples en Filament. Nuxt actualiza el sidebar de filtros para cargar categorías y marcas desde la API en lugar de datos hardcodeados.

**Tech Stack:** Filament 3, Nuxt $fetch

---

### Task 1: CategoryResource en Filament

**Files:**
- Create: `app/Filament/Resources/CategoryResource.php`

- [ ] **Step 1: Generar CategoryResource**

```bash
cd C:/Users/GODSF/Herd/hauled-api
php artisan make:filament-resource Category --generate
```

- [ ] **Step 2: Reemplazar contenido de CategoryResource.php**

```php
<?php

namespace App\Filament\Resources;

use App\Filament\Resources\CategoryResource\Pages;
use App\Models\Category;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Support\Str;

class CategoryResource extends Resource
{
    protected static ?string $model = Category::class;
    protected static ?string $navigationIcon = 'heroicon-o-tag';
    protected static ?string $navigationLabel = 'Categorías';
    protected static ?string $modelLabel = 'Categoría';
    protected static ?string $pluralModelLabel = 'Categorías';
    protected static ?int $navigationSort = 2;

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\TextInput::make('name')
                ->label('Nombre')
                ->required()
                ->maxLength(255)
                ->live(onBlur: true)
                ->afterStateUpdated(fn($state, callable $set) =>
                    $set('slug', Str::slug($state))
                ),

            Forms\Components\TextInput::make('slug')
                ->label('Slug')
                ->required()
                ->unique(Category::class, 'slug', ignoreRecord: true),

            Forms\Components\Select::make('parent_id')
                ->label('Categoría padre (opcional)')
                ->options(Category::whereNull('parent_id')->pluck('name', 'id'))
                ->nullable()
                ->searchable(),

            Forms\Components\FileUpload::make('image')
                ->label('Imagen')
                ->image()
                ->disk('public')
                ->directory('categories')
                ->nullable(),
        ])->columns(2);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')
                    ->label('Nombre')
                    ->searchable(),

                Tables\Columns\TextColumn::make('slug')
                    ->label('Slug'),

                Tables\Columns\TextColumn::make('parent.name')
                    ->label('Categoría padre')
                    ->default('—'),

                Tables\Columns\TextColumn::make('products_count')
                    ->label('Productos')
                    ->counts('products'),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListCategories::route('/'),
            'create' => Pages\CreateCategory::route('/create'),
            'edit' => Pages\EditCategory::route('/{record}/edit'),
        ];
    }
}
```

---

### Task 2: BrandResource en Filament

**Files:**
- Create: `app/Filament/Resources/BrandResource.php`

- [ ] **Step 1: Generar BrandResource**

```bash
php artisan make:filament-resource Brand --generate
```

- [ ] **Step 2: Reemplazar contenido de BrandResource.php**

```php
<?php

namespace App\Filament\Resources;

use App\Filament\Resources\BrandResource\Pages;
use App\Models\Brand;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class BrandResource extends Resource
{
    protected static ?string $model = Brand::class;
    protected static ?string $navigationIcon = 'heroicon-o-building-storefront';
    protected static ?string $navigationLabel = 'Marcas';
    protected static ?string $modelLabel = 'Marca';
    protected static ?string $pluralModelLabel = 'Marcas';
    protected static ?int $navigationSort = 3;

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\TextInput::make('name')
                ->label('Nombre')
                ->required()
                ->maxLength(255),

            Forms\Components\FileUpload::make('logo')
                ->label('Logo')
                ->image()
                ->disk('public')
                ->directory('brands')
                ->nullable(),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')
                    ->label('Marca')
                    ->searchable()
                    ->sortable(),

                Tables\Columns\ImageColumn::make('logo')
                    ->label('Logo')
                    ->disk('public'),

                Tables\Columns\TextColumn::make('products_count')
                    ->label('Productos')
                    ->counts('products'),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListBrands::route('/'),
            'create' => Pages\CreateBrand::route('/create'),
            'edit' => Pages\EditBrand::route('/{record}/edit'),
        ];
    }
}
```

- [ ] **Step 3: Verificar en admin**

1. `http://hauled-api.test/admin/categories` → 5 categorías padre + hijos
2. `http://hauled-api.test/admin/brands` → 8 marcas
3. Crear una marca nueva desde Filament → verificar en `GET /api/v1/brands`

---

### Task 3: Conectar sidebar de Nuxt con la API

**Files:**
- Modify: `C:/Users/GODSF/Herd/Hauled/app/components/shop/sidebar/filter-categories.vue`
- Modify: `C:/Users/GODSF/Herd/Hauled/app/components/shop/sidebar/filter-brand.vue`

- [ ] **Step 1: Actualizar filter-categories.vue para cargar desde API**

Editar `app/components/shop/sidebar/filter-categories.vue`. Reemplazar cualquier import estático por:

```vue
<script setup lang="ts">
const { apiFetch } = useApi()

const { data } = await useAsyncData('sidebar-categories', () =>
  apiFetch<{ data: any[] }>('/categories')
)

const categories = computed(() => data.value?.data ?? [])
</script>
```

Y en el template, usar `categories` en lugar del array estático.

- [ ] **Step 2: Actualizar filter-brand.vue para cargar desde API**

```vue
<script setup lang="ts">
const { apiFetch } = useApi()

const { data } = await useAsyncData('sidebar-brands', () =>
  apiFetch<{ data: any[] }>('/brands')
)

const brands = computed(() => data.value?.data ?? [])
</script>
```

- [ ] **Step 3: Verificar en el navegador**

1. Abrir `http://localhost:3000/shop`
2. El sidebar de categorías debe mostrar: Camisetas, Hoodies, Pantalones, Shorts, Accesorios
3. El sidebar de marcas debe mostrar: Nike, Adidas, Gap, Tommy Hilfiger...
4. Crear una categoría nueva en Filament → recargar `/shop` → debe aparecer

- [ ] **Step 4: Commit**

```bash
# Laravel
cd C:/Users/GODSF/Herd/hauled-api
git add .
git commit -m "feat: Filament resources para categorias y marcas"

# Nuxt
cd C:/Users/GODSF/Herd/Hauled
git add .
git commit -m "feat: sidebar shop conectado a API (categorias y marcas reales)"
```

---

### Verificación Final del Módulo 6

- [ ] `http://hauled-api.test/admin/categories` → lista y CRUD funcionando
- [ ] `http://hauled-api.test/admin/brands` → lista y CRUD funcionando
- [ ] `GET /api/v1/categories` → categorías con children
- [ ] `GET /api/v1/brands` → marcas
- [ ] Sidebar de `/shop` en Nuxt muestra datos reales de la API
- [ ] Nueva categoría creada en Filament aparece en sidebar de Nuxt

**Módulo 6 completado. Avanzar a Módulo 7.**
