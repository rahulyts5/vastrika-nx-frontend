import api from './api'

export default {
  getCart() {
    return api.get('/customer/cart')
  },

  addToCart(productId, quantity) {
    return api.post('/customer/cart/add', { product_id: productId, quantity })
  },

  updateCartItem(itemId, quantity) {
    return api.put(`/customer/cart/items/${itemId}`, { quantity })
  },

  removeFromCart(itemId) {
    return api.delete(`/customer/cart/items/${itemId}`)
  },

  clearCart() {
    return api.delete('/customer/cart/clear')
  },
}
