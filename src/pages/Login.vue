<template>
  <div class="w-full max-w-md">
    <div class="card p-8">
      <h1 class="text-3xl font-bold text-maroon text-center mb-6">Login</h1>

      <form @submit.prevent="login" class="space-y-4">
        <div>
          <label class="block text-sm font-bold text-maroon mb-2">Email</label>
          <input
            v-model="email"
            type="email"
            required
            class="w-full border-2 border-gray-300 p-3 rounded focus:border-maroon outline-none"
            placeholder="your@email.com"
          />
        </div>

        <div>
          <label class="block text-sm font-bold text-maroon mb-2">Password</label>
          <input
            v-model="password"
            type="password"
            required
            class="w-full border-2 border-gray-300 p-3 rounded focus:border-maroon outline-none"
            placeholder="••••••••"
          />
        </div>

        <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded">
          {{ error }}
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="btn-primary w-full disabled:opacity-50"
        >
          {{ loading ? 'Logging in...' : 'Login' }}
        </button>
      </form>

      <p class="text-center mt-4">
        Don't have an account?
        <router-link to="/auth/register" class="text-maroon font-bold hover:underline">
          Register
        </router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

const login = async () => {
  error.value = ''
  loading.value = true

  try {
    await authStore.login({
      email: email.value,
      password: password.value,
    })

    const redirect = route.query.redirect || '/'
    router.push(redirect)
  } catch (err) {
    error.value = 'Invalid credentials'
  } finally {
    loading.value = false
  }
}
</script>
