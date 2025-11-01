<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    <div
      v-for="n in 8"
      :key="n"
      class="animate-pulse bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
    >
      <div class="w-full h-64 bg-gray-200"></div>
      <div class="p-4 space-y-3">
        <div class="h-5 bg-gray-200 rounded w-3/4"></div>
        <div class="h-4 bg-gray-200 rounded w-1/2"></div>
        <div class="flex items-center gap-2">
          <div class="h-4 w-16 bg-gray-200 rounded"></div>
          <div class="h-4 w-20 bg-gray-200 rounded"></div>
        </div>
        <div class="h-6 bg-gray-200 rounded w-full"></div>
      </div>
    </div>
  </div>
</template>
