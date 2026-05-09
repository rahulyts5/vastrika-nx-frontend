import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import authService from '@/services/authService'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const token = ref(localStorage.getItem('auth_token'))
  const loading = ref(false)

  const isAuthenticated = computed(() => !!token.value)
  const isAdmin = computed(() => user.value?.role === 'admin')

  const register = async (data) => {
    loading.value = true
    try {
      const response = await authService.register(data)
      token.value = response.data.token
      user.value = response.data.user
      localStorage.setItem('auth_token', token.value)
      return response.data
    } finally {
      loading.value = false
    }
  }

  const login = async (credentials) => {
    loading.value = true
    try {
      const response = await authService.login(credentials)
      token.value = response.data.token
      user.value = response.data.user
      localStorage.setItem('auth_token', token.value)
      return response.data
    } finally {
      loading.value = false
    }
  }

  const logout = async () => {
    loading.value = true
    try {
      await authService.logout()
    } finally {
      token.value = null
      user.value = null
      localStorage.removeItem('auth_token')
      loading.value = false
    }
  }

  const fetchMe = async () => {
    try {
      const response = await authService.getMe()
      user.value = response.data.user
    } catch (error) {
      token.value = null
      localStorage.removeItem('auth_token')
    }
  }

  return {
    user,
    token,
    loading,
    isAuthenticated,
    isAdmin,
    register,
    login,
    logout,
    fetchMe,
  }
})
