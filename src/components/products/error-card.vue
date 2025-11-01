<script setup lang="ts">
defineProps<{
  message?: string
  onRetry?: () => void
}>()
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-[400px] p-8">
    <div class="bg-white rounded-2xl shadow-lg border border-red-100 p-8 max-w-md w-full">
      <div class="flex flex-col items-center text-center space-y-4">
        <div class="bg-red-100 rounded-full p-4">
          <svg
            class="w-12 h-12 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        <div class="space-y-2">
          <h3 class="text-xl font-semibold text-gray-900">Oops! Something went wrong</h3>
          <p class="text-gray-600">
            {{
              message ||
              'We encountered an error while loading the products. Please try again later.'
            }}
          </p>
        </div>

        <button
          v-if="onRetry"
          @click="onRetry"
          class="mt-4 px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          Try Again
        </button>
      </div>
    </div>
  </div>
</template>
