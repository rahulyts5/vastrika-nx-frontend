<template>
  <div class="px-4 md:px-8 py-8">
    <h1 class="section-title">Shop Our Collection</h1>

    <div class="flex flex-col md:flex-row gap-8">
      <!-- Sidebar Filters -->
      <aside class="w-full md:w-64">
        <div class="card p-6 space-y-6">
          <!-- Category Filter -->
          <div>
            <h3 class="font-bold text-maroon mb-4">Categories</h3>
            <div class="space-y-2">
              <label v-for="cat in categories" :key="cat.id" class="flex items-center">
                <input
                  type="checkbox"
                  :value="cat.id"
                  v-model="filters.category"
                  class="mr-2"
                />
                {{ cat.name }}
              </label>
            </div>
          </div>

          <!-- Price Filter -->
          <div>
            <h3 class="font-bold text-maroon mb-4">Price Range</h3>
            <input v-model.number="filters.price_min" type="number" placeholder="Min" class="w-full border p-2 mb-2" />
            <input v-model.number="filters.price_max" type="number" placeholder="Max" class="w-full border p-2" />
          </div>

          <!-- Sort -->
          <div>
            <h3 class="font-bold text-maroon mb-4">Sort</h3>
            <select v-model="filters.sort" class="w-full border p-2">
              <option value="">Default</option>
              <option value="latest">Latest</option>
              <option value="price_low_to_high">Price: Low to High</option>
              <option value="price_high_to_low">Price: High to Low</option>
              <option value="trending">Trending</option>
            </select>
          </div>

          <button @click="applyFilters" class="btn-primary w-full">Apply Filters</button>
        </div>
      </aside>

      <!-- Products Grid -->
      <div class="flex-grow">
        <div v-if="loading" class="text-center py-12">Loading products...</div>
        <div v-else-if="products.length === 0" class="text-center py-12">No products found.</div>
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ProductCard v-for="product in products" :key="product.id" :product="product" />
        </div>

        <!-- Pagination -->
        <div class="mt-8 flex justify-center gap-2">
          <button
            v-for="page in Math.max(1, Math.ceil(totalProducts / 12))"
            :key="page"
            :class="[
              'px-3 py-1 border rounded',
              currentPage === page ? 'btn-primary' : 'border-gray-300',
            ]"
            @click="goToPage(page)"
          >
            {{ page }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useProductStore } from '@/stores/productStore'
import ProductCard from '@/components/ProductCard.vue'
import categoryService from '@/services/categoryService'

const productStore = useProductStore()
const categories = ref([])
const filters = ref({
  category: null,
  price_min: null,
  price_max: null,
  sort: '',
})
const currentPage = ref(1)
const totalProducts = ref(0)
const loading = ref(false)

const { products: allProducts } = productStore

const products = ref([])

onMounted(async () => {
  try {
    const response = await categoryService.getCategories()
    categories.value = response.data.data
  } catch (error) {
    console.error('Failed to load categories:', error)
  }
  await applyFilters()
})

const applyFilters = async () => {
  loading.value = true
  try {
    const params = {
      page: currentPage.value,
      per_page: 12,
    }
    if (filters.value.category) {
      params.category = filters.value.category
    }
    if (filters.value.price_min) {
      params.price_min = filters.value.price_min
    }
    if (filters.value.price_max) {
      params.price_max = filters.value.price_max
    }
    if (filters.value.sort) {
      params.sort = filters.value.sort
    }

    const data = await productStore.getProducts(params)
    products.value = data.data
    totalProducts.value = data.pagination.total
  } finally {
    loading.value = false
  }
}

const goToPage = (page) => {
  currentPage.value = page
  applyFilters()
}
</script>
