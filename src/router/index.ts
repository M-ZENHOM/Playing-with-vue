import ProductsView from '@/views/ProductsView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: ProductsView },
    { path: '/products/:id', component: () => import('@/views/ProductDetail.vue'), props: true },
    { path: '/cart', component: () => import('@/views/CartDetails.vue') },
  ],
})

export default router
