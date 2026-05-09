<template>
  <section class="bg-gold text-black rounded-lg p-8">
    <h2 class="text-2xl font-bold mb-4">Subscribe to Our Newsletter</h2>
    <p class="mb-4">Get updates on new collections and exclusive offers</p>

    <form @submit.prevent="subscribe" class="flex flex-col md:flex-row gap-3">
      <input
        v-model="email"
        type="email"
        placeholder="Enter your email"
        class="flex-grow px-4 py-2 rounded text-black"
        required
      />
      <button type="submit" class="btn-primary">Subscribe</button>
    </form>
    <p v-if="message" :class="['mt-3', messageType === 'success' ? 'text-green-700' : 'text-red-700']">
      {{ message }}
    </p>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
const message = ref('')
const messageType = ref('')

const subscribe = async () => {
  message.value = 'Subscribed successfully!'
  messageType.value = 'success'
  email.value = ''

  setTimeout(() => {
    message.value = ''
  }, 3000)
}
</script>
