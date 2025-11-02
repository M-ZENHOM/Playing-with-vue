<script setup lang="ts">
import { useCartStore } from '@/stores/cart'
import MaxWidthWrapper from '@/components/common/MaxWidthWrapper.vue'
import { RouterLink } from 'vue-router'
import { useHead } from '@vueuse/head'

const cartStore = useCartStore()

const handleIncreaseQuantity = (item: (typeof cartStore.items)[0]) => {
  cartStore.addItem({ ...item, quantity: 1 })
}

const handleDecreaseQuantity = (id: number) => {
  cartStore.removeItem(id)
}

useHead({
  title: 'Shopping Cart',
  meta: [
    {
      name: 'description',
      content: 'Your shopping cart',
    },
  ],
})
</script>

<template>
  <MaxWidthWrapper>
    <div class="py-8">
      <div class="mb-8">
        <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
        <p v-if="cartStore.items.length > 0" class="text-gray-600">
          {{ cartStore.itemCount }} {{ cartStore.itemCount === 1 ? 'item' : 'items' }} in your cart
        </p>
      </div>

      <div
        v-if="cartStore.items.length === 0"
        class="flex flex-col items-center justify-center min-h-[400px] text-center bg-white rounded-2xl shadow-sm border border-gray-200 p-12"
      >
        <svg
          class="w-24 h-24 text-gray-300 mb-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          />
        </svg>
        <h2 class="text-2xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
        <p class="text-gray-600 mb-8 max-w-md">
          Looks like you haven't added any items to your cart yet. Start shopping to fill it up!
        </p>
        <RouterLink
          to="/"
          class="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Continue Shopping
        </RouterLink>
      </div>

      <div v-else class="grid lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2 space-y-4">
          <div
            v-for="item in cartStore.items"
            :key="item.id"
            class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200"
          >
            <div class="flex gap-4 p-4 md:p-6">
              <div class="shrink-0 w-24 h-24 md:w-32 md:h-32 bg-gray-50 rounded-lg overflow-hidden">
                <img :src="item.image" :alt="item.title" class="w-full h-full object-contain p-2" />
              </div>
              <div class="flex-1 min-w-0">
                <h3 class="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
                  {{ item.title }}
                </h3>
                <p class="text-sm text-gray-500 capitalize mb-3">{{ item.category }}</p>
                <div class="flex items-center justify-between">
                  <p class="text-xl font-bold text-gray-900">
                    ${{ (item.price * item.quantity).toFixed(2) }}
                  </p>
                  <div class="flex items-center gap-3">
                    <button
                      @click="handleDecreaseQuantity(item.id)"
                      class="w-8 h-8 flex items-center justify-center rounded-lg border-2 border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      :disabled="item.quantity === 1"
                      :class="{
                        'opacity-50 cursor-not-allowed': item.quantity === 1,
                        'cursor-pointer': item.quantity !== 1,
                      }"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M20 12H4"
                        />
                      </svg>
                    </button>
                    <span class="text-lg font-semibold text-gray-900 min-w-8 text-center">
                      {{ item.quantity }}
                    </span>
                    <button
                      @click="handleIncreaseQuantity(item)"
                      class="cursor-pointer w-8 h-8 flex items-center justify-center rounded-lg border-2 border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <p class="text-sm text-gray-500 mt-2">${{ item.price.toFixed(2) }} each</p>
              </div>

              <button
                @click="handleDecreaseQuantity(item.id)"
                class="cursor-pointer shrink-0 w-10 h-10 flex items-center justify-center rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                :title="item.quantity === 1 ? 'Remove item' : 'Decrease quantity'"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div class="pt-4">
            <button
              @click="cartStore.clear()"
              class="cursor-pointer inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              Clear Cart
            </button>
          </div>
        </div>

        <div class="lg:col-span-1">
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-24">
            <h2 class="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

            <div class="space-y-4 mb-6">
              <div class="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span class="font-medium">${{ cartStore.total.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span class="font-medium">Free</span>
              </div>
              <div class="border-t border-gray-200 pt-4 flex justify-between">
                <span class="text-lg font-semibold text-gray-900">Total</span>
                <span class="text-2xl font-bold text-gray-900">
                  ${{ cartStore.total.toFixed(2) }}
                </span>
              </div>
            </div>

            <button
              class="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mb-4"
            >
              Proceed to Checkout
            </button>

            <RouterLink
              to="/"
              class="block w-full text-center px-6 py-3 border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-semibold rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Continue Shopping
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </MaxWidthWrapper>
</template>
