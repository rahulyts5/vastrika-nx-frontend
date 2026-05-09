<template>
  <footer class="bg-maroon text-white py-12 mt-12">
    <div class="px-4 md:px-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <!-- About -->
        <div>
          <h3 class="font-bold text-lg mb-4">💎 Vastrika NX</h3>
          <p class="text-sm text-gray-300">
            Premium luxury sarees with authentic craftsmanship and elegance woven into every thread.
          </p>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="font-bold text-lg mb-4">Quick Links</h3>
          <ul class="space-y-2 text-sm">
            <li><router-link to="/shop" class="hover:text-gold">Shop</router-link></li>
            <li><router-link to="/about" class="hover:text-gold">About Us</router-link></li>
            <li><router-link to="/contact" class="hover:text-gold">Contact</router-link></li>
            <li><router-link to="/faq" class="hover:text-gold">FAQ</router-link></li>
          </ul>
        </div>

        <!-- Policies -->
        <div>
          <h3 class="font-bold text-lg mb-4">Policies</h3>
          <ul class="space-y-2 text-sm">
            <li><a href="#" class="hover:text-gold">Shipping Policy</a></li>
            <li><a href="#" class="hover:text-gold">Return Policy</a></li>
            <li><a href="#" class="hover:text-gold">Privacy Policy</a></li>
            <li><a href="#" class="hover:text-gold">Terms & Conditions</a></li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h3 class="font-bold text-lg mb-4">Contact Us</h3>
          <p class="text-sm text-gray-300 mb-2">
            📧 support@vastrika.com
          </p>
          <p class="text-sm text-gray-300 mb-2">
            📞 1800-123-4567
          </p>
          <div class="flex gap-4 mt-4">
            <a href="#" class="hover:text-gold">📱 Facebook</a>
            <a href="#" class="hover:text-gold">📷 Instagram</a>
            <a href="#" class="hover:text-gold">🐦 Twitter</a>
          </div>
        </div>
      </div>

      <div class="border-t border-gray-700 pt-8">
        <p class="text-center text-sm text-gray-400">
          &copy; 2024 Vastrika NX. All rights reserved. | Elegance Woven Into Every Thread
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
</script>
