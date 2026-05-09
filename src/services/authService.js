import api from './api'

export default {
  register(data) {
    return api.post('/register', data)
  },

  login(credentials) {
    return api.post('/login', credentials)
  },

  logout() {
    return api.post('/logout')
  },

  getMe() {
    return api.get('/me')
  },

  getProfile() {
    return api.get('/profile')
  },

  updateProfile(data) {
    return api.put('/profile', data)
  },

  changePassword(data) {
    return api.post('/change-password', data)
  },
}
