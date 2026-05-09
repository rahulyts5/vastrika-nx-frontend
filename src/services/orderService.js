import api from './api'

export default {
  getOrders() {
    return api.get('/customer/orders')
  },

  getOrderById(id) {
    return api.get(`/customer/orders/${id}`)
  },

  createOrder(data) {
    return api.post('/customer/orders/create', data)
  },

  cancelOrder(id) {
    return api.delete(`/customer/orders/${id}/cancel`)
  },
}
