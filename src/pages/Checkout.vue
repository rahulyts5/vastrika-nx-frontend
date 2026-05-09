<template>
  <div class="px-4 md:px-8 py-8">
    <h1 class="section-title">Checkout</h1>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Checkout Form -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Delivery Address -->
        <div class="card p-6">
          <h2 class="text-xl font-bold text-maroon mb-4">Delivery Address</h2>
          <div v-if="addresses.length > 0" class="space-y-3 mb-4">
            <label v-for="address in addresses" :key="address.id" class="flex items-start border p-3 rounded cursor-pointer hover:bg-beige">
              <input
                type="radio"
                v-model="selectedAddressId"
                :value="address.id"
                class="mt-1 mr-3"
              />
              <div>
                <p class="font-bold">{{ address.name }}</p>
                <p>{{ address.address_line_1 }}</p>
                <p>{{ address.city }}, {{ address.state }} {{ address.postal_code }}</p>
              </div>
            </label>
          </div>
          <button
            @click="showAddressForm = !showAddressForm"
            class="btn-secondary"
          >
            {{ showAddressForm ? 'Cancel' : '+ Add New Address' }}
          </button>

          <!-- Add Address Form -->
          <form v-if="showAddressForm" @submit.prevent="addAddress" class="mt-4 space-y-3">
            <input v-model="newAddress.name" placeholder="Name" class="w-full border p-2 rounded" required />
            <input v-model="newAddress.phone" placeholder="Phone" class="w-full border p-2 rounded" required />
            <input v-model="newAddress.email" type="email" placeholder="Email" class="w-full border p-2 rounded" required />
            <input v-model="newAddress.address_line_1" placeholder="Address" class="w-full border p-2 rounded" required />
            <input v-model="newAddress.city" placeholder="City" class="w-full border p-2 rounded" required />
            <input v-model="newAddress.state" placeholder="State" class="w-full border p-2 rounded" required />
            <input v-model="newAddress.postal_code" placeholder="Postal Code" class="w-full border p-2 rounded" required />
            <button type="submit" class="btn-primary w-full">Save Address</button>
          </form>
        </div>

        <!-- Payment Method -->
        <div class="card p-6">
          <h2 class="text-xl font-bold text-maroon mb-4">Payment Method</h2>
          <div class="space-y-3">
            <label class="flex items-center border p-3 rounded cursor-pointer hover:bg-beige">
              <input type="radio" v-model="paymentMethod" value="cod" class="mr-3" />
              <div>
                <p class="font-bold">Cash on Delivery</p>
                <p class="text-sm text-gray-600">Pay when you receive your order</p>
              </div>
            </label>
            <label class="flex items-center border p-3 rounded cursor-pointer hover:bg-beige">
              <input type="radio" v-model="paymentMethod" value="razorpay" class="mr-3" />
              <div>
                <p class="font-bold">Razorpay</p>
                <p class="text-sm text-gray-600">Pay online securely</p>
              </div>
            </label>
          </div>
        </div>
      </div>

      <!-- Order Summary -->
      <div class="card p-6 h-fit sticky top-8">
        <h2 class="text-xl font-bold text-maroon mb-4">Order Summary</h2>

        <div class="space-y-3 mb-4 pb-4 border-b max-h-60 overflow-y-auto">
          <div v-for="item in cartItems" :key="item.id" class="flex justify-between text-sm">
            <span>{{ item.product.name }} (x{{ item.quantity }})</span>
            <span>₹{{ (item.price * item.quantity).toFixed(2) }}</span>
          </div>
        </div>

        <div class="space-y-2 mb-4 pb-4 border-b">
          <div class="flex justify-between">
            <span>Subtotal:</span>
            <span>₹{{ subtotal.toFixed(2) }}</span>
          </div>
          <div class="flex justify-between">
            <span>Tax:</span>
            <span>₹{{ tax.toFixed(2) }}</span>
          </div>
          <div class="flex justify-between">
            <span>Shipping:</span>
            <span>{{ shipping === 0 ? 'Free' : '₹' + shipping.toFixed(2) }}</span>
          </div>
        </div>

        <div class="flex justify-between text-lg font-bold text-maroon mb-6">
          <span>Total:</span>
          <span>₹{{ total.toFixed(2) }}</span>
        </div>

        <button
          @click="placeOrder"
          :disabled="!selectedAddressId || loading"
          class="btn-primary w-full disabled:opacity-50"
        >
          {{ loading ? 'Processing...' : 'Place Order' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cartStore'
import addressService from '@/services/addressService'
import orderService from '@/services/orderService'

const router = useRouter()
const cartStore = useCartStore()

const cartItems = computed(() => cartStore.items)
const addresses = ref([])
const selectedAddressId = ref(null)
const paymentMethod = ref('cod')
const showAddressForm = ref(false)
const loading = ref(false)
const newAddress = ref({
  name: '',
  phone: '',
  email: '',
  address_line_1: '',
  city: '',
  state: '',
  postal_code: '',
  country: 'India',
  address_type: 'home',
})

const subtotal = computed(() => {
  return cartItems.value.reduce((sum, item) => sum + (item.price * item.quantity), 0)
})

const tax = computed(() => subtotal.value * 0.18)
const shipping = computed(() => subtotal.value > 500 ? 0 : 100)
const total = computed(() => subtotal.value + tax.value + shipping.value)

onMounted(async () => {
  try {
    const response = await addressService.getAddresses()
    addresses.value = response.data.data
    if (addresses.value.length > 0) {
      selectedAddressId.value = addresses.value.find(a => a.is_default)?.id || addresses.value[0].id
    }
  } catch (error) {
    console.error('Failed to load addresses:', error)
  }
})

const addAddress = async () => {
  try {
    await addressService.addAddress(newAddress.value)
    const response = await addressService.getAddresses()
    addresses.value = response.data.data
    showAddressForm.value = false
    newAddress.value = {
      name: '',
      phone: '',
      email: '',
      address_line_1: '',
      city: '',
      state: '',
      postal_code: '',
      country: 'India',
      address_type: 'home',
    }
  } catch (error) {
    alert('Failed to add address')
  }
}

const placeOrder = async () => {
  if (!selectedAddressId.value) {
    alert('Please select an address')
    return
  }

  loading.value = true
  try {
    await orderService.createOrder({
      address_id: selectedAddressId.value,
      payment_method: paymentMethod.value,
    })
    await cartStore.clear()
    alert('Order placed successfully!')
    router.push('/orders')
  } catch (error) {
    alert('Failed to place order')
  } finally {
    loading.value = false
  }
}
</script>
