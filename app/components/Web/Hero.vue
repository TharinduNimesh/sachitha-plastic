<template>
  <section class="relative">
    <!-- Hero Section -->
    <div class="relative min-h-screen flex items-center bg-gradient-to-br from-slate-50 to-emerald-50">
      <!-- Background Pattern -->
      <div class="absolute inset-0 z-0">
        <div class="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-5"></div>
        <!-- Animated gradient blob -->
        <div class="absolute top-1/4 right-1/4 w-96 h-96 rounded-full filter blur-3xl animate-blob bg-emerald-500/10"></div>
        <div class="absolute bottom-1/4 left-1/4 w-96 h-96 bg-slate-500/10 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
      </div>

      <!-- Content Container -->
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-5rem)]">
          <!-- Left Content -->
          <div 
            class="space-y-8 transform transition-all duration-700 mx-auto text-center lg:text-left lg:mx-0 max-w-2xl lg:max-w-none"
            :class="{'translate-x-0 opacity-100': isContentVisible, '-translate-x-10 opacity-0': !isContentVisible}"
          >
            <div class="space-y-4">
              <span class="inline-block px-4 py-1 bg-emerald-100 text-emerald-600 rounded-full text-sm font-medium">
                {{ slides[currentSlide].tag }}
              </span>
              <h1 class="text-3xl md:text-5xl font-bold text-slate-900 leading-tight">
                <span class="block transform transition-all duration-700 delay-100"
                  :class="{'translate-y-0 opacity-100': isContentVisible, 'translate-y-10 opacity-0': !isContentVisible}">
                  {{ slides[currentSlide].title }}
                </span>
                <span class="block transform transition-all duration-700 delay-200 text-emerald-600"
                  :class="{'translate-y-0 opacity-100': isContentVisible, 'translate-y-10 opacity-0': !isContentVisible}">
                  {{ slides[currentSlide].subtitle }}
                </span>
              </h1>
            </div>
            
            <p class="text-xl text-slate-600 max-w-lg mx-auto lg:mx-0 transform transition-all duration-700 delay-300"
              :class="{'translate-y-0 opacity-100': isContentVisible, 'translate-y-10 opacity-0': !isContentVisible}">
              {{ slides[currentSlide].description }}
            </p>

            <div class="flex flex-wrap justify-center lg:justify-start gap-4 transform transition-all duration-700 delay-400"
              :class="{'translate-y-0 opacity-100': isContentVisible, 'translate-y-10 opacity-0': !isContentVisible}">
              <NuxtLink
                :to="slides[currentSlide].buttonLink"
                class="group inline-flex items-center px-6 py-3 bg-emerald-600 text-white font-medium rounded-xl hover:bg-emerald-700 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
              >
                {{ slides[currentSlide].buttonText }}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 ml-2 transform transition-transform duration-300 group-hover:translate-x-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
              </NuxtLink>
              <NuxtLink
                :to="slides[currentSlide].secondaryButtonLink"
                class="group inline-flex items-center px-6 py-3 border-2 border-emerald-600 text-emerald-600 font-medium rounded-xl hover:bg-emerald-600 hover:text-white transition-all duration-300"
              >
                {{ slides[currentSlide].secondaryButtonText }}
              </NuxtLink>
            </div>

            <!-- Slide Navigation -->
            <div class="flex justify-center lg:justify-start items-center space-x-6 transform transition-all duration-700 delay-500"
              :class="{'translate-y-0 opacity-100': isContentVisible, 'translate-y-10 opacity-0': !isContentVisible}">
              <div class="flex space-x-2">
                <button 
                  v-for="(slide, index) in slides" 
                  :key="index"
                  @click="goToSlide(index)"
                  class="group relative"
                >
                  <span 
                    :class="[
                      'block w-3 h-3 rounded-full transition-all duration-300',
                      currentSlide === index ? 'bg-emerald-600 scale-100' : 'bg-slate-300 scale-75 group-hover:scale-100'
                    ]"
                  ></span>
                </button>
              </div>
              <div class="flex items-center space-x-4">
                <button 
                  @click="prevSlide"
                  class="p-2 rounded-full hover:bg-slate-100 transition-colors duration-300"
                >
                  <svg class="w-6 h-6 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button 
                  @click="nextSlide"
                  class="p-2 rounded-full hover:bg-slate-100 transition-colors duration-300"
                >
                  <svg class="w-6 h-6 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <!-- Right Image -->
          <div class="relative hidden lg:block">
            <div 
              class="transform transition-all duration-700"
              :class="{'translate-x-0 opacity-100': isContentVisible, 'translate-x-10 opacity-0': !isContentVisible}"
            >
              <img
                :src="slides[currentSlide].image"
                :alt="slides[currentSlide].imageAlt"
                class="rounded-2xl shadow-2xl transition-transform duration-700"
                :class="{'scale-100': isContentVisible, 'scale-95': !isContentVisible}"
              />
              
              <!-- Floating Stats Card -->
              <div 
                class="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl transform transition-all duration-700 hover:shadow-2xl hover:-translate-y-1"
                :class="{'translate-y-0 opacity-100': isContentVisible, 'translate-y-10 opacity-0': !isContentVisible}"
              >
                <div class="flex items-center space-x-4">
                  <div class="p-3 rounded-lg bg-emerald-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6 text-emerald-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div>
                    <p class="text-sm font-medium text-slate-600">Trusted by</p>
                    <p class="text-lg font-bold text-slate-900">2000+ Customers</p>
                  </div>
                </div>
              </div>

              <!-- Feature Tags -->
              <div 
                class="absolute -right-4 top-1/4 bg-white px-4 py-2 rounded-lg shadow-lg transform transition-all duration-700 delay-200"
                :class="{'translate-x-0 opacity-100': isContentVisible, 'translate-x-10 opacity-0': !isContentVisible}"
              >
                <div class="flex items-center space-x-2">
                  <span class="flex h-3 w-3">
                    <span class="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-emerald-600 opacity-75"></span>
                    <span class="relative inline-flex rounded-full h-3 w-3 bg-emerald-600"></span>
                  </span>
                  <p class="text-sm font-medium text-slate-900">{{ slides[currentSlide].feature }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const currentSlide = ref(0)
const isContentVisible = ref(false)

const colorScheme = {
  bg: 'emerald',
  light: 'bg-emerald-100',
  text: 'text-emerald-600',
  border: 'border-emerald-600',
  button: 'bg-emerald-600',
  buttonHover: 'hover:bg-emerald-700',
}

const slides = [
  {
    tag: 'Eco-Friendly',
    title: 'Sustainable',
    subtitle: 'Household Products',
    description: 'Upgrade your home with our eco-friendly, durable, and stylish plastic products.',
    buttonText: 'Explore Products',
    buttonLink: '/products/household',
    secondaryButtonText: 'Learn More',
    secondaryButtonLink: '/about',
    image: '/images/swiper/household-item.jpeg',
    imageAlt: 'Eco-friendly household plastic products',
    feature: 'Recycled Materials'
  },
  {
    tag: 'Recycling Machines',
    title: 'Innovative',
    subtitle: 'Recycling Solutions',
    description: 'Empower sustainability with advanced recycling machines designed for efficiency.',
    buttonText: 'View Machines',
    buttonLink: '/products/machinery/recycling',
    secondaryButtonText: 'See Details',
    secondaryButtonLink: '/details',
    image: '/images/swiper/recycling-machines-hero.jpeg',
    imageAlt: 'Innovative recycling machine in operation',
    feature: 'High Efficiency'
  },
  {
    tag: 'Garden Products',
    title: 'Eco-Chic',
    subtitle: 'Garden Accessories',
    description: 'Enhance your outdoor spaces with our eco-friendly garden pots and accessories.',
    buttonText: 'Shop Now',
    buttonLink: '/products/garden',
    secondaryButtonText: 'Watch Video',
    secondaryButtonLink: '/video',
    image: '/images/swiper/garden-accessories.jpg',
    imageAlt: 'Beautiful eco-friendly garden pots',
    feature: 'Sustainable Design'
  }
];

const goToSlide = (index) => {
  isContentVisible.value = false
  setTimeout(() => {
    currentSlide.value = index
    isContentVisible.value = true
  }, 700)
}

const nextSlide = () => {
  goToSlide((currentSlide.value + 1) % slides.length)
}

const prevSlide = () => {
  goToSlide((currentSlide.value - 1 + slides.length) % slides.length)
}

// Auto-slide functionality
let autoSlideInterval
const startAutoSlide = () => {
  autoSlideInterval = setInterval(nextSlide, 5000)
}

const stopAutoSlide = () => {
  if (autoSlideInterval) {
    clearInterval(autoSlideInterval)
  }
}

onMounted(() => {
  isContentVisible.value = true
  startAutoSlide()
})

onUnmounted(() => {
  stopAutoSlide()
})
</script>

<style scoped>
.container {
  max-width: 1280px;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

@keyframes blob {
  0% {
    transform: translate(0px, 0px) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
  100% {
    transform: translate(0px, 0px) scale(1);
  }
}

.animate-blob {
  animation: blob 7s infinite;
}
</style>
