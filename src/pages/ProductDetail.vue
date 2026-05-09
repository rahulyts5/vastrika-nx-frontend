<template>
  <div class="px-4 md:px-8 py-8">
    <div v-if="loading" class="text-center py-12">Loading product...</div>
    <div v-else-if="!product" class="text-center py-12">Product not found.</div>
    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- Image Gallery -->
      <div>
        <div class="bg-gray-100 h-96 rounded-lg mb-4 flex items-center justify-center">
          <img
            :src="selectedImage"
            :alt="product.name"
            class="max-h-96 max-w-full object-cover"
          />
        </div>
        <div class="flex gap-2">
          <img
            v-for="image in product.images"
            :key="image.id"
            :src="image.image"
            :alt="image.alt_text"
            class="w-16 h-16 object-cover rounded cursor-pointer border-2"
            :class="{ 'border-maroon': selectedImage === image.image }"
            @click="selectedImage = image.image"
          />
        </div>
      </div>

      <!-- Product Details -->
      <div>
        <h1 class="text-3xl font-bold text-maroon mb-2">{{ product.name }}</h1>
        <p class="text-gray-600 mb-4">SKU: {{ product.sku }}</p>

        <!-- Price -->
        <div class="mb-4">
          <span v-if="product.discount_price" class="text-2xl font-bold text-maroon">
            ₹{{ product.discount_price }}
          </span>
          <span v-else class="text-2xl font-bold text-maroon">₹{{ product.price }}</span>
          <span v-if="product.discount_price" class="ml-2 line-through text-gray-500">
            ₹{{ product.price }}
          </span>
          <span v-if="product.discount_percentage" class="ml-2 text-green-600 font-bold">
            Save {{ Math.round(product.discount_percentage) }}%
          </span>
        </div>

        <!-- Description -->
        <p class="text-gray-700 mb-4">{{ product.description }}</p>

        <!-- Specifications -->
        <div class="bg-beige p-4 rounded mb-4 space-y-2">
          <p><strong>Fabric:</strong> {{ product.fabric }}</p>
          <p><strong>Color:</strong> {{ product.color }}</p>
          <p><strong>Occasion:</strong> {{ product.occasion }}</p>
          <p v-if="product.blouse_included">
            <strong>✓ Blouse Included</strong>
          </p>
        </div>

        <!-- Stock Status -->
        <div class="mb-4">
          <span v-if="product.stock > 5" class="text-green-600 font-bold">
            In Stock
          </span>
          <span v-else-if="product.stock > 0" class="text-orange-600 font-bold">
            Low Stock ({{ product.stock }} left)
          </span>
          <span v-else class="text-red-600 font-bold">Out of Stock</span>
        </div>

        <!-- Quantity Selector -->
        <div class="flex items-center gap-4 mb-6">
          <label>Quantity:</label>
          <div class="flex items-center border rounded">
            <button @click="quantity > 1 && quantity--" class="px-3 py-2">−</button>
            <input v-model.number="quantity" type="number" min="1" class="w-12 text-center border-x" />
            <button @click="quantity < product.stock && quantity++" class="px-3 py-2">+</button>
          </div>
        </div>

        <!-- Buttons -->
        <div class="flex gap-4 mb-6">
          <button
            @click="addToCart"
            :disabled="product.stock === 0 || cartLoading"
            class="flex-grow btn-primary disabled:opacity-50"
          >
            {{ cartLoading ? 'Adding...' : 'Add to Cart' }}
          </button>
          <button
            @click="toggleWishlist"
            class="px-6 btn-secondary"
          >
            {{ inWishlist ? '❤️' : '🤍' }}
          </button>
        </div>

        <!-- Reviews -->
        <div v-if="product.images" class="mt-8">
          <h3 class="text-xl font-bold text-maroon mb-4">Customer Reviews</h3>
          <div v-if="product.images.length === 0" class="text-gray-500">
            No reviews yet. Be the first to review!
          </div>
        </div>
      </div>
    </div>

    <!-- Related Products -->
    <div v-if="relatedProducts.length > 0" class="mt-12">
      <h2 class="section-title">Related Products</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ProductCard v-for="prod in relatedProducts" :key="prod.id" :product="prod" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useCartStore } from '@/stores/cartStore'
import { useWishlistStore } from '@/stores/wishlistStore'
import ProductCard from '@/components/ProductCard.vue'
import productService from '@/services/productService'
import wishlistService from '@/services/wishlistService'

const route = useRoute()
const cartStore = useCartStore()
const wishlistStore = useWishlistStore()

const product = ref(null)
const selectedImage = ref(null)
const quantity = ref(1)
const relatedProducts = ref([])
const loading = ref(false)
const cartLoading = ref(false)
const inWishlist = ref(false)

onMounted(async () => {
  loading.value = true
  try {
    const response = await productService.getProductById(route.params.id)
    product.value = response.data.data
    selectedImage.value = product.value.thumbnail || product.value.images[0]?.image

    // Get related products
    const relatedResponse = await productService.getRelatedProducts(route.params.id)
    relatedProducts.value = relatedResponse.data.data

    // Check if in wishlist
    if (wishlistStore.items.length === 0) {
      await wishlistStore.getWishlist()
    }
    inWishlist.value = wishlistStore.items.some(item => item.id === product.value.id)
  } finally {
    loading.value = false
  }
})

const addToCart = async () => {
  cartLoading.value = true
  try {
    await cartStore.addToCart(product.value.id, quantity.value)
    alert('Product added to cart!')
  } catch (error) {
    alert('Failed to add to cart')
  } finally {
    cartLoading.value = false
  }
}

const toggleWishlist = async () => {
  try {
    if (inWishlist.value) {
      await wishlistStore.removeFromWishlist(product.value.id)
    } else {
      await wishlistStore.addToWishlist(product.value.id)
    }
    inWishlist.value = !inWishlist.value
  } catch (error) {
    alert('Failed to update wishlist')
  }
}
</script>
