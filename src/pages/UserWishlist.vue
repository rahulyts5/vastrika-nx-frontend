<template>
  <div class="px-4 md:px-8 py-8">
    <h1 class="section-title">My Wishlist</h1>

    <div v-if="loading" class="text-center py-12">Loading wishlist...</div>
    <div v-else-if="wishlistItems.length === 0" class="text-center py-12">
      <p class="text-xl text-gray-600 mb-4">Your wishlist is empty</p>
      <router-link to="/shop" class="btn-primary">Continue Shopping</router-link>
    </div>
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <ProductCard v-for="product in wishlistItems" :key="product.id" :product="product" />
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { useWishlistStore } from '@/stores/wishlistStore'
import ProductCard from '@/components/ProductCard.vue'

const router = useRouter()
const authStore = useAuthStore()
const wishlistStore = useWishlistStore()

const wishlistItems = computed(() => wishlistStore.items)
const loading = computed(() => wishlistStore.loading)

onMounted(async () => {
  if (!authStore.isAuthenticated) {
    router.push('/auth/login')
    return
  }
  await wishlistStore.getWishlist()
})
</script>
