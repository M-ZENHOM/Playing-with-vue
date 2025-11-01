import { defineStore } from "pinia";

interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: {
    rate: number
    count: number
  }
}

interface State {
  products: Product[]
  product: Product | null
  loading: boolean
  error: Error | null
}

export const useProductsStore = defineStore('products', {
  state: (): State => ({
    products: [],
    product: null,
    loading: false,
    error: null,
  }),

  actions: {
    async fetchProducts() {
      this.loading = true
      try {
        const response = await fetch('https://fakestoreapi.com/products')
        this.products = await response.json()
      } catch (error) {
        this.error = error as Error | null
      }
      finally {
        this.loading = false
      }
    },
    async fetchProduct(id: number) {
      this.loading = true
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`)
        this.product = await response.json()
      } catch (error) {
        this.error = error as Error | null
      }
      finally {
        this.loading = false
      }
    }
  }
})
