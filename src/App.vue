<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()

onMounted(async () => {
  if (authStore.token) {
    try {
      await authStore.fetchMe()
    } catch (error) {
      authStore.logout()
    }
  }
})
</script>

<style>
@import '@/index.css';
</style>
