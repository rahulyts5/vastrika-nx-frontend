import api from './api'

export default {
  getStats() {
    return api.get('/admin/dashboard/stats')
  },

  getProducts(params = {}) {
    return api.get('/admin/products', { params })
  },

  createProduct(data) {
    return api.post('/admin/products/create', data)
  },

  updateProduct(id, data) {
    return api.put(`/admin/products/${id}`, data)
  },

  deleteProduct(id) {
    return api.delete(`/admin/products/${id}`)
  },

  getCategories() {
    return api.get('/admin/categories')
  },

  createCategory(data) {
    return api.post('/admin/categories/create', data)
  },

  updateCategory(id, data) {
    return api.put(`/admin/categories/${id}`, data)
  },

  deleteCategory(id) {
    return api.delete(`/admin/categories/${id}`)
  },

  getOrders(params = {}) {
    return api.get('/admin/orders', { params })
  },

  updateOrderStatus(id, status) {
    return api.put(`/admin/orders/${id}/status`, { order_status: status })
  },

  getCustomers(params = {}) {
    return api.get('/admin/customers', { params })
  },

  updateCustomerStatus(id, status) {
    return api.put(`/admin/customers/${id}/status`, { status })
  },
}
