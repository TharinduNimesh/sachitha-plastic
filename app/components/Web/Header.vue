<template>
  <header class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :class="[
      scrolled ? 'bg-white shadow-lg py-3' : 'bg-transparent py-4',
      {'backdrop-blur-lg bg-white/80': scrolled}
    ]">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <nav class="flex items-center justify-between">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center space-x-3">
          <img src="/images/logo.webp" alt="Logo" class="h-12 w-auto" />
          <div class="flex flex-col">
            <span class="text-xl font-bold leading-tight text-slate-900 uppercase">Samarasinghe</span>
            <span class="text-sm text-slate-600 font-semibold -mt-1 uppercase">Trade Center</span>
          </div>
        </NuxtLink>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-8">
          <NuxtLink
            v-for="link in navigationLinks"
            :key="link.path"
            :to="link.path" 
            class="relative py-2 text-slate-600 hover:text-slate-900 transition-colors duration-200 group"
            :class="{'text-slate-900 font-medium': link.path === $route.path}"
          >
            {{ link.name }}
            <span class="absolute bottom-0 left-0 w-full h-0.5 transition-all duration-300 transform origin-left scale-x-0 group-hover:scale-x-100"
              :class="link.path === $route.path ? 'bg-emerald-500 scale-x-100' : 'bg-emerald-500 group-hover:scale-x-100'"></span>
          </NuxtLink>
          <NuxtLink
            to="/contact"
            class="px-6 py-2.5 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 font-medium"
          >
            Contact Us
          </NuxtLink>
        </div>

        <!-- Mobile Menu Button -->
        <button 
          @click="toggleMobileMenu"
          class="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors duration-200"
          aria-label="Toggle Menu"
        >
          <div class="w-6 h-5 relative transform transition-all duration-300 flex flex-col justify-center"
            :class="{'rotate-180': isMobileMenuOpen}">
            <span class="absolute h-0.5 w-full bg-slate-900 transform transition-all duration-300"
              :class="{'rotate-45 translate-y-0': isMobileMenuOpen, '-translate-y-2': !isMobileMenuOpen}"></span>
            <span class="absolute h-0.5 w-full bg-slate-900 transform transition-all duration-300"
              :class="{'opacity-0': isMobileMenuOpen, 'translate-y-0': !isMobileMenuOpen}"></span>
            <span class="absolute h-0.5 w-full bg-slate-900 transform transition-all duration-300"
              :class="{'-rotate-45 translate-y-0': isMobileMenuOpen, 'translate-y-2': !isMobileMenuOpen}"></span>
          </div>
        </button>
      </nav>

      <!-- Mobile Menu -->
      <div 
        class="md:hidden overflow-hidden transition-all duration-300 bg-white"
        :class="[isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0']"
      >
        <div class="py-4 space-y-4">
          <NuxtLink
            v-for="link in navigationLinks"
            :key="link.path"
            :to="link.path"
            class="block px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors duration-200"
            :class="{'text-emerald-600 font-medium bg-emerald-50': link.path === $route.path}"
            @click="isMobileMenuOpen = false"
          >
            {{ link.name }}
          </NuxtLink>
          <div class="pt-4 border-t border-slate-200 space-y-4 px-4">
            <NuxtLink
              to="/contact"
              class="block w-full text-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors duration-200"
              @click="isMobileMenuOpen = false"
            >
              Contact Us
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const navigationLinks = [
  { name: 'Home', path: '/' },
  { name: 'Products', path: '/products' },
  { name: 'Services', path: '/services' },
  { name: 'About', path: '/about' },
]

const scrolled = ref(false)
const isMobileMenuOpen = ref(false)

const handleScroll = () => {
  scrolled.value = window.scrollY > 20
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  handleScroll() // Check initial scroll position
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.container {
  max-width: 1280px;
}
</style>
