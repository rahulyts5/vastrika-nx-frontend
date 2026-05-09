<template>
  <header class="bg-maroon text-white shadow-lg">
    <div class="px-4 md:px-8 py-4">
      <div class="flex justify-between items-center">
        <router-link to="/" class="text-2xl font-bold flex items-center gap-2">
          💎 Vastrika NX
        </router-link>

        <!-- Search Bar (Desktop) -->
        <div class="hidden md:flex flex-grow mx-8">
          <input
            v-model="searchQuery"
            @keyup.enter="search"
            type="text"
            placeholder="Search sarees..."
            class="flex-grow px-4 py-2 rounded-l text-black"
          />
          <button @click="search" class="bg-gold text-black px-6 py-2 rounded-r hover:bg-yellow-500">
            🔍
          </button>
        </div>

        <!-- Nav Items -->
        <nav class="flex items-center gap-6">
          <router-link to="/shop" class="hover:text-gold transition">Shop</router-link>

          <!-- Cart -->
          <router-link to="/cart" class="relative">
            🛒 Cart
            <span v-if="cartCount" class="absolute -top-2 -right-2 bg-gold text-black text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
              {{ cartCount }}
            </span>
          </router-link>

          <!-- Wishlist -->
          <router-link v-if="isAuthenticated" to="/wishlist" class="relative">
            ❤️ Wish
            <span v-if="wishlistCount" class="absolute -top-2 -right-2 bg-gold text-black text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
              {{ wishlistCount }}
            </span>
          </router-link>

          <!-- User Menu -->
          <div v-if="isAuthenticated" class="relative">
            <button @click="showUserMenu = !showUserMenu" class="flex items-center gap-2">
              👤 {{ user?.name?.split(' ')[0] }}
            </button>
            <div
              v-if="showUserMenu"
              class="absolute right-0 mt-2 bg-white text-black rounded shadow-lg z-10"
            >
              <router-link
                to="/profile"
                class="block px-4 py-2 hover:bg-beige"
                @click="showUserMenu = false"
              >
                Profile
              </router-link>
              <router-link
                to="/orders"
                class="block px-4 py-2 hover:bg-beige"
                @click="showUserMenu = false"
              >
                Orders
              </router-link>
              <router-link
                v-if="isAdmin"
                to="/admin"
                class="block px-4 py-2 hover:bg-beige"
                @click="showUserMenu = false"
              >
                Admin
              </router-link>
              <button
                @click="logout"
                class="w-full text-left px-4 py-2 hover:bg-beige text-red-600"
              >
                Logout
              </button>
            </div>
          </div>
          <router-link v-else to="/auth/login" class="hover:text-gold transition">
            Login
          </router-link>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { useCartStore } from '@/stores/cartStore'
import { useWishlistStore } from '@/stores/wishlistStore'

const router = useRouter()
const authStore = useAuthStore()
const cartStore = useCartStore()
const wishlistStore = useWishlistStore()

const searchQuery = ref('')
const showUserMenu = ref(false)

const isAuthenticated = computed(() => authStore.isAuthenticated)
const user = computed(() => authStore.user)
const isAdmin = computed(() => authStore.isAdmin)
const cartCount = computed(() => cartStore.itemCount)
const wishlistCount = computed(() => wishlistStore.items.length)

const search = () => {
  if (searchQuery.value) {
    router.push(`/shop?search=${searchQuery.value}`)
  }
}

const logout = async () => {
  await authStore.logout()
  showUserMenu.value = false
  router.push('/')
}
</script>
