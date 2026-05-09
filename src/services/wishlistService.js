import api from './api'

export default {
  getWishlist() {
    return api.get('/customer/wishlist')
  },

  addToWishlist(productId) {
    return api.post(`/customer/wishlist/${productId}/add`)
  },

  removeFromWishlist(productId) {
    return api.delete(`/customer/wishlist/${productId}/remove`)
  },

  checkInWishlist(productId) {
    return api.get(`/customer/wishlist/${productId}/check`)
  },
}
