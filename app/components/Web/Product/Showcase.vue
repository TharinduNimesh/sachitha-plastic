<template>
  <section class="py-20">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Featured Product 1 (2 row span) -->
        <div class="relative group overflow-hidden rounded-2xl md:row-span-2">
          <div class="h-full">
            <img 
              src="/images/showcase/product-3.png"
              alt="Eco-friendly Containers" 
              class="object-cover w-full h-full transform transition-transform duration-700 group-hover:scale-110"
            />
          </div>
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-8">
            <h3 class="text-white text-3xl md:text-4xl font-bold mb-2">Machinery Collection</h3>
            <p class="text-white/90 text-lg mb-4">Discover our machinery products with premium quality and design</p>
            <NuxtLink 
              to="/products/category/23"
              class="inline-flex items-center text-white hover:underline mt-2"
            >
              Shop Collection
              <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </NuxtLink>
          </div>
        </div>

        <!-- Featured Product 2 -->
        <div class="relative group overflow-hidden rounded-2xl">
          <div class="aspect-w-16 aspect-h-9 bg-slate-100">
            <img 
              src="/images/showcase/product-1.jpg"
              alt="Recycling Machines" 
              class="object-cover w-full h-full transform transition-transform duration-700 group-hover:scale-110"
            />
          </div>
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-8">
            <h3 class="text-white text-2xl md:text-3xl font-bold mb-2">Garden Products</h3>
            <NuxtLink 
              to="/products/category/15"
              class="inline-flex items-center text-white hover:underline mt-2"
            >
              Shop Collection
              <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </NuxtLink>
          </div>
        </div>

        <!-- Featured Product 3 -->
        <div class="relative group overflow-hidden rounded-2xl">
          <div class="aspect-w-16 aspect-h-9 bg-slate-100">
            <img 
              src="/images/showcase/product-2.jpg"
              alt="Household Items" 
              class="object-cover w-full h-full transform transition-transform duration-700 group-hover:scale-110"
            />
          </div>
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-8">
            <h3 class="text-white text-2xl md:text-3xl font-bold mb-2">Household Collection</h3>
            <NuxtLink 
              to="/products/category/18"
              class="inline-flex items-center text-white hover:underline mt-2"
            >
              Shop Collection
              <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>