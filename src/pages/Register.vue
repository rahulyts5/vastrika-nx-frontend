<template>
  <div class="w-full max-w-md">
    <div class="card p-8">
      <h1 class="text-3xl font-bold text-maroon text-center mb-6">Register</h1>

      <form @submit.prevent="register" class="space-y-4">
        <div>
          <label class="block text-sm font-bold text-maroon mb-2">Full Name</label>
          <input
            v-model="name"
            type="text"
            required
            class="w-full border-2 border-gray-300 p-3 rounded focus:border-maroon outline-none"
            placeholder="Your Name"
          />
        </div>

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
          <label class="block text-sm font-bold text-maroon mb-2">Phone</label>
          <input
            v-model="phone"
            type="tel"
            required
            class="w-full border-2 border-gray-300 p-3 rounded focus:border-maroon outline-none"
            placeholder="9876543210"
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

        <div>
          <label class="block text-sm font-bold text-maroon mb-2">Confirm Password</label>
          <input
            v-model="passwordConfirm"
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
          {{ loading ? 'Registering...' : 'Register' }}
        </button>
      </form>

      <p class="text-center mt-4">
        Already have an account?
        <router-link to="/auth/login" class="text-maroon font-bold hover:underline">
          Login
        </router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const router = useRouter()
const authStore = useAuthStore()

const name = ref('')
const email = ref('')
const phone = ref('')
const password = ref('')
const passwordConfirm = ref('')
const loading = ref(false)
const error = ref('')

const register = async () => {
  error.value = ''

  if (password.value !== passwordConfirm.value) {
    error.value = 'Passwords do not match'
    return
  }

  loading.value = true

  try {
    await authStore.register({
      name: name.value,
      email: email.value,
      phone: phone.value,
      password: password.value,
      password_confirmation: passwordConfirm.value,
    })

    router.push('/')
  } catch (err) {
    error.value = 'Registration failed. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>
