<template>
  <NuxtLayout name="web">
    <!-- Hero Section with Blob Animation -->
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
            About Samarasinghe Trade Center
          </span>
          <h1
            class="text-4xl md:text-5xl font-bold text-slate-900 mb-4 transition-all"
          >
            Our Journey of Excellence
          </h1>
          <p class="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Pioneering sustainable plastic solutions and innovative recycling
            technologies for over 41 years.
          </p>
        </div>
      </div>
    </div>

    <!-- About Us Section component -->
    <WebAbout />

    <!-- Company Overview Section -->
    <section class="py-16 bg-gradient-to-b from-emerald-50 to-white">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <!-- Content Column -->
          <div class="space-y-8 lg:order-1">
            <div>
              <h2 class="text-3xl font-bold text-slate-900 mb-4">
                Leading the Industry
              </h2>
              <p class="text-slate-600 mb-6 leading-relaxed">
                Samarasinghe Trade Center has been a pioneer in the plastic
                manufacturing industry since its establishment in 1984. Under
                the visionary leadership of Mr. Susil Samarasinghe, we have
                become a trusted name in Sri Lanka, delivering innovative,
                high-quality, and sustainable plastic products. With nearly four
                decades of experience, we have consistently evolved to meet the
                dynamic needs of our customers, combining cutting-edge
                technology with a commitment to environmental responsibility.
              </p>

              <!-- Core Expertise -->
              <div class="mb-6">
                <h3 class="text-xl font-semibold text-slate-900 mb-3">
                  Core Expertise
                </h3>
                <p class="text-slate-600 leading-relaxed">
                  Your Trusted Partner in Plastic Manufacturing At Samarasinghe
                  Trade Center, we combine expertise, innovation, and dedication
                  to deliver exceptional plastic products and recycling
                  solutions that meet the needs of today’s world.
                </p>
              </div>

              <!-- Why Choose Us -->
              <div class="space-y-3">
                <h3 class="text-xl font-semibold text-slate-900">
                  Why Choose Us?
                </h3>
                <ul class="space-y-2">
                  <li class="flex items-center gap-2">
                    <Icon
                      name="uil:check-circle"
                      class="w-5 h-5 text-emerald-600 flex-shrink-0"
                    />
                    <span class="text-slate-600"
                      >Proven expertise in delivering tailored, scalable
                      solutions</span
                    >
                  </li>
                  <li class="flex items-center gap-2">
                    <Icon
                      name="uil:check-circle"
                      class="w-5 h-5 text-emerald-600 flex-shrink-0"
                    />
                    <span class="text-slate-600"
                      >Strong focus on customer satisfaction and environmental
                      responsibility</span
                    >
                  </li>
                  <li class="flex items-center gap-2">
                    <Icon
                      name="uil:check-circle"
                      class="w-5 h-5 text-emerald-600 flex-shrink-0"
                    />
                    <span class="text-slate-600"
                      >A forward-thinking approach to sustainability and
                      innovation</span
                    >
                  </li>
                </ul>
              </div>
            </div>

            <!-- Certifications -->
            <!-- <div class="mt-12">
              <div class="text-center mb-8">
                <h3 class="text-2xl font-bold text-slate-900">
                  International Standards
                </h3>
                <div
                  class="w-20 h-1 bg-emerald-500 mx-auto mt-4 rounded-full"
                ></div>
              </div>

              <div
                class="flex flex-col md:flex-row items-center justify-center gap-8"
              >
                <div class="group w-full md:w-72 relative overflow-hidden">
                  <div
                    class="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  ></div>
                  <div
                    class="relative bg-white border border-slate-100 rounded-2xl p-8 text-center transform transition-transform duration-300 group-hover:-translate-y-1"
                  >
                    <div
                      class="absolute top-0 left-0 w-full h-1 bg-emerald-500 transform -translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                    ></div>
                    <div class="mb-6 relative">
                      <div
                        class="w-20 h-20 mx-auto bg-emerald-50 rounded-2xl p-4 transform transition-transform duration-300 group-hover:scale-110"
                      >
                        <img
                          src="/images/iso-9001.webp"
                          alt="ISO 9001"
                          class="w-full h-full object-contain"
                        />
                      </div>
                    </div>
                    <h4 class="text-xl font-bold text-slate-800 mb-2">
                      ISO 9001:2015
                    </h4>
                    <p class="text-slate-600 text-sm">
                      Quality Management System
                    </p>
                    <div class="mt-4 pt-4 border-t border-slate-100">
                      <p class="text-emerald-600 font-medium text-sm">
                        Certified Excellence
                      </p>
                    </div>
                  </div>
                </div>

                <div class="group w-full md:w-72 relative overflow-hidden">
                  <div
                    class="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  ></div>
                  <div
                    class="relative bg-white border border-slate-100 rounded-2xl p-8 text-center transform transition-transform duration-300 group-hover:-translate-y-1"
                  >
                    <div
                      class="absolute top-0 left-0 w-full h-1 bg-emerald-500 transform -translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                    ></div>
                    <div class="mb-6 relative">
                      <div
                        class="w-20 h-20 mx-auto bg-emerald-50 rounded-2xl p-4 transform transition-transform duration-300 group-hover:scale-110"
                      >
                        <img
                          src="/images/iso-14001.png"
                          alt="ISO 14001"
                          class="w-full h-full object-contain"
                        />
                      </div>
                    </div>
                    <h4 class="text-xl font-bold text-slate-800 mb-2">
                      ISO 14001:2015
                    </h4>
                    <p class="text-slate-600 text-sm">
                      Environmental Management
                    </p>
                    <div class="mt-4 pt-4 border-t border-slate-100">
                      <p class="text-emerald-600 font-medium text-sm">
                        Sustainable Practice
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div> -->
          </div>

          <!-- Image Column -->
          <div class="relative rounded-2xl overflow-hidden lg:order-2">
            <img
              src="/images/company-overview.jpg"
              alt="Company Overview"
              class="w-full h-full object-cover transform transition-transform duration-700 hover:scale-105"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
            >
              <div class="absolute bottom-0 left-0 right-0 p-6">
                <p class="text-white text-lg font-medium tracking-wide">
                  41+ Years of Excellence in Sustainable Solutions
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Our partnership companies team section component -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-2xl font-bold text-center mb-8">Our Quarters</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-white p-6 rounded-lg shadow-lg text-center">
            <img
              src="/images/logo.png"
              alt="Samarasinghe Trade Center"
              class="h-24 w-auto mx-auto mb-4"
            />
            <h3 class="text-xl font-semibold">Samarasinghe Trade Center</h3>
            <p>
              Our main office oversees strategic planning, customer service, and
              operational management, driving innovation and quality in
              everything we do.
            </p>

            <h3 class="text-xl font-semibold mt-4">Address</h3>
            <p>
              No. 22, 1st Floor, Supermarket Building, Nugegoda, Sri
              Lanka
            </p>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-lg text-center">
            <img
              src="/images/sd-industries.webp"
              alt="SD Industries"
              class="h-24 w-auto mx-auto mb-4"
            />
            <h3 class="text-xl font-semibold">SD Industries</h3>
            <p>
              Focused on supporting the plastic manufacturing process with
              innovative solutions and essential industry resources.
            </p>

            <h3 class="text-xl font-semibold mt-4">Address</h3>
            <p>
              No. 29, Stage 2 Temple Burg Industrial Zone, Panagoda, Sri
              Lanka
            </p>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-lg text-center">
            <img
              src="/images/sachitha-plastic-manufacture.webp"
              alt="Sachitha Plastic Manufacture"
              class="h-24 w-auto mx-auto mb-4"
            />
            <h3 class="text-xl font-semibold">Sachitha Plastic Manufacture</h3>
            <p>
              A subsidiary specializing in high-quality plastic production,
              combining advanced techniques with eco-friendly practices.
            </p>

            <h3 class="text-xl font-semibold mt-4">Address</h3>
            <p>
              No. 6 & 7, State 2 Temple Burg Industrial Zone, Panagoda, Sri
              Lanka
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Mission & Values Section -->
    <section class="py-16 bg-gradient-to-br from-slate-50 to-emerald-50/30">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-bold text-center text-slate-900 mb-4">
          Our Purpose
        </h2>
        <p class="text-center text-slate-600 max-w-3xl mx-auto mb-12">
          Pioneering sustainable plastic solutions and recycling technologies to
          create a cleaner, greener future for generations to come.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Mission Card -->
          <div
            class="group bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-emerald-100/50"
          >
            <div
              class="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-emerald-200 transition-colors"
            >
              <Icon name="carbon:growth" class="w-7 h-7 text-emerald-700" />
            </div>
            <h3 class="text-xl font-semibold text-slate-800 mb-4">
              Our Mission
            </h3>
            <ul class="space-y-3">
              <li class="flex items-start gap-3">
                <Icon
                  name="carbon:checkmark"
                  class="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0"
                />
                <span class="text-slate-600 leading-relaxed"
                  >To lead the plastic manufacturing industry in Sri Lanka by
                  delivering high-quality, innovative, and sustainable products
                  while ensuring exceptional customer service and
                  environmentally friendly practices.</span
                >
              </li>
            </ul>
          </div>

          <!-- Vision Card -->
          <div
            class="group bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-emerald-100/50"
          >
            <div
              class="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-emerald-200 transition-colors"
            >
              <Icon name="carbon:idea" class="w-7 h-7 text-emerald-700" />
            </div>
            <h3 class="text-xl font-semibold text-slate-800 mb-4">
              Our Vision
            </h3>
            <ul class="space-y-3">
              <li class="flex items-start gap-3">
                <Icon
                  name="carbon:checkmark"
                  class="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0"
                />
                <span class="text-slate-600 leading-relaxed"
                  >To be the leading provider of plastic products in South Asia,
                  recognised for our commitment to quality, innovation, and
                  sustainability.</span
                >
              </li>
            </ul>
          </div>

          <!-- Values Card -->
          <div
            class="group bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-emerald-100/50"
          >
            <div
              class="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-emerald-200 transition-colors"
            >
              <Icon name="carbon:badge" class="w-7 h-7 text-emerald-700" />
            </div>
            <h3 class="text-xl font-semibold text-slate-800 mb-4">
              Our Values
            </h3>
            <ul class="space-y-3">
              <li class="flex items-start gap-3">
                <Icon
                  name="carbon:checkmark"
                  class="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0"
                />
                <span class="text-slate-600 leading-relaxed"
                  >Integrity & Quality: Upholding the highest standards while
                  delivering exceptional value.</span
                >
              </li>
              <li class="flex items-start gap-3">
                <Icon
                  name="carbon:checkmark"
                  class="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0"
                />
                <span class="text-slate-600 leading-relaxed"
                  >Sustainability & Innovation: Embracing Reduce – Reuse –
                  Recycle for a greener future.</span
                >
              </li>
            </ul>
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
useHead({
  title: "About Us - Samarasinghe Trade Center",
  meta: [
    {
      name: "description",
      content:
        "Learn about Samarasinghe Trade Center's 41+ years of excellence in plastic manufacturing and recycling solutions. ISO certified company committed to quality and sustainability.",
    },
    {
      name: "keywords",
      content:
        "about STC, plastic manufacturing history, company profile, ISO certification, Sri Lanka, sustainable manufacturing",
    },
    { name: "robots", content: "index, follow" },
    {
      name: "canonical",
      content: "https://samarasinghetrade.com/about",
    },
  ],
  link: [
    {
      rel: "canonical",
      href: "https://samarasinghetrade.com/about",
    },
  ],
});
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
