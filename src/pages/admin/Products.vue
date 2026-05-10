<template>
  <div>
    <h1 class="text-3xl font-bold text-maroon mb-6">Products</h1>

    <button @click="showForm = !showForm" class="btn-primary mb-6">
      {{ showForm ? 'Cancel' : '+ Add Product' }}
    </button>

    <!-- Product Form -->
    <div v-if="showForm" class="card p-6 mb-6">
      <h2 class="font-bold text-maroon mb-4">{{ editingId ? 'Edit' : 'Add' }} Product</h2>
      <form @submit.prevent="saveProduct" class="space-y-3 grid grid-cols-1 md:grid-cols-2 gap-3">
        <input v-model="form.name" placeholder="Product Name" class="border p-2 rounded" required />
        <input v-model="form.sku" placeholder="SKU" class="border p-2 rounded" required />
        <input v-model="form.images" placeholder="Image URL" class="border p-2 rounded" />
        <select v-model.number="form.category_id" class="border p-2 rounded" required>
          <option value="">Select Category</option>
          <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
        </select>
        <input v-model.number="form.price" type="number" placeholder="Price" class="border p-2 rounded" required />
        <input v-model.number="form.discount_price" type="number" placeholder="Discount Price" class="border p-2 rounded" />
        <input v-model.number="form.stock" type="number" placeholder="Stock" class="border p-2 rounded" required />
        <input v-model="form.fabric" placeholder="Fabric" class="border p-2 rounded" />
        <input v-model="form.color" placeholder="Color" class="border p-2 rounded" />
        <input v-model="form.occasion" placeholder="Occasion" class="border p-2 rounded" />
        <textarea v-model="form.description" placeholder="Description" class="border p-2 rounded md:col-span-2"></textarea>
        <button type="submit" class="btn-primary md:col-span-2">Save Product</button>
      </form>
    </div>

    <!-- Products Table -->
    <div class="card overflow-x-auto">
      <table class="w-full">
        <thead class="bg-maroon text-white">
          <tr>
            <th class="p-3 text-left">Image</th>
            <th class="p-3 text-left">Name</th>
            <th class="p-3 text-left">SKU</th>
            <th class="p-3 text-left">Price</th>
            <th class="p-3 text-left">Stock</th>
            <th class="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.id" class="border-b hover:bg-beige">
            <td class="p-3">
              <div class="w-16 h-16 bg-gray-100 rounded overflow-hidden flex items-center justify-center">
                <img v-if="product.image" :src="product.image" alt="img" class="w-full h-full object-cover" />
                <span v-else class="text-sm text-gray-500">No image</span>
              </div>
            </td>
            <td class="p-3">{{ product.name }}</td>
            <td class="p-3">{{ product.sku }}</td>
            <td class="p-3">₹{{ product.price }}</td>
            <td class="p-3">{{ product.stock }}</td>
            <td class="p-3 space-x-2">
              <button @click="editProduct(product)" class="text-blue-600 hover:underline">Edit</button>
              <button @click="deleteProduct(product.id)" class="text-red-600 hover:underline">Delete</button>
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
import categoryService from '@/services/categoryService'

const router = useRouter()
const authStore = useAuthStore()

const products = ref([])
const categories = ref([])
const showForm = ref(false)
const editingId = ref(null)
const form = ref({
  name: '',
  sku: '',
  images: '',
  category_id: '',
  price: 0,
  discount_price: 0,
  stock: 0,
  fabric: '',
  color: '',
  occasion: '',
  description: '',
})

const loadProducts = async () => {
  try {
    const response = await adminService.getProducts()
    products.value = response.data.data
  } catch (error) {
    console.error('Failed to load products:', error)
  }
}

const loadCategories = async () => {
  try {
    const response = await categoryService.getCategories()
    categories.value = response.data.data
  } catch (error) {
    console.error('Failed to load categories:', error)
  }
}

const saveProduct = async () => {
  try {
    if (editingId.value) {
      await adminService.updateProduct(editingId.value, form.value)
    } else {
      await adminService.createProduct(form.value)
    }
    await loadProducts()
    showForm.value = false
    editingId.value = null
    form.value = {
      name: '',
      sku: '',
      images: '',
      category_id: '',
      price: 0,
      discount_price: 0,
      stock: 0,
      fabric: '',
      color: '',
      occasion: '',
      description: '',
    }
  } catch (error) {
    alert('Failed to save product')
  }
}

const editProduct = (product) => {
  editingId.value = product.id
  form.value = { ...product }
  showForm.value = true
}

const deleteProduct = async (id) => {
  if (confirm('Are you sure?')) {
    try {
      await adminService.deleteProduct(id)
      await loadProducts()
    } catch (error) {
      alert('Failed to delete product')
    }
  }
}

onMounted(async () => {
  if (!authStore.isAdmin) {
    router.push('/')
    return
  }
  await loadProducts()
  await loadCategories()
})
</script>
