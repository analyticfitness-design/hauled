<template>
  <div class="tp-shop-widget-content">
    <div class="tp-shop-widget-categories">
      <ul>
        <li v-for="category in category_data" :key="category.id">
          <a
            @click.prevent="handleCategory(category.parent)"
            :class="`cursor-pointer ${
              route.query.category ===
              formatString(category.parent)
                ? 'active'
                : ''
            }`"
          >
            {{ category.parent }}
            <span>{{ category.products.length }}</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import {formatString} from "@/utils/index";
import category_data from "@/data/category-data";
const router = useRouter();
const route = useRoute();

function handleCategory(category: string) {
    router.push({
        query: {
            ...router.currentRoute.value.query,
            category: router.currentRoute.value.query.category
                ? router.currentRoute.value.query.category.includes(category)
                    ? (router.currentRoute.value.query.category as string)
                        .split(",")
                        .filter((item: string) => item !== category)
                        .join(",")
                    : formatString(category)
                : formatString(category)
        }
    });
}
</script>
