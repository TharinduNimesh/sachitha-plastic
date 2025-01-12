<template>
  <section class="relative py-20 bg-gradient-to-br from-slate-50 to-emerald-50">
    <!-- Background Pattern -->
    <div class="absolute inset-0 z-0">
      <div
        class="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full filter blur-3xl animate-blob bg-emerald-500/10"
      ></div>
      <div
        class="absolute top-1/4 left-1/4 w-96 h-96 bg-slate-500/10 rounded-full filter blur-3xl animate-blob animation-delay-2000"
      ></div>
    </div>

    <!-- Content Container -->
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <!-- Left Image Section -->
        <div class="relative max-w-lg mx-auto lg:max-w-none">
          <div class="relative w-full">
            <div class="absolute -top-5 right-16 z-0">
              <img
                class="w-36 h-36 opacity-30"
                src="/images/elements/dot.png"
                alt="Decorative dots"
              />
            </div>
            <div class="relative">
              <img
                src="/images/aboutus.png"
                alt="About Samarasinghe Trade Center"
                class="w-full rounded-2xl shadow-2xl relative z-10"
              />

              <!-- Experience Card -->
              <div
                class="absolute -right-6 -bottom-6 bg-white p-6 rounded-xl shadow-xl z-20 transform transition-transform duration-300 hover:-translate-y-1"
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
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p class="text-sm font-medium text-slate-600">
                      Years of Experience
                    </p>
                    <p class="text-lg font-bold text-slate-900">41+ Years</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Content -->
        <div class="space-y-8">
          <div class="space-y-4">
            <span
              class="inline-block px-4 py-1 bg-emerald-100 text-emerald-600 rounded-full text-sm font-medium"
            >
              About Us
            </span>
            <h2
              class="text-3xl md:text-4xl font-bold text-slate-900 leading-tight"
            >
              <span class="block">Leading the Way in</span>
              <span class="block text-emerald-600">Sustainable Plastics</span>
            </h2>
          </div>

          <p class="text-lg text-slate-600">
            At Samarasinghe Trade Center, we're committed to revolutionizing the
            plastic industry through sustainable practices and innovative
            solutions. With over 41 years of experience, we've established
            ourselves as a pioneer in eco-friendly plastic products and
            recycling machinery.
          </p>

          <div class="grid grid-cols-2 gap-6">
            <div class="space-y-2">
              <div class="flex items-center space-x-2">
                <svg
                  class="w-5 h-5 text-emerald-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span class="font-medium text-slate-900"
                  >Eco-Friendly Products</span
                >
              </div>
              <p class="text-slate-600">
                Sustainable solutions for modern needs
              </p>
            </div>

            <div class="space-y-2">
              <div class="flex items-center space-x-2">
                <svg
                  class="w-5 h-5 text-emerald-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span class="font-medium text-slate-900"
                  >Quality Machinery</span
                >
              </div>
              <p class="text-slate-600">State-of-the-art recycling equipment</p>
            </div>

            <div class="space-y-2">
              <div class="flex items-center space-x-2">
                <svg
                  class="w-5 h-5 text-emerald-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span class="font-medium text-slate-900">Expert Support</span>
              </div>
              <p class="text-slate-600">Dedicated customer service team</p>
            </div>

            <div class="space-y-2">
              <div class="flex items-center space-x-2">
                <svg
                  class="w-5 h-5 text-emerald-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span class="font-medium text-slate-900">Innovation</span>
              </div>
              <p class="text-slate-600">Continuous research & development</p>
            </div>
          </div>

          <div class="flex flex-wrap gap-4">
            <NuxtLink
              to="/contact"
              class="group inline-flex items-center px-6 py-3 bg-emerald-600 text-white font-medium rounded-xl hover:bg-emerald-700 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
            >
              Contact Us
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
              to="/products"
              class="group inline-flex items-center px-6 py-3 border-2 border-emerald-600 text-emerald-600 font-medium rounded-xl hover:bg-emerald-600 hover:text-white transition-all duration-300"
            >
              Our Products
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
