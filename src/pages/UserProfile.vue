<template>
  <div class="px-4 md:px-8 py-8">
    <h1 class="section-title">My Profile</h1>

    <div v-if="user" class="card p-8 max-w-2xl">
      <h2 class="text-2xl font-bold text-maroon mb-6">Profile Information</h2>

      <form @submit.prevent="updateProfile" class="space-y-4">
        <div>
          <label class="block text-sm font-bold text-maroon mb-2">Name</label>
          <input
            v-model="user.name"
            type="text"
            class="w-full border p-2 rounded"
            disabled
          />
        </div>

        <div>
          <label class="block text-sm font-bold text-maroon mb-2">Email</label>
          <input
            v-model="user.email"
            type="email"
            class="w-full border p-2 rounded"
            disabled
          />
        </div>

        <div>
          <label class="block text-sm font-bold text-maroon mb-2">Phone</label>
          <input
            v-model="user.phone"
            type="tel"
            class="w-full border p-2 rounded"
            disabled
          />
        </div>

        <div class="pt-4 space-y-2">
          <router-link to="/addresses" class="btn-secondary block text-center">
            Manage Addresses
          </router-link>
          <router-link to="/orders" class="btn-secondary block text-center">
            View Orders
          </router-link>
          <button
            @click="logout"
            type="button"
            class="w-full bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const router = useRouter()
const authStore = useAuthStore()

const user = computed(() => authStore.user)

const updateProfile = async () => {
  // Update profile logic here
  alert('Profile updated!')
}

const logout = async () => {
  await authStore.logout()
  router.push('/auth/login')
}

onMounted(() => {
  if (!authStore.isAuthenticated) {
    router.push('/auth/login')
  }
})
</script>
