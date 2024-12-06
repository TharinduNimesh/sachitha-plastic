<template>
  <section class="py-20 bg-slate-50">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="max-w-3xl mb-12">
        <h2 class="text-3xl font-bold text-slate-900 mb-4">Our Gallery</h2>
        <p class="text-lg text-slate-600">
          Take a visual journey through our manufacturing facilities and products
        </p>
      </div>

      <!-- Gallery Scroll Container -->
      <div class="relative">
        <!-- Scroll Shadow Indicators -->
        <div class="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none"></div>
        <div class="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none"></div>

        <!-- Scrollable Container -->
        <div class="overflow-x-auto scrollbar-hide">
          <div class="flex gap-6 pb-8 min-w-max">
            <div 
              v-for="(image, index) in galleryImages" 
              :key="index"
              class="relative group"
            >
              <!-- Image Container -->
              <div class="relative w-80 h-96 overflow-hidden rounded-2xl">
                <img 
                  :src="image.url" 
                  :alt="image.caption"
                  class="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                />
                
                <!-- Overlay -->
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6">
                  <!-- Caption -->
                  <p class="text-white font-medium text-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                    {{ image.caption }}
                  </p>
                  <p class="text-white/80 text-sm mt-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-75">
                    {{ image.description }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Scroll Hint -->
      <div class="mt-8 text-center text-sm text-slate-500 flex items-center justify-center space-x-2">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        <span>Scroll horizontally to explore more images</span>
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </div>
    </div>
  </section>
</template>

<script setup>
const galleryImages = [
  {
    url: 'https://media.istockphoto.com/id/1465056864/photo/large-production-line-with-industrial-robot-arms-at-modern-bright-factory-solar-panels-are.jpg?s=612x612&w=0&k=20&c=yqclk4Li5opfMfpaoPua734of0ZaDv39NDT6C3goDC4=',
    caption: 'Modern Manufacturing Facility',
    description: 'State-of-the-art production line equipped with latest technology'
  },
  {
    url: 'https://www.tdipacksys.com/wp-content/uploads/2023/11/food-quality-control-employee-working-on-food-conveyor.jpg',
    caption: 'Quality Control',
    description: 'Rigorous testing and quality assurance processes'
  },
  {
    url: 'https://lekac.com/wp-content/uploads/2020/11/Untitled-1-1.jpg',
    caption: 'Eco-Friendly Production',
    description: 'Sustainable manufacturing practices and recycling initiatives'
  },
  {
    url: 'https://indesign-llc.com/wp-content/uploads/Untitled-design-34.png',
    caption: 'Product Development',
    description: 'Innovative design and development process'
  },
  {
    url: 'https://corpmag-wp-uploads.s3.us-east-1.amazonaws.com/2019/11/9854b5b9-cover_7312203_ds.jpg',
    caption: 'Expert Team',
    description: 'Skilled professionals ensuring quality at every step'
  },
  {
    url: 'https://www.consafelogistics.com/hubfs/Website/Blogs/moves-iInventory-in-the-warehouse.jpg',
    caption: 'Warehouse Operations',
    description: 'Efficient storage and logistics management'
  },
  {
    url: 'https://www.jsonline.com/gcdn/presto/2019/03/29/PMJS/018db821-079f-4362-88a9-7c5c410ca1ab-MJS_recycle_11_wood_RECYCLE.jpg?width=700&height=476&fit=crop&format=pjpg&auto=webp',
    caption: 'Recycling Center',
    description: 'Advanced plastic recycling and waste management'
  },
  {
    url: 'https://u4d2z7k9.rocketcdn.me/wp-content/uploads/2022/07/Untitled-1024-%C3%97-683px-56.jpg',
    caption: 'Packaging Solutions',
    description: 'Custom packaging and product finishing'
  }
]
</script>

<style scoped>
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>
