<template>
  <section
    :class="`tp-shop-area pb-120 ${full_width ? 'tp-shop-full-width-padding' : ''}`"
  >
    <div
      :class="`${full_width? 'container-fluid': shop_1600? 'container-shop': 'container'}`"
    >
      <div class="row">
        <div v-if="!shop_right_side && !shop_no_side" class="col-xl-3 col-lg-4">
          <!-- shop sidebar start -->
          <shop-sidebar />
          <!-- shop sidebar end -->
        </div>
        <div :class="`${shop_no_side?'col-xl-12':'col-xl-9 col-lg-8'}`">
          <div class="tp-shop-main-wrapper">
            <div class="tp-shop-top mb-45">
              <div class="row">
                <div class="col-xl-6">
                  <div class="tp-shop-top-left d-flex align-items-center">
                    <div class="tp-shop-top-tab tp-tab">
                      <ul class="nav nav-tabs" id="productTab" role="tablist">
                        <li class="nav-item" role="presentation">
                          <button
                            :class="`nav-link ${active_tab === 'grid' ? 'active' : ''}`"
                            @click="handleActiveTab('grid')"
                          >
                            <svg-grid />
                          </button>
                        </li>
                        <li class="nav-item" role="presentation">
                          <button
                            :class="`nav-link ${active_tab === 'list' ? 'active' : ''}`"
                            @click="handleActiveTab('list')"
                          >
                            <svg-list />
                          </button>
                        </li>
                      </ul>
                    </div>
                    <div class="tp-shop-top-result">
                      <p>
                        Mostrando 1–{{ store.filteredProducts?.slice(startIndex,endIndex).length }} de
                        {{ store.filteredProducts?.length }} resultados
                      </p>
                    </div>
                  </div>
                </div>
                <div class="col-xl-6">
                  <shop-sidebar-filter-select
                    @handle-select-filter="store.handleSelectFilter"
                  />
                </div>
              </div>
            </div>
            <div class="tp-shop-items-wrapper tp-shop-item-primary">
              <div v-if="loading" class="row">
                <div
                  v-for="n in 6"
                  :key="`sk-${n}`"
                  class="col-xl-4 col-md-6 col-sm-6 mb-30"
                >
                  <div class="hauled-product-skeleton" />
                </div>
              </div>

              <div v-else-if="active_tab === 'grid'">
                <div class="row infinite-container">
                  <div
                    v-for="item in store.filteredProducts?.slice(startIndex,endIndex)"
                    :key="item.id"
                    class="col-xl-4 col-md-6 col-sm-6 infinite-item"
                  >
                    <product-fashion-product-item
                      :item="item"
                      :spacing="true"
                    />
                  </div>
                </div>
              </div>

              <div v-else-if="active_tab === 'list'">
                <div class="row">
                  <div class="col-xl-12">
                    <product-list-item
                      v-for="item in store.filteredProducts?.slice(
                        startIndex,
                        endIndex
                      )"
                      :key="item.id"
                      :item="item"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div class="tp-shop-pagination mt-20">
              <div
                v-if="
                  store.filteredProducts && store.filteredProducts.length > 9
                "
                class="tp-pagination"
              >
                <ui-pagination
                  :items-per-page="9"
                  :data="store.filteredProducts || []"
                  @handle-paginate="handlePagination"
                />
              </div>
            </div>
          </div>
        </div>

        <div v-if="shop_right_side && !shop_no_side" class="col-xl-3 col-lg-4">
          <!-- shop sidebar start -->
          <shop-sidebar />
          <!-- shop sidebar end -->
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useProductFilterStore } from "@/pinia/useProductFilterStore";
import { useProducts } from "@/composables/useProducts";
import { type IProduct } from "@/types/product-type";
const route = useRoute();
const props = defineProps<{
  list_style?: boolean;
  full_width?: boolean;
  shop_1600?: boolean;
  shop_right_side?: boolean;
  shop_no_side?: boolean;
}>();

const active_tab = ref<string>(props.list_style ? "list" : "grid");
const store = useProductFilterStore();

const { products: apiProducts, loading, error, usedFallback, fetchProducts } = useProducts();

onMounted(async () => {
  await fetchProducts();
  if (apiProducts.value.length > 0) {
    store.setProducts(apiProducts.value);
  }
});

let filteredProductsItems = ref<IProduct[]>(store.filteredProducts!);
let startIndex = ref<number>(0);
let endIndex = ref<number>(store.filteredProducts?.length!);

const handlePagination = (data: IProduct[], start: number, end: number) => {
  filteredProductsItems.value = data;
  startIndex.value = start;
  endIndex.value = end;
};

function handleActiveTab(tab: string) {
  active_tab.value = tab;
}
watch(
  () => route.query || route.params,
  (newStatus) => {
    startIndex.value = 0;
    endIndex.value =
      store.filteredProducts && store.filteredProducts.length > 9 ? 9 : store.filteredProducts?.length!;
  }
);
</script>

<style>
/* ── HAULED Shop Styles ───────────────────────────── */
.tp-shop-area {
  background: var(--h-white, #fff);
  padding-bottom: clamp(60px, 8vw, 120px);
}
.tp-shop-top-result p {
  font-family: 'Inter', sans-serif;
  font-size: var(--h-fs-small, 0.82rem);
  color: rgba(0,0,0,0.45);
}
.tp-shop-top-tab .nav-link {
  background: transparent;
  border: 1px solid rgba(0,0,0,0.12);
  border-radius: 4px;
  color: rgba(0,0,0,0.4);
  padding: 7px 11px;
  transition: all var(--h-dur-fast, 180ms);
}
.tp-shop-top-tab .nav-link.active,
.tp-shop-top-tab .nav-link:hover {
  background: var(--h-black, #111);
  border-color: var(--h-black, #111);
  color: #fff;
}

/* Product card */
.tp-product-item-2 {
  border: none;
  border-radius: 6px;
  overflow: hidden;
  background: #fff;
  box-shadow: var(--h-shadow-card, 0 4px 20px rgba(0,0,0,0.06));
  transition: box-shadow var(--h-dur-med, 320ms), transform var(--h-dur-med, 320ms);
}
.tp-product-item-2:hover {
  box-shadow: var(--h-shadow-hover, 0 12px 40px rgba(0,0,0,0.12));
  transform: translateY(-3px);
}
.tp-product-item-2 .tp-product-title a {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  color: var(--h-black, #111);
  font-size: var(--h-fs-body, 0.9rem);
}
.tp-product-item-2 .tp-product-price span,
.tp-product-item-2 .new-price {
  font-family: 'Raleway', sans-serif;
  font-weight: 700;
  font-size: 0.95rem;
  color: var(--h-black, #111) !important;
}

/* Sidebar */
.tp-shop-widget {
  border-radius: 8px;
  border: 1px solid rgba(0,0,0,0.08);
  padding: 22px;
  margin-bottom: 18px;
}
.tp-shop-widget-title {
  font-family: 'Raleway', sans-serif;
  font-weight: 700;
  font-size: var(--h-fs-label, 0.72rem);
  letter-spacing: var(--h-ls-label, 4px);
  text-transform: uppercase;
  color: var(--h-black, #111);
}

/* Fix iOS input zoom */
.tp-shop-widget input,
.tp-shop-widget select {
  font-size: 16px;
}

/* Loading skeleton */
.hauled-product-skeleton {
  height: 360px;
  background: linear-gradient(90deg, #f4f4f4 0%, #ebebeb 50%, #f4f4f4 100%);
  background-size: 200% 100%;
  animation: hauled-skeleton 1.5s ease-in-out infinite;
  border-radius: 6px;
}
@keyframes hauled-skeleton {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
</style>
