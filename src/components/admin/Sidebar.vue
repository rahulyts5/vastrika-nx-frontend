<template>
  <aside class="w-64 bg-maroon text-white min-h-screen">
    <div class="p-6">
      <h1 class="text-2xl font-bold mb-8">💎 Vastrika Admin</h1>

      <nav class="space-y-2">
        <router-link
          to="/admin"
          class="block px-4 py-2 rounded hover:bg-red-700 transition"
          active-class="bg-gold text-black"
        >
          📊 Dashboard
        </router-link>
        <router-link
          to="/admin/products"
          class="block px-4 py-2 rounded hover:bg-red-700 transition"
          active-class="bg-gold text-black"
        >
          📦 Products
        </router-link>
        <router-link
          to="/admin/categories"
          class="block px-4 py-2 rounded hover:bg-red-700 transition"
          active-class="bg-gold text-black"
        >
          🏷️ Categories
        </router-link>
        <router-link
          to="/admin/orders"
          class="block px-4 py-2 rounded hover:bg-red-700 transition"
          active-class="bg-gold text-black"
        >
          🛒 Orders
        </router-link>
        <router-link
          to="/admin/customers"
          class="block px-4 py-2 rounded hover:bg-red-700 transition"
          active-class="bg-gold text-black"
        >
          👥 Customers
        </router-link>
      </nav>

      <div class="mt-8 pt-8 border-t border-red-700">
        <router-link to="/" class="block px-4 py-2 rounded hover:bg-red-700 transition text-sm">
          ← Back to Store
        </router-link>
      </div>
    </div>
  </aside>
</template>

<script setup>
</script>
