<template>
  <div class="space-y-12 py-8">
    <!-- Hero Banner -->
    <HeroBanner />

    <!-- Featured Products -->
    <section class="px-4 md:px-8">
      <h2 class="section-title">Featured Collections</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ProductCard v-for="product in featured" :key="product.id" :product="product" />
      </div>
    </section>

    <!-- Trending Products -->
    <section class="px-4 md:px-8">
      <h2 class="section-title">Trending Now</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ProductCard v-for="product in trending" :key="product.id" :product="product" />
      </div>
    </section>

    <!-- New Arrivals -->
    <section class="px-4 md:px-8">
      <h2 class="section-title">New Arrivals</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ProductCard v-for="product in latest" :key="product.id" :product="product" />
      </div>
    </section>

    <!-- Categories Section -->
    <section class="px-4 md:px-8 bg-maroon text-white py-12 rounded-lg">
      <h2 class="text-2xl font-bold mb-8">Shop by Category</h2>
      <div class="grid grid-cols-2 md:grid-cols-3 gap-6">
        <div
          v-for="category in categories"
          :key="category.id"
          class="cursor-pointer hover:opacity-80 transition"
          @click="$router.push(`/shop?category=${category.id}`)"
        >
          <div class="bg-white text-maroon p-6 rounded text-center">
            <p class="font-bold">{{ category.name }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Newsletter Section -->
    <Newsletter />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useProductStore } from '@/stores/productStore'
import HeroBanner from '@/components/HeroBanner.vue'
import ProductCard from '@/components/ProductCard.vue'
import Newsletter from '@/components/Newsletter.vue'
import categoryService from '@/services/categoryService'

const productStore = useProductStore()
const categories = ref([])

onMounted(async () => {
  await productStore.getFeatured()
  await productStore.getTrending()
  await productStore.getLatest()
  
  try {
    const response = await categoryService.getCategories()
    categories.value = response.data.data
  } catch (error) {
    console.error('Failed to load categories:', error)
  }
})
</script>
