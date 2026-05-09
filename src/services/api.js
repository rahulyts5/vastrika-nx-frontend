import axios from 'axios'
import { API_BASE_URL } from '@/config'

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
})

// Add token to requests
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => Promise.reject(error)
)

export default api
