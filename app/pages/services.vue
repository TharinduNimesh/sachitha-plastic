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
          <!-- Eco-Friendly Products Card -->
          <div
            class="group relative bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
          >
            <div
              class="absolute top-0 left-0 w-full h-1 bg-emerald-500 transform -translate-y-full group-hover:translate-y-0 transition-transform duration-300"
            ></div>
            <div class="relative h-64 overflow-hidden">
              <img
                src="/images/services/echo-friendly.jpg"
                alt="Eco-Friendly Products"
                class="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
              />
              <div
                class="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <div class="absolute bottom-0 left-0 right-0 p-6">
                  <p class="text-white text-lg font-medium">
                    Sustainable Solutions for a Better Future
                  </p>
                </div>
              </div>
            </div>
            <div class="p-8">
              <div class="flex items-center gap-4 mb-4">
                <div
                  class="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center"
                >
                  <Icon
                    name="mingcute:recycle-line"
                    class="w-6 h-6 text-emerald-600"
                  />
                </div>
                <h3 class="text-2xl font-bold text-slate-900">
                  Product Manufacturing
                </h3>
              </div>
              <p class="text-slate-600 mb-6 leading-relaxed">
                We cater to the Sri Lankan market with a comprehensive range of
                plastic products
              </p>
              <ul class="space-y-3">
                <li class="flex items-center gap-3">
                  <Icon
                    name="uil:check-circle"
                    class="w-5 h-5 text-emerald-600 flex-shrink-0"
                  />
                  <span class="text-slate-600"
                    >Stools, kitchenware, home & office organisers, basins,
                    cleaning items, and dustbins.</span
                  >
                </li>
                <li class="flex items-center gap-3">
                  <Icon
                    name="uil:check-circle"
                    class="w-5 h-5 text-emerald-600 flex-shrink-0"
                  />
                  <span class="text-slate-600"
                    >Modern and stylish designs for various needs.</span
                  >
                </li>
                <li class="flex items-center gap-3">
                  <Icon
                    name="uil:check-circle"
                    class="w-5 h-5 text-emerald-600 flex-shrink-0"
                  />
                  <span class="text-slate-600">High-quality flower pots.</span>
                </li>
                <li class="flex items-center gap-3">
                  <Icon
                    name="uil:check-circle"
                    class="w-5 h-5 text-emerald-600 flex-shrink-0"
                  />
                  <span class="text-slate-600"
                    >Educational and children’s toys designed to inspire and
                    educate.</span
                  >
                </li>
              </ul>
            </div>
          </div>

          <!-- Recycling Machinery Card -->
          <div
            class="group relative bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
          >
            <div
              class="absolute top-0 left-0 w-full h-1 bg-emerald-500 transform -translate-y-full group-hover:translate-y-0 transition-transform duration-300"
            ></div>
            <div class="relative h-64 overflow-hidden">
              <img
                src="/images/services/recycling-machinery.jpg"
                alt="Recycling Machinery"
                class="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
              />
              <div
                class="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <div class="absolute bottom-0 left-0 right-0 p-6">
                  <p class="text-white text-lg font-medium">
                    State-of-the-Art Equipment
                  </p>
                </div>
              </div>
            </div>
            <div class="p-8">
              <div class="flex items-center gap-4 mb-4">
                <div
                  class="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center"
                >
                  <Icon
                    name="mdi:state-machine"
                    class="w-6 h-6 text-emerald-600"
                  />
                </div>
                <h3 class="text-2xl font-bold text-slate-900">
                  Customized Manufacturing
                </h3>
              </div>
              <p class="text-slate-600 mb-6 leading-relaxed">
                We offer tailored plastic manufacturing solutions for local and
                international partners.meeting specific requirements with
                precision and efficiency
              </p>
              <ul class="space-y-3">
                <li class="flex items-center gap-3">
                  <Icon
                    name="uil:check-circle"
                    class="w-5 h-5 text-emerald-600 flex-shrink-0"
                  />
                  <span class="text-slate-600">Recycling Machines</span>
                </li>
                <li class="flex items-center gap-3">
                  <Icon
                    name="uil:check-circle"
                    class="w-5 h-5 text-emerald-600 flex-shrink-0"
                  />
                  <span class="text-slate-600">Mould Accessories & Tools</span>
                </li>
                <li class="flex items-center gap-3">
                  <Icon
                    name="uil:check-circle"
                    class="w-5 h-5 text-emerald-600 flex-shrink-0"
                  />
                  <span class="text-slate-600">Raw Materials</span>
                </li>
                <li class="flex items-center gap-3">
                  <Icon
                    name="uil:check-circle"
                    class="w-5 h-5 text-emerald-600 flex-shrink-0"
                  />
                  <span class="text-slate-600">Industry Chemicals</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- Expert Support Card -->
          <div
            class="group relative bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
          >
            <div
              class="absolute top-0 left-0 w-full h-1 bg-emerald-500 transform -translate-y-full group-hover:translate-y-0 transition-transform duration-300"
            ></div>
            <div class="relative h-64 overflow-hidden">
              <img
                src="/images/services/expert-support.jpg"
                alt="Expert Support"
                class="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
              />
              <div
                class="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <div class="absolute bottom-0 left-0 right-0 p-6">
                  <p class="text-white text-lg font-medium">
                    24/7 Professional Support
                  </p>
                </div>
              </div>
            </div>
            <div class="p-8">
              <div class="flex items-center gap-4 mb-4">
                <div
                  class="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center"
                >
                  <Icon
                    name="fluent:person-support-16-filled"
                    class="w-6 h-6 text-emerald-600"
                  />
                </div>
                <h3 class="text-2xl font-bold text-slate-900">
                  Expert Support
                </h3>
              </div>
              <p class="text-slate-600 mb-6 leading-relaxed">
                Professional guidance and technical assistance to help you
                achieve your sustainability goals.
              </p>
              <ul class="space-y-3">
                <li class="flex items-center gap-3">
                  <Icon
                    name="uil:check-circle"
                    class="w-5 h-5 text-emerald-600 flex-shrink-0"
                  />
                  <span class="text-slate-600">24/7 technical support</span>
                </li>
                <li class="flex items-center gap-3">
                  <Icon
                    name="uil:check-circle"
                    class="w-5 h-5 text-emerald-600 flex-shrink-0"
                  />
                  <span class="text-slate-600">Training programs</span>
                </li>
                <li class="flex items-center gap-3">
                  <Icon
                    name="uil:check-circle"
                    class="w-5 h-5 text-emerald-600 flex-shrink-0"
                  />
                  <span class="text-slate-600">Consultation services</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- Innovative Solutions Card -->
          <div
            class="group relative bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
          >
            <div
              class="absolute top-0 left-0 w-full h-1 bg-emerald-500 transform -translate-y-full group-hover:translate-y-0 transition-transform duration-300"
            ></div>
            <div class="relative h-64 overflow-hidden">
              <img
                src="/images/services/innovative-solutions.jpg"
                alt="Innovative Solutions"
                class="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
              />
              <div
                class="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <div class="absolute bottom-0 left-0 right-0 p-6">
                  <p class="text-white text-lg font-medium">
                    Cutting-edge Technology
                  </p>
                </div>
              </div>
            </div>
            <div class="p-8">
              <div class="flex items-center gap-4 mb-4">
                <div
                  class="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center"
                >
                  <Icon
                    name="ant-design:solution-outlined"
                    class="w-6 h-6 text-emerald-600"
                  />
                </div>
                <h3 class="text-2xl font-bold text-slate-900">
                  Innovative Solutions
                </h3>
              </div>
              <p class="text-slate-600 mb-6 leading-relaxed">
                Cutting-edge approaches to plastic recycling and sustainability
                challenges.
              </p>
              <ul class="space-y-3">
                <li class="flex items-center gap-3">
                  <Icon
                    name="uil:check-circle"
                    class="w-5 h-5 text-emerald-600 flex-shrink-0"
                  />
                  <span class="text-slate-600">Research and development</span>
                </li>
                <li class="flex items-center gap-3">
                  <Icon
                    name="uil:check-circle"
                    class="w-5 h-5 text-emerald-600 flex-shrink-0"
                  />
                  <span class="text-slate-600">Custom solutions</span>
                </li>
                <li class="flex items-center gap-3">
                  <Icon
                    name="uil:check-circle"
                    class="w-5 h-5 text-emerald-600 flex-shrink-0"
                  />
                  <span class="text-slate-600">Process optimization</span>
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
              25+ Years Experience
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
    <WebGallery />
  </NuxtLayout>
</template>

<script setup lang="ts">
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
</style>
