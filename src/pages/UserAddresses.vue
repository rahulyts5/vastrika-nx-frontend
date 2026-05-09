<template>
  <div class="px-4 md:px-8 py-8">
    <h1 class="section-title">My Addresses</h1>

    <button @click="showForm = !showForm" class="btn-secondary mb-6">
      {{ showForm ? 'Cancel' : '+ Add New Address' }}
    </button>

    <!-- Add Address Form -->
    <div v-if="showForm" class="card p-6 mb-6">
      <h2 class="font-bold text-maroon mb-4">Add New Address</h2>
      <form @submit.prevent="addAddress" class="space-y-3 grid grid-cols-1 md:grid-cols-2 gap-3">
        <input v-model="newAddress.name" placeholder="Full Name" class="border p-2 rounded" required />
        <input v-model="newAddress.phone" placeholder="Phone" class="border p-2 rounded" required />
        <input v-model="newAddress.email" type="email" placeholder="Email" class="border p-2 rounded md:col-span-2" required />
        <input v-model="newAddress.address_line_1" placeholder="Address Line 1" class="border p-2 rounded md:col-span-2" required />
        <input v-model="newAddress.address_line_2" placeholder="Address Line 2 (Optional)" class="border p-2 rounded md:col-span-2" />
        <input v-model="newAddress.city" placeholder="City" class="border p-2 rounded" required />
        <input v-model="newAddress.state" placeholder="State" class="border p-2 rounded" required />
        <input v-model="newAddress.postal_code" placeholder="Postal Code" class="border p-2 rounded" required />
        <select v-model="newAddress.address_type" class="border p-2 rounded">
          <option value="home">Home</option>
          <option value="office">Office</option>
          <option value="other">Other</option>
        </select>
        <label class="flex items-center">
          <input v-model="newAddress.is_default" type="checkbox" class="mr-2" />
          Set as default
        </label>
        <button type="submit" class="btn-primary md:col-span-2">Save Address</button>
      </form>
    </div>

    <!-- Addresses List -->
    <div v-if="addresses.length === 0" class="text-center py-8">
      <p class="text-gray-600 mb-4">No addresses yet</p>
    </div>
    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div v-for="address in addresses" :key="address.id" class="card p-6 relative">
        <div v-if="address.is_default" class="absolute top-2 right-2 bg-gold text-black px-2 py-1 rounded text-xs font-bold">
          DEFAULT
        </div>
        <h3 class="font-bold text-maroon mb-2">{{ address.name }}</h3>
        <p class="text-sm mb-1">{{ address.address_line_1 }}</p>
        <p v-if="address.address_line_2" class="text-sm mb-1">{{ address.address_line_2 }}</p>
        <p class="text-sm mb-1">{{ address.city }}, {{ address.state }} {{ address.postal_code }}</p>
        <p class="text-sm text-gray-600 mb-3">{{ address.phone }}</p>

        <div class="flex gap-2">
          <button @click="editAddress(address.id)" class="btn-secondary text-sm">Edit</button>
          <button @click="deleteAddress(address.id)" class="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm">
            Delete
          </button>
          <button
            v-if="!address.is_default"
            @click="setDefault(address.id)"
            class="btn-secondary text-sm"
          >
            Set Default
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import addressService from '@/services/addressService'

const router = useRouter()
const authStore = useAuthStore()

const addresses = ref([])
const showForm = ref(false)
const newAddress = ref({
  name: '',
  phone: '',
  email: '',
  address_line_1: '',
  address_line_2: '',
  city: '',
  state: '',
  postal_code: '',
  country: 'India',
  address_type: 'home',
  is_default: false,
})

const loadAddresses = async () => {
  try {
    const response = await addressService.getAddresses()
    addresses.value = response.data.data
  } catch (error) {
    console.error('Failed to load addresses:', error)
  }
}

const addAddress = async () => {
  try {
    await addressService.addAddress(newAddress.value)
    await loadAddresses()
    showForm.value = false
    newAddress.value = {
      name: '',
      phone: '',
      email: '',
      address_line_1: '',
      address_line_2: '',
      city: '',
      state: '',
      postal_code: '',
      country: 'India',
      address_type: 'home',
      is_default: false,
    }
  } catch (error) {
    alert('Failed to add address')
  }
}

const editAddress = (id) => {
  // Edit logic
  alert(`Edit address ${id}`)
}

const deleteAddress = async (id) => {
  if (confirm('Are you sure?')) {
    try {
      await addressService.deleteAddress(id)
      await loadAddresses()
    } catch (error) {
      alert('Failed to delete address')
    }
  }
}

const setDefault = async (id) => {
  try {
    await addressService.setDefaultAddress(id)
    await loadAddresses()
  } catch (error) {
    alert('Failed to set default')
  }
}

onMounted(async () => {
  if (!authStore.isAuthenticated) {
    router.push('/auth/login')
    return
  }
  await loadAddresses()
})
</script>
