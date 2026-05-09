<template>
  <div>
    <h1 class="text-3xl font-bold text-maroon mb-8">Admin Dashboard</h1>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div class="card p-6">
        <h3 class="text-gray-600 text-sm mb-2">Total Orders</h3>
        <p class="text-3xl font-bold text-maroon">{{ stats.total_orders }}</p>
      </div>
      <div class="card p-6">
        <h3 class="text-gray-600 text-sm mb-2">Total Customers</h3>
        <p class="text-3xl font-bold text-maroon">{{ stats.total_customers }}</p>
      </div>
      <div class="card p-6">
        <h3 class="text-gray-600 text-sm mb-2">Total Products</h3>
        <p class="text-3xl font-bold text-maroon">{{ stats.total_products }}</p>
      </div>
      <div class="card p-6">
        <h3 class="text-gray-600 text-sm mb-2">Total Revenue</h3>
        <p class="text-3xl font-bold text-maroon">₹{{ formatNumber(stats.total_revenue) }}</p>
      </div>
    </div>

    <!-- Recent Orders -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="card p-6">
        <h2 class="text-xl font-bold text-maroon mb-4">Recent Orders</h2>
        <div class="space-y-3 max-h-96 overflow-y-auto">
          <div
            v-for="order in stats.recent_orders"
            :key="order.id"
            class="flex justify-between items-center p-2 border-b"
          >
            <div>
              <p class="font-bold">{{ order.order_number }}</p>
              <p class="text-sm text-gray-600">{{ order.user.name }}</p>
            </div>
            <p class="font-bold text-maroon">₹{{ order.total }}</p>
          </div>
        </div>
      </div>

      <!-- Top Products -->
      <div class="card p-6">
        <h2 class="text-xl font-bold text-maroon mb-4">Top Products</h2>
        <div class="space-y-3 max-h-96 overflow-y-auto">
          <div
            v-for="product in stats.top_products"
            :key="product.id"
            class="flex justify-between items-center p-2 border-b"
          >
            <p class="font-bold">{{ product.name }}</p>
            <span class="bg-maroon text-white px-2 py-1 rounded text-sm">
              {{ product.order_items_count }} sales
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import adminService from '@/services/adminService'

const router = useRouter()
const authStore = useAuthStore()

const stats = ref({
  total_orders: 0,
  total_customers: 0,
  total_products: 0,
  total_revenue: 0,
  recent_orders: [],
  top_products: [],
})

const formatNumber = (num) => {
  return Math.round(num).toLocaleString('en-IN')
}

onMounted(async () => {
  if (!authStore.isAdmin) {
    router.push('/')
    return
  }

  try {
    const response = await adminService.getStats()
    stats.value = response.data.data
  } catch (error) {
    console.error('Failed to load dashboard stats:', error)
  }
})
</script>
