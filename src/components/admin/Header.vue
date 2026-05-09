<template>
  <header class="bg-maroon text-white shadow-lg px-6 py-4">
    <div class="flex justify-between items-center">
      <h1 class="text-xl font-bold">Admin Panel</h1>
      <div class="flex items-center gap-6">
        <span>{{ user?.name }}</span>
        <button @click="logout" class="bg-red-600 px-4 py-2 rounded hover:bg-red-700">
          Logout
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { computed } from 'vue'

const router = useRouter()
const authStore = useAuthStore()

const user = computed(() => authStore.user)

const logout = async () => {
  await authStore.logout()
  router.push('/auth/login')
}
</script>
