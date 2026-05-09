import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import productService from '@/services/productService'

export const useProductStore = defineStore('product', () => {
  const products = ref([])
  const featured = ref([])
  const trending = ref([])
  const latest = ref([])
  const loading = ref(false)
  const error = ref(null)

  const getProducts = async (params = {}) => {
    loading.value = true
    error.value = null
    try {
      const response = await productService.getProducts(params)
      products.value = response.data.data
      return response.data
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  const getFeatured = async () => {
    loading.value = true
    try {
      const response = await productService.getFeaturedProducts()
      featured.value = response.data.data
    } finally {
      loading.value = false
    }
  }

  const getTrending = async () => {
    loading.value = true
    try {
      const response = await productService.getTrendingProducts()
      trending.value = response.data.data
    } finally {
      loading.value = false
    }
  }

  const getLatest = async () => {
    loading.value = true
    try {
      const response = await productService.getLatestProducts()
      latest.value = response.data.data
    } finally {
      loading.value = false
    }
  }

  return {
    products,
    featured,
    trending,
    latest,
    loading,
    error,
    getProducts,
    getFeatured,
    getTrending,
    getLatest,
  }
})
