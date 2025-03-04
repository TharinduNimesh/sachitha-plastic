<template>
  <NuxtLayout name="web">
    <div class="relative pt-32 pb-16 overflow-hidden">
      <!-- Animated Blobs -->
      <div class="absolute inset-0 overflow-hidden">
        <div class="blob-1"></div>
        <div class="blob-2"></div>
      </div>

      <!-- Hero Content -->
      <div class="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12 space-y-4">
          <span
            class="inline-block px-4 py-1 bg-emerald-100 text-emerald-600 rounded-full text-sm font-medium transition-all hover:bg-emerald-200"
          >
            Our Services
          </span>
          <h1
            class="text-4xl md:text-5xl font-bold text-slate-900 mb-4 transition-all"
          >
            Professional Services
          </h1>
          <p class="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            We offer comprehensive services in plastic recycling, machinery
            maintenance, and consulting to help your business thrive.
          </p>
        </div>
      </div>
    </div>

    <!-- Services Grid Section -->
    <section class="py-16 bg-gradient-to-b from-emerald-50 to-white">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section Header -->
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold text-slate-900">Our Services</h2>
          <div class="w-20 h-1 bg-emerald-500 mx-auto mt-4 rounded-full"></div>
          <p class="mt-4 text-slate-600 max-w-2xl mx-auto">
            Discover our comprehensive range of sustainable solutions and expert
            services
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <!-- Service Card Template (repeated 4 times) -->
          <div
            v-for="(service, index) in services"
            :key="index"
            class="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow will-change-transform"
          >
            <div class="relative h-64">
              <img
                :src="service.image"
                :alt="service.title"
                class="w-full h-full object-cover"
                loading="lazy"
              />
              <div
                class="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <div class="absolute bottom-0 left-0 right-0 p-6">
                  <p class="text-white text-lg font-medium">{{ service.subtitle }}</p>
                </div>
              </div>
            </div>
            <div class="p-8">
              <div class="flex items-center gap-4 mb-4">
                <div
                  class="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center"
                >
                  <Icon :name="service.icon" class="w-6 h-6 text-emerald-600" />
                </div>
                <h3 class="text-2xl font-bold text-slate-900">
                  {{ service.title }}
                </h3>
              </div>
              <p class="text-slate-600 mb-6 leading-relaxed">
                {{ service.description }}
              </p>
              <ul class="space-y-3">
                <li
                  v-for="(feature, featureIndex) in service.features"
                  :key="featureIndex"
                  class="flex items-center gap-3"
                >
                  <Icon
                    name="uil:check-circle"
                    class="w-5 h-5 text-emerald-600 flex-shrink-0"
                  />
                  <span class="text-slate-600">{{ feature }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- why choose us section -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12 space-y-4">
          <span
            class="inline-block px-4 py-1 bg-emerald-100 text-emerald-600 rounded-full text-sm font-medium transition-all hover:bg-emerald-200"
          >
            Why Choose Us
          </span>
          <h2 class="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Your Trusted Partner in Plastic Recycling
          </h2>
          <p class="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            We combine expertise, innovation, and commitment to deliver
            exceptional plastic recycling solutions.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Experience Card -->
          <div
            class="bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-slate-100"
          >
            <div
              class="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-6"
            >
              <Icon name="mdi:certificate" class="w-6 h-6 text-emerald-600" />
            </div>
            <h3 class="text-xl font-bold text-slate-900 mb-4">
              {{ new Date().getFullYear() - 1984 }} Years Experience
            </h3>
            <p class="text-slate-600 leading-relaxed">
              Decades of expertise in plastic recycling and sustainable
              solutions, serving industries worldwide.
            </p>
          </div>

          <!-- Quality Card -->
          <div
            class="bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-slate-100"
          >
            <div
              class="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-6"
            >
              <Icon name="mdi:shield-check" class="w-6 h-6 text-emerald-600" />
            </div>
            <h3 class="text-xl font-bold text-slate-900 mb-4">
              Quality Assurance
            </h3>
            <p class="text-slate-600 leading-relaxed">
              Rigorous quality control processes ensuring the highest standards
              in recycling and production.
            </p>
          </div>

          <!-- Innovation Card -->
          <div
            class="bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-slate-100"
          >
            <div
              class="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-6"
            >
              <Icon name="mdi:trending-up" class="w-6 h-6 text-emerald-600" />
            </div>
            <h3 class="text-xl font-bold text-slate-900 mb-4">
              Innovative Approach
            </h3>
            <p class="text-slate-600 leading-relaxed">
              Cutting-edge technology and creative solutions for modern
              recycling challenges.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Additional Sections -->
    <WebCallToAction />
    <!-- <WebGallery /> -->
  </NuxtLayout>
</template>

<script setup lang="ts">
const services = [
  {
    title: 'Product Manufacturing',
    subtitle: 'Sustainable Solutions for a Better Future',
    icon: 'mingcute:recycle-line',
    image: '/images/services/echo-friendly.webp',
    description: 'We cater to the Sri Lankan market with a comprehensive range of plastic products',
    features: [
      'Stools, kitchenware, home & office organisers, basins, cleaning items, and dustbins.',
      'Modern and stylish designs for various needs.',
      'High-quality flower pots.',
      'Educational and children\'s toys designed to inspire and educate.'
    ]
  },
  {
    title: 'Customized Manufacturing',
    subtitle: 'State-of-the-Art Equipment',
    icon: 'mdi:state-machine',
    image: '/images/services/recycling-machinery.webp',
    description: 'We offer tailored plastic manufacturing solutions for local and international partners.',
    features: [
      'Recycling Machines',
      'Mould Accessories & Tools',
      'Raw Materials',
      'Industry Chemicals'
    ]
  },
  {
    title: 'Expert Support',
    subtitle: '24/7 Professional Support',
    icon: 'fluent:person-support-16-filled',
    image: '/images/services/expert-support.webp',
    description: 'Professional guidance and technical assistance to help you achieve your sustainability goals.',
    features: [
      '24/7 technical support',
      'Training programs',
      'Consultation services'
    ]
  },
  {
    title: 'Innovative Solutions',
    subtitle: 'Cutting-edge Technology',
    icon: 'ant-design:solution-outlined',
    image: '/images/services/innovative-solutions.webp',
    description: 'Cutting-edge approaches to plastic recycling and sustainability challenges.',
    features: [
      'Research and development',
      'Custom solutions',
      'Process optimization'
    ]
  }
]

useHead({
  title: 'Services - Samarasinghe Trade Center',
  meta: [
    {
      name: 'description',
      content: 'Professional plastic manufacturing and recycling services in Sri Lanka. Expert solutions in product manufacturing, recycling machinery, and industrial consulting.'
    },
    {
      name: 'keywords',
      content: 'plastic manufacturing services, recycling services, industrial consulting, machinery maintenance, Sri Lanka'
    },
    { name: 'robots', content: 'index, follow' },
    { 
      name: 'canonical', 
      content: 'https://samarasinghetrade.com/services' 
    }
  ],
  link: [
    {
      rel: 'canonical',
      href: 'https://samarasinghetrade.com/services'
    }
  ]
})
</script>

<style scoped>
.blob-1 {
  position: absolute;
  width: 800px;
  height: 800px;
  background: radial-gradient(
    circle,
    rgba(16, 185, 129, 0.1) 0%,
    rgba(16, 185, 129, 0) 70%
  );
  border-radius: 50%;
  top: -400px;
  left: -200px;
  animation: blob-float 20s infinite linear;
}

.blob-2 {
  position: absolute;
  width: 600px;
  height: 600px;
  background: radial-gradient(
    circle,
    rgba(16, 185, 129, 0.1) 0%,
    rgba(16, 185, 129, 0) 70%
  );
  border-radius: 50%;
  bottom: -300px;
  right: -100px;
  animation: blob-float 15s infinite linear reverse;
}

.stat-counter {
  @apply p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-all hover:-translate-y-1;
}

@keyframes blob-float {
  0% {
    transform: rotate(0deg) translate(0, 0);
  }
  50% {
    transform: rotate(180deg) translate(50px, 50px);
  }
  100% {
    transform: rotate(360deg) translate(0, 0);
  }
}

.group {
  backface-visibility: hidden;
  transform: translateZ(0);
}
</style>
