<template>
  <div class="min-h-screen flex">
    <Sidebar />
    <div class="flex-grow">
      <AdminHeader />
      <main class="p-6">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import Sidebar from '@/components/admin/Sidebar.vue'
import AdminHeader from '@/components/admin/Header.vue'
</script>
