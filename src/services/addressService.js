import api from './api'

export default {
  getAddresses() {
    return api.get('/customer/addresses')
  },

  addAddress(data) {
    return api.post('/customer/addresses/create', data)
  },

  updateAddress(id, data) {
    return api.put(`/customer/addresses/${id}`, data)
  },

  deleteAddress(id) {
    return api.delete(`/customer/addresses/${id}`)
  },

  setDefaultAddress(id) {
    return api.post(`/customer/addresses/${id}/set-default`)
  },
}
