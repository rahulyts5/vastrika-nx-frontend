import api from './api'

export default {
  getCategories() {
    return api.get('/customer/categories')
  },

  getCategoryBySlug(slug) {
    return api.get(`/customer/categories/${slug}`)
  },
}
