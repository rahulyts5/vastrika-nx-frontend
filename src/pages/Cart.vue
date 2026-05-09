<template>
  <div class="px-4 md:px-8 py-8">
    <h1 class="section-title">Shopping Cart</h1>

    <div v-if="cartItems.length === 0" class="text-center py-12">
      <p class="text-xl text-gray-600 mb-4">Your cart is empty</p>
      <router-link to="/shop" class="btn-primary">Continue Shopping</router-link>
    </div>

    <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Cart Items -->
      <div class="lg:col-span-2">
        <div class="space-y-4">
          <div v-for="item in cartItems" :key="item.id" class="card p-4 flex gap-4">
            <img
              :src="item.product.thumbnail"
              :alt="item.product.name"
              class="w-24 h-24 object-cover rounded"
            />
            <div class="flex-grow">
              <h3 class="font-bold text-maroon">{{ item.product.name }}</h3>
              <p class="text-gray-600">₹{{ item.price }} x {{ item.quantity }}</p>
              <p class="font-bold text-maroon">₹{{ (item.price * item.quantity).toFixed(2) }}</p>
            </div>
            <div class="flex flex-col justify-between">
              <div class="flex items-center border rounded">
                <button
                  @click="updateItem(item.id, item.quantity - 1)"
                  :disabled="item.quantity <= 1"
                  class="px-2 py-1"
                >
                  −
                </button>
                <span class="px-3">{{ item.quantity }}</span>
                <button @click="updateItem(item.id, item.quantity + 1)" class="px-2 py-1">+</button>
              </div>
              <button
                @click="removeItem(item.id)"
                class="text-red-600 hover:text-red-800 text-sm"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Order Summary -->
      <div class="card p-6 h-fit sticky top-8">
        <h2 class="text-xl font-bold text-maroon mb-4">Order Summary</h2>

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
            <span>₹{{ shipping.toFixed(2) }}</span>
          </div>
        </div>

        <div class="flex justify-between text-lg font-bold text-maroon mb-6">
          <span>Total:</span>
          <span>₹{{ total.toFixed(2) }}</span>
        </div>

        <router-link to="/checkout" class="btn-primary w-full block text-center mb-2">
          Proceed to Checkout
        </router-link>
        <button @click="continueShopping" class="btn-secondary w-full">Continue Shopping</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cartStore'

const router = useRouter()
const cartStore = useCartStore()

const cartItems = computed(() => cartStore.items)

const subtotal = computed(() => {
  return cartItems.value.reduce((sum, item) => sum + (item.price * item.quantity), 0)
})

const tax = computed(() => subtotal.value * 0.18) // 18% GST
const shipping = computed(() => subtotal.value > 500 ? 0 : 100)
const total = computed(() => subtotal.value + tax.value + shipping.value)

const updateItem = async (itemId, quantity) => {
  if (quantity < 1) return
  await cartStore.updateItem(itemId, quantity)
}

const removeItem = async (itemId) => {
  await cartStore.removeItem(itemId)
}

const continueShopping = () => {
  router.push('/shop')
}
</script>
