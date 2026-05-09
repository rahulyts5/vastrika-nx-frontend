import api from './api'

export default {
  submitReview(data) {
    return api.post('/customer/reviews/create', data)
  },

  getProductReviews(productId, page = 1) {
    return api.get(`/customer/reviews/product/${productId}`, { params: { page } })
  },
}
