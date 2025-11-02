<script setup lang="ts">
import MaxWidthWrapper from '@/components/common/MaxWidthWrapper.vue'
import { useProductsStore } from '@/stores/products'
import { onMounted, computed } from 'vue'
import { RouterLink } from 'vue-router'
import ErrorCard from '@/components/products/error-card.vue'
import { useHead } from '@vueuse/head'
import { useCartStore } from '@/stores/cart'

const props = defineProps<{
  id: string | number
}>()

const productsStore = useProductsStore()

onMounted(async () => {
  await productsStore.fetchProduct(Number(props.id))
})

const cartStore = useCartStore()

const handleAddToCart = () => {
  if (productsStore.product) {
    cartStore.addItem({
      id: productsStore.product.id,
      title: productsStore.product.title,
      price: productsStore.product.price,
      quantity: 1,
      image: productsStore.product.image,
      category: productsStore.product.category,
    })
  }
}

useHead({
  title: computed(() => productsStore.product?.title || 'Loading...'),
  meta: [
    {
      name: 'description',
      content: computed(() => productsStore.product?.description || 'Product details'),
    },
  ],
})
</script>

<template>
  <MaxWidthWrapper>
    <div v-if="productsStore.loading" class="py-8">
      <div
        class="animate-pulse bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
      >
        <div class="grid md:grid-cols-2 gap-8">
          <div class="w-full h-96 bg-gray-200"></div>
          <div class="p-8 space-y-4">
            <div class="h-8 bg-gray-200 rounded w-3/4"></div>
            <div class="h-6 bg-gray-200 rounded w-1/2"></div>
            <div class="h-4 bg-gray-200 rounded w-full"></div>
            <div class="h-4 bg-gray-200 rounded w-full"></div>
            <div class="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </div>
      </div>
    </div>

    <ErrorCard
      v-else-if="productsStore.error"
      :message="productsStore.error.message"
      :on-retry="() => productsStore.fetchProduct(Number(props.id))"
    />

    <div v-else-if="productsStore.product" class="py-8">
      <RouterLink
        to="/"
        class="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors duration-200 group"
      >
        <svg
          class="w-5 h-5 group-hover:-translate-x-1 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        <span class="font-medium">Back to Products</span>
      </RouterLink>

      <div class="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        <div class="grid md:grid-cols-2 gap-8 lg:gap-12">
          <div class="bg-gray-50 flex items-center justify-center p-8 md:p-12">
            <img
              :src="productsStore.product.image"
              :alt="productsStore.product.title"
              class="w-full h-auto max-w-md object-contain"
            />
          </div>
          <div class="p-8 md:p-12 flex flex-col justify-center">
            <span
              class="inline-block px-3 py-1 text-sm font-medium bg-blue-50 text-blue-700 rounded-full capitalize mb-4 w-fit"
            >
              {{ productsStore.product.category }}
            </span>
            <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {{ productsStore.product.title }}
            </h1>
            <div class="flex items-center gap-2 mb-6">
              <div class="flex items-center">
                <svg
                  class="w-5 h-5 text-yellow-400 fill-current"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"
                  />
                </svg>
                <span class="ml-1 font-semibold text-gray-900">{{
                  productsStore.product.rating.rate
                }}</span>
              </div>
              <span class="text-gray-400">|</span>
              <span class="text-gray-600">{{ productsStore.product.rating.count }} reviews</span>
            </div>
            <div class="mb-6">
              <span class="text-4xl font-bold text-gray-900"
                >${{ productsStore.product.price }}</span
              >
            </div>
            <div class="mb-8">
              <h2 class="text-xl font-semibold text-gray-900 mb-3">Description</h2>
              <p class="text-gray-700 leading-relaxed">{{ productsStore.product.description }}</p>
            </div>
            <div class="flex flex-col sm:flex-row gap-4">
              <button
                @click="handleAddToCart"
                class="cursor-pointer flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Add to Cart
              </button>
              <button
                class="px-6 py-3 border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-semibold rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Wishlist
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="flex flex-col items-center justify-center min-h-[400px] text-center">
      <p class="text-gray-600 text-lg">Product not found</p>
      <RouterLink to="/" class="mt-4 text-blue-600 hover:text-blue-700 font-medium">
        Back to Products
      </RouterLink>
    </div>
  </MaxWidthWrapper>
</template>
