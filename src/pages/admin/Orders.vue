<template>
  <div>
    <h1 class="text-3xl font-bold text-maroon mb-6">Orders</h1>

    <!-- Filter -->
    <div class="card p-4 mb-6 flex gap-4">
      <select v-model="filterStatus" class="border p-2 rounded">
        <option value="">All Status</option>
        <option value="pending">Pending</option>
        <option value="confirmed">Confirmed</option>
        <option value="shipped">Shipped</option>
        <option value="delivered">Delivered</option>
        <option value="cancelled">Cancelled</option>
      </select>
      <button @click="loadOrders" class="btn-primary">Filter</button>
    </div>

    <!-- Orders Table -->
    <div class="card overflow-x-auto">
      <table class="w-full">
        <thead class="bg-maroon text-white">
          <tr>
            <th class="p-3 text-left">Order #</th>
            <th class="p-3 text-left">Customer</th>
            <th class="p-3 text-left">Total</th>
            <th class="p-3 text-left">Status</th>
            <th class="p-3 text-left">Date</th>
            <th class="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orders" :key="order.id" class="border-b hover:bg-beige">
            <td class="p-3 font-bold">{{ order.order_number }}</td>
            <td class="p-3">{{ order.user.name }}</td>
            <td class="p-3">₹{{ order.total }}</td>
            <td class="p-3">
              <select
                v-model="order.order_status"
                @change="updateOrderStatus(order.id, order.order_status)"
                class="border p-1 rounded text-sm"
              >
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </td>
            <td class="p-3 text-sm">{{ formatDate(order.created_at) }}</td>
            <td class="p-3">
              <button @click="viewOrder(order.id)" class="text-blue-600 hover:underline">View</button>
            </td>
          </tr>
        </tbody>
      </table>
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

const orders = ref([])
const filterStatus = ref('')

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-IN')
}

const loadOrders = async () => {
  try {
    const params = filterStatus.value ? { status: filterStatus.value } : {}
    const response = await adminService.getOrders(params)
    orders.value = response.data.data
  } catch (error) {
    console.error('Failed to load orders:', error)
  }
}

const updateOrderStatus = async (orderId, status) => {
  try {
    await adminService.updateOrderStatus(orderId, status)
  } catch (error) {
    alert('Failed to update order status')
    await loadOrders()
  }
}

const viewOrder = (orderId) => {
  alert(`View order ${orderId}`)
}

onMounted(async () => {
  if (!authStore.isAdmin) {
    router.push('/')
    return
  }
  await loadOrders()
})
</script>
