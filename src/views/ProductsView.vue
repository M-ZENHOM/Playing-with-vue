<script setup lang="ts">
import { onMounted } from 'vue'
import { useProductsStore } from '@/stores/products'
import { RouterLink } from 'vue-router'
import MaxWidthWrapper from '@/components/common/MaxWidthWrapper.vue'
import LoadingSkeleton from '@/components/products/loading-skeleton.vue'
import ErrorCard from '@/components/products/error-card.vue'
import { useHead } from '@vueuse/head'

const productsStore = useProductsStore()

onMounted(async () => {
  await productsStore.fetchProducts()
})

useHead({
  title: 'Products',
  meta: [
    {
      name: 'description',
      content: 'Our products page',
    },
  ],
})
</script>

<template>
  <MaxWidthWrapper>
    <LoadingSkeleton v-if="productsStore.loading" />
    <ErrorCard
      v-else-if="productsStore.error"
      :message="productsStore.error.message"
      :on-retry="() => productsStore.fetchProducts()"
    />
    <div v-else-if="productsStore.products.length > 0" class="py-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">Our Products</h1>
      <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <li v-for="product in productsStore.products" :key="product.id" class="group">
          <RouterLink
            :to="`/products/${product.id}`"
            class="flex flex-col bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg hover:border-gray-300 transition-all duration-200 h-full"
          >
            <div
              class="relative w-full h-64 bg-gray-50 flex items-center justify-center p-4 overflow-hidden"
            >
              <img
                :src="product.image"
                :alt="product.title"
                class="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div class="p-4 flex-1 flex flex-col">
              <h2
                class="text-lg font-semibold text-gray-900 line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors"
              >
                {{ product.title }}
              </h2>

              <div class="mt-auto space-y-2">
                <div class="flex items-baseline gap-2">
                  <span class="text-2xl font-bold text-gray-900">${{ product.price }}</span>
                </div>
                <div class="flex items-center gap-1 text-sm text-gray-600">
                  <svg
                    class="w-4 h-4 text-yellow-400 fill-current"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"
                    />
                  </svg>
                  <span class="font-medium">{{ product.rating.rate }}</span>
                  <span class="text-gray-400">({{ product.rating.count }})</span>
                </div>
                <div class="pt-2">
                  <span
                    class="inline-block px-2.5 py-1 text-xs font-medium bg-blue-50 text-blue-700 rounded-full capitalize"
                  >
                    {{ product.category }}
                  </span>
                </div>
              </div>
            </div>
          </RouterLink>
        </li>
      </ul>
    </div>
    <div v-else class="flex flex-col items-center justify-center min-h-[400px] text-center">
      <p class="text-gray-600 text-lg">No products found</p>
    </div>
  </MaxWidthWrapper>
</template>
