import api from './api'

export default {
  getProducts(params = {}) {
    return api.get('/customer/products', { params })
  },

  getFeaturedProducts() {
    return api.get('/customer/products/featured')
  },

  getTrendingProducts() {
    return api.get('/customer/products/trending')
  },

  getLatestProducts(limit = 8) {
    return api.get('/customer/products/latest', { params: { limit } })
  },

  getProductById(id) {
    return api.get(`/customer/products/${id}`)
  },

  getRelatedProducts(id, limit = 4) {
    return api.get(`/customer/products/${id}/related`, { params: { limit } })
  },

  getProductsByCategory(categoryId, params = {}) {
    return api.get(`/customer/category/${categoryId}/products`, { params })
  },

  search(query) {
    return api.get('/customer/products', { params: { search: query } })
  },
}
