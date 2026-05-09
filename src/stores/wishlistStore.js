import { defineStore } from 'pinia'
import { ref } from 'vue'
import wishlistService from '@/services/wishlistService'

export const useWishlistStore = defineStore('wishlist', () => {
  const items = ref([])
  const loading = ref(false)

  const getWishlist = async () => {
    loading.value = true
    try {
      const response = await wishlistService.getWishlist()
      items.value = response.data.data
    } finally {
      loading.value = false
    }
  }

  const addToWishlist = async (productId) => {
    try {
      await wishlistService.addToWishlist(productId)
      await getWishlist()
    } catch (error) {
      throw error
    }
  }

  const removeFromWishlist = async (productId) => {
    try {
      await wishlistService.removeFromWishlist(productId)
      items.value = items.value.filter(item => item.id !== productId)
    } catch (error) {
      throw error
    }
  }

  return {
    items,
    loading,
    getWishlist,
    addToWishlist,
    removeFromWishlist,
  }
})
