import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import cartService from '@/services/cartService'

export const useCartStore = defineStore('cart', () => {
  const items = ref([])
  const total = ref(0)
  const loading = ref(false)

  const itemCount = computed(() => items.value.length)

  const cartTotal = computed(() => {
    return items.value.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)
  })

  const getCart = async () => {
    loading.value = true
    try {
      const response = await cartService.getCart()
      items.value = response.data.items
      total.value = response.data.total
    } finally {
      loading.value = false
    }
  }

  const addToCart = async (productId, quantity = 1) => {
    try {
      const response = await cartService.addToCart(productId, quantity)
      items.value = response.data.items
      return response.data
    } catch (error) {
      throw error
    }
  }

  const updateItem = async (itemId, quantity) => {
    try {
      await cartService.updateCartItem(itemId, quantity)
      await getCart()
    } catch (error) {
      throw error
    }
  }

  const removeItem = async (itemId) => {
    try {
      await cartService.removeFromCart(itemId)
      await getCart()
    } catch (error) {
      throw error
    }
  }

  const clear = async () => {
    try {
      await cartService.clearCart()
      items.value = []
      total.value = 0
    } catch (error) {
      throw error
    }
  }

  return {
    items,
    total,
    loading,
    itemCount,
    cartTotal,
    getCart,
    addToCart,
    updateItem,
    removeItem,
    clear,
  }
})
