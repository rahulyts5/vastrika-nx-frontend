<template>
  <div class="px-4 md:px-8 py-8">
    <h1 class="section-title">My Orders</h1>

    <div v-if="loading" class="text-center py-12">Loading orders...</div>
    <div v-else-if="orders.length === 0" class="text-center py-12">
      <p class="text-xl text-gray-600 mb-4">You haven't placed any orders yet</p>
      <router-link to="/shop" class="btn-primary">Start Shopping</router-link>
    </div>
    <div v-else class="space-y-4">
      <div v-for="order in orders" :key="order.id" class="card p-6">
        <div class="flex flex-col md:flex-row justify-between md:items-center mb-4">
          <div>
            <h3 class="font-bold text-maroon">Order #{{ order.order_number }}</h3>
            <p class="text-sm text-gray-600">{{ formatDate(order.created_at) }}</p>
          </div>
          <div class="text-right mt-2 md:mt-0">
            <p class="font-bold text-maroon text-lg">₹{{ order.total }}</p>
            <span :class="getStatusColor(order.order_status)" class="inline-block px-2 py-1 rounded text-sm text-white font-bold">
              {{ order.order_status.toUpperCase() }}
            </span>
          </div>
        </div>

        <div class="border-t pt-4">
          <p class="text-sm text-gray-600 mb-2">
            <strong>Items:</strong> {{ order.items.length }}
          </p>
          <p class="text-sm text-gray-600">
            <strong>Delivery to:</strong> {{ order.address.city }}, {{ order.address.state }}
          </p>
        </div>

        <button @click="viewOrder(order.id)" class="btn-secondary mt-4 text-sm">
          View Details
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import orderService from '@/services/orderService'

const router = useRouter()
const authStore = useAuthStore()

const orders = ref([])
const loading = ref(false)

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const getStatusColor = (status) => {
  const colors = {
    pending: 'bg-yellow-500',
    confirmed: 'bg-blue-500',
    shipped: 'bg-purple-500',
    delivered: 'bg-green-500',
    cancelled: 'bg-red-500',
  }
  return colors[status] || 'bg-gray-500'
}

const viewOrder = (orderId) => {
  // Navigate to order detail page
  alert(`View order ${orderId}`)
}

onMounted(async () => {
  if (!authStore.isAuthenticated) {
    router.push('/auth/login')
    return
  }

  loading.value = true
  try {
    const response = await orderService.getOrders()
    orders.value = response.data.data
  } catch (error) {
    console.error('Failed to load orders:', error)
  } finally {
    loading.value = false
  }
})
</script>
