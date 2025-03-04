<template>
  <section class="relative py-32">
    <!-- Fixed Background Image -->
    <div 
      class="absolute inset-0 bg-cover bg-center bg-fixed"
      style="background-image: url('/images/cta-bg.png')"
    >
      <div class="absolute inset-0 bg-black/50"></div>
    </div>

    <!-- Content -->
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative">
      <div class="max-w-3xl mx-auto text-center">
        <!-- Decorative Element -->
        <div class="absolute -top-10 left-1/2 -translate-x-1/2">
          <img 
            class="w-36 h-36 opacity-20"
            src="/images/elements/dot.png"
          />
        </div>

        <!-- Text Content -->
        <h2 class="text-3xl md:text-4xl font-bold text-white mb-6">
          Ready to Transform Your Plastic Manufacturing?
        </h2>
        <p class="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
          From eco-friendly household products to industrial solutions, we're here to help you achieve your manufacturing goals with sustainable practices.
        </p>

        <!-- CTA Buttons -->
        <div class="flex flex-wrap justify-center gap-4">
          <NuxtLink
            to="/contact"
            class="px-8 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-500 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 font-medium group"
          >
            Contact Us
            <svg 
              class="w-5 h-5 ml-2 inline-block transform transition-transform duration-300 group-hover:translate-x-1"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2" 
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </NuxtLink>
          <NuxtLink
            to="/products"
            class="px-8 py-3 bg-white/10 text-white border border-white/20 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-all duration-300 font-medium"
          >
            View Products
          </NuxtLink>
        </div>

        <!-- Trust Indicators -->
        <div class="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div class="text-center">
            <div class="text-3xl font-bold text-white mb-1">{{ new Date().getFullYear() - 1984 }}</div>
            <div class="text-sm text-white/80">Years Experience</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-white mb-1">2000+</div>
            <div class="text-sm text-white/80">Happy Customers</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-white mb-1">100%</div>
            <div class="text-sm text-white/80">Quality Assured</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-white mb-1">24/7</div>
            <div class="text-sm text-white/80">Support</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
