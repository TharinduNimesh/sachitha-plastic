<template>
  <section class="py-20">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="flex flex-col md:flex-row md:items-center justify-between mb-12">
        <div class="mb-6 md:mb-0">
          <h2 class="text-3xl font-bold text-slate-900 mb-4">Featured Products</h2>
          <p class="text-lg text-slate-600 max-w-2xl">
            Discover our collection of high-quality plastic products and manufacturing solutions
          </p>
        </div>
        <NuxtLink
          to="/products"
          class="inline-flex items-center px-6 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 font-medium group whitespace-nowrap"
        >
          View All Products
          <svg 
            class="w-5 h-5 ml-2 transform transition-transform duration-300 group-hover:translate-x-1"
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
      </div>

      <!-- Products Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        <WebProductCard
          v-for="product in products"
          :key="product.id"
          :product="product"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
const products = [
  {
    id: 1,
    name: 'Eco Storage Container',
    category: 'Household',
    description: 'Durable and eco-friendly storage container perfect for kitchen organization.',
    image: '/images/products/eco-food-container.webp',
    link: '/products/eco-storage-container'
  },
  {
    id: 2,
    name: 'Industrial Waste Bin',
    category: 'Industrial',
    description: 'Heavy-duty waste management solution for industrial applications.',
    image: '/images/products/waste-bin.webp',
    link: '/products/industrial-waste-bin'
  },
  {
    id: 3,
    name: 'Garden Planter',
    category: 'Garden',
    description: 'Modern design planter with built-in drainage system.',
    image: 'https://5.imimg.com/data5/SELLER/Default/2023/9/340776909/ZS/NT/PQ/922856/rectangular-garden-planter-p-24-500x500.jpg',
    link: '/products/garden-planter'
  },
  {
    id: 4,
    name: 'Recycling Machine',
    category: 'Machinery',
    description: 'High-efficiency plastic recycling machine for industrial use.',
    image: 'https://5.imimg.com/data5/SELLER/Default/2023/9/347707470/VD/KJ/VV/27965550/plastic-waste-recycling-machine.jpg',
    link: '/products/recycling-machine'
  },
  {
    id: 5,
    name: 'Storage Box Set',
    category: 'Household',
    description: 'Stackable storage box set with secure locking mechanism.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjxLMTE9gHymaANt4Btb9Ubn_u15SIyo_BSA&s',
    link: '/products/storage-box-set'
  },
  {
    id: 6,
    name: 'Industrial Pallet',
    category: 'Industrial',
    description: 'Heavy-duty plastic pallet for warehouse and logistics.',
    image: 'https://cdn.webshopapp.com/shops/31781/files/452353570/industrial-plastic-pallet-1200x1000x150-mm-3-runne.jpg',
    link: '/products/industrial-pallet'
  },
  {
    id: 7,
    name: 'Water Tank',
    category: 'Industrial',
    description: 'Large capacity water storage tank with UV protection.',
    image: 'https://onlinestore.anton.lk/front_img/1697609421DSC_8433_1000L_MAX_TANK.JPG',
    link: '/products/water-tank'
  },
  {
    id: 8,
    name: 'Tool Box',
    category: 'Household',
    description: 'Multi-compartment tool box with reinforced structure.',
    image: 'https://i5.walmartimages.com/seo/Hyper-Tough-16-inch-Toolbox-Plastic-Tool-and-Hardware-Storage-Black_86f427eb-b21b-420b-80a7-6b943ccf8411_2.2bd2520b672ca0330e72bcaa856bad9b.jpeg',
    link: '/products/tool-box'
  }
]
</script>
