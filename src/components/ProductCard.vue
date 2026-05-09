<template>
  <div class="card overflow-hidden hover:shadow-xl transition cursor-pointer" @click="$router.push(`/product/${product.id}`)">
    <div class="relative h-64 bg-gray-100 overflow-hidden">
      <img
        :src="product.thumbnail"
        :alt="product.name"
        class="w-full h-full object-cover hover:scale-110 transition duration-300"
      />
      <div v-if="product.discount_percentage" class="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-sm font-bold">
        -{{ Math.round(product.discount_percentage) }}%
      </div>
      <button
        @click.stop="toggleWishlist"
        class="absolute top-2 left-2 text-2xl"
      >
        {{ inWishlist ? '❤️' : '🤍' }}
      </button>
    </div>

    <div class="p-4">
      <h3 class="font-bold text-maroon text-lg line-clamp-2">{{ product.name }}</h3>
      <p v-if="product.fabric" class="text-sm text-gray-600 mb-2">
        {{ product.fabric }} • {{ product.color }}
      </p>

      <div class="flex justify-between items-center mb-3">
        <div>
          <span v-if="product.discount_price" class="text-lg font-bold text-maroon">
            ₹{{ product.discount_price }}
          </span>
          <span v-else class="text-lg font-bold text-maroon">
            ₹{{ product.price }}
          </span>
          <span v-if="product.discount_price" class="ml-2 line-through text-gray-500 text-sm">
            ₹{{ product.price }}
          </span>
        </div>
      </div>

      <button
        @click.stop="addToCart"
        :disabled="product.stock === 0"
        class="w-full btn-primary disabled:opacity-50"
      >
        {{ product.stock > 0 ? 'Add to Cart' : 'Out of Stock' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useCartStore } from '@/stores/cartStore'
import { useWishlistStore } from '@/stores/wishlistStore'

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
})

const cartStore = useCartStore()
const wishlistStore = useWishlistStore()

const inWishlist = ref(false)

onMounted(async () => {
  if (wishlistStore.items.length === 0) {
    await wishlistStore.getWishlist()
  }
  inWishlist.value = wishlistStore.items.some(item => item.id === props.product.id)
})

const addToCart = async () => {
  try {
    await cartStore.addToCart(props.product.id, 1)
    alert('Added to cart!')
  } catch (error) {
    alert('Failed to add to cart')
  }
}

const toggleWishlist = async () => {
  try {
    if (inWishlist.value) {
      await wishlistStore.removeFromWishlist(props.product.id)
    } else {
      await wishlistStore.addToWishlist(props.product.id)
    }
    inWishlist.value = !inWishlist.value
  } catch (error) {
    alert('Failed to update wishlist')
  }
}
</script>
