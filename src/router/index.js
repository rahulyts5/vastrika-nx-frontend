import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

// Layouts
import MainLayout from '@/layouts/MainLayout.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'
import AdminLayout from '@/layouts/AdminLayout.vue'

// Pages
import Home from '@/pages/Home.vue'
import Shop from '@/pages/Shop.vue'
import ProductDetail from '@/pages/ProductDetail.vue'
import Cart from '@/pages/Cart.vue'
import Checkout from '@/pages/Checkout.vue'
import Login from '@/pages/Login.vue'
import Register from '@/pages/Register.vue'
import UserProfile from '@/pages/UserProfile.vue'
import UserOrders from '@/pages/UserOrders.vue'
import UserAddresses from '@/pages/UserAddresses.vue'
import UserWishlist from '@/pages/UserWishlist.vue'

// Admin Pages
import AdminDashboard from '@/pages/admin/Dashboard.vue'
import AdminProducts from '@/pages/admin/Products.vue'
import AdminCategories from '@/pages/admin/Categories.vue'
import AdminOrders from '@/pages/admin/Orders.vue'
import AdminCustomers from '@/pages/admin/Customers.vue'

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: '', component: Home, name: 'Home' },
      { path: 'shop', component: Shop, name: 'Shop' },
      { path: 'product/:id', component: ProductDetail, name: 'ProductDetail' },
      { path: 'cart', component: Cart, name: 'Cart' },
      {
        path: 'checkout',
        component: Checkout,
        name: 'Checkout',
        meta: { requiresAuth: true },
      },
      {
        path: 'profile',
        component: UserProfile,
        name: 'UserProfile',
        meta: { requiresAuth: true },
      },
      {
        path: 'orders',
        component: UserOrders,
        name: 'UserOrders',
        meta: { requiresAuth: true },
      },
      {
        path: 'addresses',
        component: UserAddresses,
        name: 'UserAddresses',
        meta: { requiresAuth: true },
      },
      {
        path: 'wishlist',
        component: UserWishlist,
        name: 'UserWishlist',
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: '/auth',
    component: AuthLayout,
    children: [
      { path: 'login', component: Login, name: 'Login' },
      { path: 'register', component: Register, name: 'Register' },
    ],
  },
  {
    path: '/admin',
    component: AdminLayout,
    meta: { requiresAuth: true, requiresAdmin: true },
    children: [
      { path: '', component: AdminDashboard, name: 'AdminDashboard' },
      { path: 'products', component: AdminProducts, name: 'AdminProducts' },
      { path: 'categories', component: AdminCategories, name: 'AdminCategories' },
      { path: 'orders', component: AdminOrders, name: 'AdminOrders' },
      { path: 'customers', component: AdminCustomers, name: 'AdminCustomers' },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'Login', query: { redirect: to.fullPath } })
  } else if (to.meta.requiresAdmin && !authStore.isAdmin) {
    next({ name: 'Home' })
  } else {
    next()
  }
})

export default router
