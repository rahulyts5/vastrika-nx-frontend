<template>
  <div>
    <h1 class="text-3xl font-bold text-maroon mb-6">Customers</h1>

    <!-- Customers Table -->
    <div class="card overflow-x-auto">
      <table class="w-full">
        <thead class="bg-maroon text-white">
          <tr>
            <th class="p-3 text-left">Name</th>
            <th class="p-3 text-left">Email</th>
            <th class="p-3 text-left">Phone</th>
            <th class="p-3 text-left">Status</th>
            <th class="p-3 text-left">Joined</th>
            <th class="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="customer in customers" :key="customer.id" class="border-b hover:bg-beige">
            <td class="p-3">{{ customer.name }}</td>
            <td class="p-3">{{ customer.email }}</td>
            <td class="p-3">{{ customer.phone }}</td>
            <td class="p-3">
              <select
                v-model="customer.status"
                @change="updateCustomerStatus(customer.id, customer.status)"
                class="border p-1 rounded text-sm"
              >
                <option :value="true">Active</option>
                <option :value="false">Inactive</option>
              </select>
            </td>
            <td class="p-3 text-sm">{{ formatDate(customer.created_at) }}</td>
            <td class="p-3">
              <button class="text-blue-600 hover:underline">View</button>
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

const customers = ref([])

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-IN')
}

const loadCustomers = async () => {
  try {
    const response = await adminService.getCustomers()
    customers.value = response.data.data
  } catch (error) {
    console.error('Failed to load customers:', error)
  }
}

const updateCustomerStatus = async (customerId, status) => {
  try {
    await adminService.updateCustomerStatus(customerId, status)
  } catch (error) {
    alert('Failed to update customer status')
    await loadCustomers()
  }
}

onMounted(async () => {
  if (!authStore.isAdmin) {
    router.push('/')
    return
  }
  await loadCustomers()
})
</script>
