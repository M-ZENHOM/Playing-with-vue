import { defineStore } from "pinia";

interface CartItem {
  id: number
  title: string
  price: number
  quantity: number
  image: string
  category: string
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as CartItem[],
  }),
  getters: {
    total: (state) => {
      return state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    },
    itemCount: (state) => {
      return state.items.reduce((sum, item) => sum + item.quantity, 0)
    }
  },
  actions: {
    addItem(item: CartItem) {
      const existingItem = this.items.find(i => i.id === item.id)
      if (existingItem) {
        existingItem.quantity += item.quantity || 1
        return
      }
      this.items.push(item)
    },
    removeItem(id: number) {
      const existingItem = this.items.find(item => item.id === id)
      if (!existingItem) {
        return
      }
      existingItem.quantity -= 1
      if (existingItem.quantity === 0) {
        this.items = this.items.filter(item => item.id !== id)
      }
    },
    clear() {
      this.items = []
    }
  }
})
