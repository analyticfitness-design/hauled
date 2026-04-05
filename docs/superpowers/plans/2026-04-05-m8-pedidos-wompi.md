# Módulo 8: Pedidos + Checkout + Wompi — Plan de Implementación

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans

**Goal:** Flujo completo de compra: checkout → crear orden en BD → redirigir a Wompi → webhook confirma pago → página de confirmación muestra resultado.

**Architecture:** OrderController crea la orden y genera la URL de Wompi. Webhook endpoint recibe notificación de Wompi y actualiza el estado. Nuxt checkout conectado a la API.

**Tech Stack:** Laravel, Wompi API (sandbox), Nuxt $fetch

---

### Task 1: OrderController

**Files:**
- Create: `app/Http/Controllers/Api/OrderController.php`
- Create: `app/Http/Requests/CreateOrderRequest.php`
- Create: `app/Http/Resources/OrderResource.php`

- [ ] **Step 1: Agregar variables Wompi al .env de Laravel**

```env
WOMPI_PUBLIC_KEY=pub_test_XXXXXXXXXXXXXXXXXXXXXXXX
WOMPI_SECRET_KEY=prv_test_XXXXXXXXXXXXXXXXXXXXXXXX
WOMPI_EVENTS_SECRET=test_events_XXXXXXXXXXXXXXXX
```

- [ ] **Step 2: Exponer Wompi keys en config/services.php**

Agregar al final del array en `config/services.php`:
```php
'wompi' => [
    'public_key' => env('WOMPI_PUBLIC_KEY'),
    'secret_key' => env('WOMPI_SECRET_KEY'),
    'events_secret' => env('WOMPI_EVENTS_SECRET'),
    'sandbox_url' => 'https://sandbox.wompi.co/v1',
    'checkout_url' => 'https://checkout.wompi.co/p/',
],
```

- [ ] **Step 3: Crear CreateOrderRequest**

```bash
cd C:/Users/GODSF/Herd/hauled-api
php artisan make:request CreateOrderRequest
```

```php
<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateOrderRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'items' => ['required', 'array', 'min:1'],
            'items.*.product_id' => ['required', 'integer', 'exists:products,id'],
            'items.*.quantity' => ['required', 'integer', 'min:1'],
            'items.*.size' => ['nullable', 'string'],
            'address' => ['required', 'array'],
            'address.street' => ['required', 'string'],
            'address.city' => ['required', 'string'],
            'address.department' => ['required', 'string'],
            'address.phone' => ['required', 'string'],
        ];
    }
}
```

- [ ] **Step 4: Crear OrderResource**

```bash
php artisan make:resource OrderResource
```

```php
<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'reference' => $this->reference,
            'total' => $this->total,
            'total_formatted' => '$' . number_format($this->total / 100, 0, ',', '.'),
            'status' => $this->status,
            'address' => $this->address,
            'items' => $this->whenLoaded('items', fn() =>
                $this->items->map(fn($item) => [
                    'id' => $item->id,
                    'product_title' => $item->product_title,
                    'quantity' => $item->quantity,
                    'price' => $item->price,
                    'size' => $item->size,
                ])
            ),
            'wompi_checkout_url' => $this->wompi_checkout_url ?? null,
            'created_at' => $this->created_at->toDateTimeString(),
        ];
    }
}
```

- [ ] **Step 5: Crear OrderController**

```bash
php artisan make:controller Api/OrderController
```

```php
<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateOrderRequest;
use App\Http\Resources\OrderResource;
use App\Models\Order;
use App\Models\Payment;
use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class OrderController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $orders = Order::with('items')
            ->where('user_id', $request->user()->id)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json(['data' => OrderResource::collection($orders)]);
    }

    public function show(Request $request, int $id): JsonResponse
    {
        $order = Order::with('items')
            ->where('user_id', $request->user()->id)
            ->findOrFail($id);

        return response()->json(['data' => new OrderResource($order)]);
    }

    public function store(CreateOrderRequest $request): JsonResponse
    {
        return DB::transaction(function () use ($request) {
            $user = $request->user();
            $items = $request->items;
            $total = 0;
            $orderItems = [];

            // Validar stock y calcular total
            foreach ($items as $item) {
                $product = Product::findOrFail($item['product_id']);

                if ($product->quantity < $item['quantity']) {
                    abort(422, "Stock insuficiente para: {$product->title}");
                }

                $lineTotal = $product->final_price * $item['quantity'];
                $total += $lineTotal;

                $orderItems[] = [
                    'product_id' => $product->id,
                    'quantity' => $item['quantity'],
                    'price' => $product->final_price,
                    'size' => $item['size'] ?? null,
                    'product_title' => $product->title,
                ];
            }

            // Crear orden
            $reference = 'HAULED-' . strtoupper(Str::random(8)) . '-' . now()->timestamp;

            $order = Order::create([
                'user_id' => $user->id,
                'reference' => $reference,
                'total' => $total,
                'status' => 'pending',
                'address' => $request->address,
            ]);

            // Crear items y descontar stock
            foreach ($orderItems as $i => $itemData) {
                $order->items()->create($itemData);
                Product::find($items[$i]['product_id'])->decrement('quantity', $items[$i]['quantity']);
            }

            // Crear payment pendiente
            Payment::create([
                'order_id' => $order->id,
                'reference' => $reference,
                'amount' => $total,
                'status' => 'pending',
            ]);

            // Generar URL de Wompi
            $wompiCheckoutUrl = $this->buildWompiUrl($order, $user);

            return response()->json([
                'data' => (new OrderResource($order->load('items')))->additional([
                    'wompi_checkout_url' => $wompiCheckoutUrl,
                ]),
                'wompi_checkout_url' => $wompiCheckoutUrl,
            ], 201);
        });
    }

    private function buildWompiUrl(Order $order, $user): string
    {
        $params = http_build_query([
            'public-key' => config('services.wompi.public_key'),
            'currency' => 'COP',
            'amount-in-cents' => $order->total,
            'reference' => $order->reference,
            'customer-email' => $user->email,
            'redirect-url' => url('/') . '/checkout/confirmacion',
        ]);

        return config('services.wompi.checkout_url') . '?' . $params;
    }
}
```

---

### Task 2: Webhook de Wompi

**Files:**
- Create: `app/Http/Controllers/Api/PaymentWebhookController.php`

- [ ] **Step 1: Crear PaymentWebhookController**

```bash
php artisan make:controller Api/PaymentWebhookController
```

```php
<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Payment;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class PaymentWebhookController extends Controller
{
    public function handle(Request $request): JsonResponse
    {
        $payload = $request->all();

        Log::info('Wompi webhook recibido', $payload);

        // Verificar firma del evento
        if (! $this->verifySignature($request)) {
            Log::warning('Wompi webhook: firma inválida');
            return response()->json(['error' => 'Invalid signature'], 401);
        }

        $event = $payload['event'] ?? null;
        $data = $payload['data']['transaction'] ?? null;

        if ($event !== 'transaction.updated' || ! $data) {
            return response()->json(['ok' => true]);
        }

        $reference = $data['reference'] ?? null;
        $status = $data['status'] ?? null;
        $wompiId = $data['id'] ?? null;

        if (! $reference) {
            return response()->json(['ok' => true]);
        }

        $order = Order::where('reference', $reference)->first();
        if (! $order) {
            return response()->json(['ok' => true]);
        }

        // Actualizar payment
        $payment = Payment::where('order_id', $order->id)->first();
        if ($payment) {
            $payment->update([
                'status' => match($status) {
                    'APPROVED' => 'approved',
                    'DECLINED' => 'declined',
                    'VOIDED' => 'voided',
                    default => 'pending',
                },
                'wompi_data' => $data,
            ]);
        }

        // Actualizar orden
        if ($status === 'APPROVED') {
            $order->update([
                'status' => 'paid',
                'wompi_ref' => $wompiId,
                'wompi_data' => $data,
            ]);
        } elseif (in_array($status, ['DECLINED', 'VOIDED'])) {
            $order->update(['status' => 'cancelled', 'wompi_data' => $data]);

            // Restaurar stock
            foreach ($order->items as $item) {
                if ($item->product_id) {
                    \App\Models\Product::find($item->product_id)?->increment('quantity', $item->quantity);
                }
            }
        }

        return response()->json(['ok' => true]);
    }

    private function verifySignature(Request $request): bool
    {
        $eventsSecret = config('services.wompi.events_secret');
        if (! $eventsSecret) return true; // En desarrollo sin secret configurado

        $checksum = $request->header('X-Event-Checksum');
        $payload = $request->getContent();
        $expected = hash_hmac('sha256', $payload, $eventsSecret);

        return hash_equals($expected, $checksum ?? '');
    }
}
```

---

### Task 3: PaymentController (verificar estado)

**Files:**
- Create: `app/Http/Controllers/Api/PaymentController.php`

- [ ] **Step 1: Crear PaymentController**

```bash
php artisan make:controller Api/PaymentController
```

```php
<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class PaymentController extends Controller
{
    public function verify(Request $request, string $reference): JsonResponse
    {
        $order = Order::with('items')
            ->where('reference', $reference)
            ->where('user_id', $request->user()->id)
            ->firstOrFail();

        // Consultar Wompi si la orden sigue pending
        if ($order->status === 'pending') {
            try {
                $response = Http::withToken(config('services.wompi.secret_key'))
                    ->get(config('services.wompi.sandbox_url') . "/transactions?reference={$reference}");

                if ($response->successful()) {
                    $transactions = $response->json('data', []);
                    $latest = collect($transactions)->sortByDesc('created_at')->first();

                    if ($latest && $latest['status'] === 'APPROVED') {
                        $order->update(['status' => 'paid', 'wompi_ref' => $latest['id']]);
                    }
                }
            } catch (\Exception $e) {
                // No interrumpir si Wompi API falla
            }
        }

        return response()->json([
            'data' => [
                'reference' => $order->reference,
                'status' => $order->status,
                'total' => $order->total,
                'total_formatted' => '$' . number_format($order->total / 100, 0, ',', '.'),
                'items' => $order->items->map(fn($i) => [
                    'title' => $i->product_title,
                    'quantity' => $i->quantity,
                    'size' => $i->size,
                ]),
            ],
        ]);
    }
}
```

---

### Task 4: Rutas de pedidos y pagos

**Files:**
- Modify: `routes/api.php`

- [ ] **Step 1: Agregar rutas en api.php**

```php
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\PaymentController;
use App\Http\Controllers\Api\PaymentWebhookController;

// Dentro del grupo v1:

// Pedidos (requieren auth)
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/orders', [OrderController::class, 'index']);
    Route::get('/orders/{id}', [OrderController::class, 'show']);
    Route::post('/orders', [OrderController::class, 'store']);
    Route::get('/payments/verify/{reference}', [PaymentController::class, 'verify']);
});

// Webhook Wompi (público, verificado con firma)
Route::post('/payments/webhook', [PaymentWebhookController::class, 'handle']);
```

- [ ] **Step 2: Excluir webhook de CSRF (ya está excluido en rutas API)**

Verificar que `routes/api.php` no tiene middleware de CSRF (por defecto las rutas API no lo tienen en Laravel 11). OK.

---

### Task 5: Filament OrdersResource

**Files:**
- Create: `app/Filament/Resources/OrderResource.php`

- [ ] **Step 1: Generar OrderResource**

```bash
php artisan make:filament-resource Order --generate
```

Editar `app/Filament/Resources/OrderResource.php`:
```php
<?php

namespace App\Filament\Resources;

use App\Filament\Resources\OrderResource\Pages;
use App\Models\Order;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class OrderResource extends Resource
{
    protected static ?string $model = Order::class;
    protected static ?string $navigationIcon = 'heroicon-o-shopping-cart';
    protected static ?string $navigationLabel = 'Pedidos';
    protected static ?string $modelLabel = 'Pedido';
    protected static ?string $pluralModelLabel = 'Pedidos';
    protected static ?int $navigationSort = 4;

    public static function form(Form $form): Form
    {
        return $form->schema([]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('reference')->label('Referencia')->searchable(),
                Tables\Columns\TextColumn::make('user.name')->label('Cliente')->searchable(),
                Tables\Columns\TextColumn::make('total')
                    ->label('Total')
                    ->formatStateUsing(fn($state) => '$' . number_format($state / 100, 0, ',', '.')),
                Tables\Columns\BadgeColumn::make('status')
                    ->label('Estado')
                    ->colors([
                        'warning' => 'pending',
                        'success' => 'paid',
                        'info' => 'shipped',
                        'primary' => 'delivered',
                        'danger' => 'cancelled',
                    ]),
                Tables\Columns\TextColumn::make('created_at')->label('Fecha')->dateTime('d/m/Y H:i')->sortable(),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('status')->options([
                    'pending' => 'Pendiente',
                    'paid' => 'Pagado',
                    'shipped' => 'Enviado',
                    'delivered' => 'Entregado',
                    'cancelled' => 'Cancelado',
                ]),
            ])
            ->actions([
                Tables\Actions\ViewAction::make(),
                Tables\Actions\Action::make('mark_shipped')
                    ->label('Marcar enviado')
                    ->icon('heroicon-o-truck')
                    ->color('info')
                    ->visible(fn($record) => $record->status === 'paid')
                    ->action(fn($record) => $record->update(['status' => 'shipped'])),
                Tables\Actions\Action::make('mark_delivered')
                    ->label('Marcar entregado')
                    ->icon('heroicon-o-check-circle')
                    ->color('success')
                    ->visible(fn($record) => $record->status === 'shipped')
                    ->action(fn($record) => $record->update(['status' => 'delivered'])),
            ])
            ->defaultSort('created_at', 'desc');
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListOrders::route('/'),
            'view' => Pages\ViewOrder::route('/{record}'),
        ];
    }
}
```

---

### Task 6: Conectar checkout de Nuxt

**Files:**
- Modify: `C:/Users/GODSF/Herd/Hauled/app/components/checkout/checkout-area.vue`
- Modify: `C:/Users/GODSF/Herd/Hauled/app/pages/checkout/confirmacion.vue`

- [ ] **Step 1: Actualizar checkout-area.vue**

En el componente de checkout, reemplazar la lógica de pago con:
```typescript
<script setup lang="ts">
const { apiFetch } = useApi()
const cartStore = useCartStore()
const loading = ref(false)
const error = ref('')

const address = ref({
  street: '',
  city: '',
  department: '',
  phone: '',
})

const handleCheckout = async () => {
  loading.value = true
  error.value = ''

  try {
    const items = cartStore.cart_products
      .filter(p => p.hauledLine !== 'encargo')
      .map(p => ({
        product_id: p.id,
        quantity: p.orderQuantity ?? 1,
        size: p.selectedSize ?? null,
      }))

    const res = await apiFetch<{ wompi_checkout_url: string }>('/orders', {
      method: 'POST',
      body: {
        items,
        address: address.value,
      },
    })

    // Redirigir a Wompi
    window.location.href = res.wompi_checkout_url
  } catch (err: any) {
    error.value = err?.data?.message ?? 'Error al procesar el pedido.'
  } finally {
    loading.value = false
  }
}
</script>
```

- [ ] **Step 2: Actualizar página de confirmación**

En `app/pages/checkout/confirmacion.vue`:
```typescript
<script setup lang="ts">
const route = useRoute()
const { apiFetch } = useApi()
const cartStore = useCartStore()

const reference = route.query.ref as string
const order = ref<any>(null)
const loading = ref(true)

onMounted(async () => {
  if (!reference) {
    loading.value = false
    return
  }

  try {
    const res = await apiFetch<{ data: any }>(`/payments/verify/${reference}`)
    order.value = res.data

    if (order.value?.status === 'paid') {
      cartStore.clear_cart()
    }
  } catch {
    // manejar error
  } finally {
    loading.value = false
  }
})
</script>
```

- [ ] **Step 3: Verificar flujo completo en sandbox**

1. Login como `cliente@test.com` en Nuxt
2. Agregar productos al carrito
3. Ir a `/checkout`
4. Llenar datos de dirección
5. Click "Pagar con Wompi"
6. En Wompi sandbox usar tarjeta: `4242424242424242`, CVV: `123`, fecha: cualquiera futura
7. Wompi redirige a `/checkout/confirmacion?ref=HAULED-XXXX`
8. Página muestra estado del pedido
9. Verificar en Filament `http://hauled-api.test/admin/orders` que el pedido aparece

- [ ] **Step 4: Commit**

```bash
# Laravel
cd C:/Users/GODSF/Herd/hauled-api
git add .
git commit -m "feat: pedidos API, webhook Wompi, OrderResource Filament"

# Nuxt
cd C:/Users/GODSF/Herd/Hauled
git add .
git commit -m "feat: checkout conectado a API Laravel + página confirmación Wompi"
```

---

### Verificación Final del Módulo 8

- [ ] `POST /api/v1/orders` (auth) → crea orden + devuelve URL Wompi
- [ ] `GET /api/v1/orders` (auth) → lista pedidos del usuario
- [ ] `GET /api/v1/payments/verify/{ref}` → retorna estado del pago
- [ ] `POST /api/v1/payments/webhook` → actualiza orden cuando Wompi notifica
- [ ] Filament `/admin/orders` → lista pedidos, acciones de estado
- [ ] Flujo completo en sandbox funciona de inicio a fin

**Módulo 8 completado. Avanzar a Módulo 9.**
