<template>
  <div>
    <h1 class="text-3xl font-bold text-maroon mb-6">Categories</h1>

    <button @click="showForm = !showForm" class="btn-primary mb-6">
      {{ showForm ? 'Cancel' : '+ Add Category' }}
    </button>

    <!-- Category Form -->
    <div v-if="showForm" class="card p-6 mb-6">
      <form @submit.prevent="saveCategory" class="space-y-3">
        <input v-model="form.name" placeholder="Category Name" class="w-full border p-2 rounded" required />
        <textarea v-model="form.description" placeholder="Description" class="w-full border p-2 rounded"></textarea>
        <button type="submit" class="btn-primary">Save Category</button>
      </form>
    </div>

    <!-- Categories Table -->
    <div class="card overflow-x-auto">
      <table class="w-full">
        <thead class="bg-maroon text-white">
          <tr>
            <th class="p-3 text-left">Name</th>
            <th class="p-3 text-left">Products</th>
            <th class="p-3 text-left">Status</th>
            <th class="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="category in categories" :key="category.id" class="border-b hover:bg-beige">
            <td class="p-3">{{ category.name }}</td>
            <td class="p-3">-</td>
            <td class="p-3">
              <span class="px-2 py-1 rounded text-sm font-bold" :class="category.status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'">
                {{ category.status ? 'Active' : 'Inactive' }}
              </span>
            </td>
            <td class="p-3 space-x-2">
              <button @click="editCategory(category)" class="text-blue-600 hover:underline">Edit</button>
              <button @click="deleteCategory(category.id)" class="text-red-600 hover:underline">Delete</button>
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

const categories = ref([])
const showForm = ref(false)
const editingId = ref(null)
const form = ref({
  name: '',
  description: '',
})

const loadCategories = async () => {
  try {
    const response = await adminService.getCategories()
    categories.value = response.data.data
  } catch (error) {
    console.error('Failed to load categories:', error)
  }
}

const saveCategory = async () => {
  try {
    if (editingId.value) {
      await adminService.updateCategory(editingId.value, form.value)
    } else {
      await adminService.createCategory(form.value)
    }
    await loadCategories()
    showForm.value = false
    editingId.value = null
    form.value = { name: '', description: '' }
  } catch (error) {
    alert('Failed to save category')
  }
}

const editCategory = (category) => {
  editingId.value = category.id
  form.value = { name: category.name, description: category.description }
  showForm.value = true
}

const deleteCategory = async (id) => {
  if (confirm('Are you sure?')) {
    try {
      await adminService.deleteCategory(id)
      await loadCategories()
    } catch (error) {
      alert('Failed to delete category')
    }
  }
}

onMounted(async () => {
  if (!authStore.isAdmin) {
    router.push('/')
    return
  }
  await loadCategories()
})
</script>
