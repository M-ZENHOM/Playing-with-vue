<script setup lang="ts">
import { useCartStore } from '@/stores/cart'
import { onMounted } from 'vue'
import MaxWidthWrapper from '../common/MaxWidthWrapper.vue'
import { RouterLink } from 'vue-router'

const cartStore = useCartStore()

onMounted(() => {
  cartStore.clear()
})
</script>

<template>
  <header class="sticky top-0 z-50 bg-white">
    <MaxWidthWrapper class="py-4 flex items-center justify-between">
      <RouterLink to="/">
        <h1 class="text-2xl font-bold uppercase">M Store</h1>
      </RouterLink>
      <RouterLink to="/cart" class="relative size-6">
        <svg
          width="20px"
          height="20px"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="absolute top-0 left-0"
        >
          <path
            d="M0.5 0.5L1.1 2.5M1.1 2.5L3.5 10.5H14.5V4.5C14.5 3.39543 13.6046 2.5 12.5 2.5H1.1ZM12.5 14.5C11.9477 14.5 11.5 14.0523 11.5 13.5C11.5 12.9477 11.9477 12.5 12.5 12.5C13.0523 12.5 13.5 12.9477 13.5 13.5C13.5 14.0523 13.0523 14.5 12.5 14.5ZM4.5 13.5C4.5 12.9477 4.94772 12.5 5.5 12.5C6.05228 12.5 6.5 12.9477 6.5 13.5C6.5 14.0523 6.05228 14.5 5.5 14.5C4.94772 14.5 4.5 14.0523 4.5 13.5Z"
            stroke="#000000"
          />
        </svg>
        <span
          class="absolute -top-2 left-4 text-xs bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center"
          >{{ cartStore.items.length }}</span
        >
      </RouterLink>
    </MaxWidthWrapper>
  </header>
</template>
