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
          <span class="inline-block px-4 py-1 bg-emerald-100 text-emerald-600 rounded-full text-sm font-medium transition-all hover:bg-emerald-200">
            About Samarasinghe Trade Center
          </span>
          <h1 class="text-4xl md:text-5xl font-bold text-slate-900 mb-4 transition-all">
            Our Journey of Excellence
          </h1>
          <p class="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Pioneering sustainable plastic solutions and innovative recycling
            technologies for over 25 years.
          </p>
        </div>
      </div>
    </div>

     <!-- About Us Section component -->
     <WebAbout />

    <!-- Company Overview Section -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <!-- Content Column -->
          <div class="space-y-8 lg:order-1">
            <div class="bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
              <h2 class="text-3xl font-bold text-slate-900 mb-4">Leading the Industry</h2>
              <p class="text-slate-600 mb-6 leading-relaxed">
                Samarasinghe Trade Center stands as a beacon of excellence in sustainable plastic solutions and innovative recycling technologies. With a legacy spanning over 25 years, we have consistently delivered impactful solutions that transform waste management into opportunities for a greener future.
              </p>
              
              <!-- Core Expertise -->
              <div class="mb-6">
                <h3 class="text-xl font-semibold text-slate-900 mb-3">Core Expertise</h3>
                <p class="text-slate-600 leading-relaxed">
                  Our solutions combine cutting-edge recycling technologies with innovative approaches to plastic reusability. By prioritizing sustainability, we have made significant contributions to reducing environmental impact and promoting a circular economy.
                </p>
              </div>

              <!-- Key Achievements -->
              <div class="grid grid-cols-2 gap-4 mb-6">
                <div class="p-4 rounded-lg bg-emerald-50 hover:bg-emerald-100 transition-colors">
                  <div class="text-2xl font-bold text-emerald-600">25+</div>
                  <div class="text-sm text-slate-600">Years of Industry Experience</div>
                </div>
                <div class="p-4 rounded-lg bg-emerald-50 hover:bg-emerald-100 transition-colors">
                  <div class="text-2xl font-bold text-emerald-600">1000+</div>
                  <div class="text-sm text-slate-600">Projects Completed</div>
                </div>
              </div>

              <!-- Why Choose Us -->
              <div class="space-y-3">
                <h3 class="text-xl font-semibold text-slate-900">Why Choose Us?</h3>
                <ul class="space-y-2">
                  <li class="flex items-center gap-2">
                    <Icon name="uil:check-circle" class="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <span class="text-slate-600">Proven expertise in delivering tailored, scalable solutions</span>
                  </li>
                  <li class="flex items-center gap-2">
                    <Icon name="uil:check-circle" class="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <span class="text-slate-600">Strong focus on customer satisfaction and environmental responsibility</span>
                  </li>
                  <li class="flex items-center gap-2">
                    <Icon name="uil:check-circle" class="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <span class="text-slate-600">A forward-thinking approach to sustainability and innovation</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <!-- Certifications -->
            <div class="flex gap-6 justify-start mt-8">
              <div class="p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 w-48">
                <div class="flex justify-center mb-4">
                  <img src="/images/iso-9001.webp" alt="ISO 9001" class="h-16 w-auto" />
                </div>
                <p class="text-lg font-semibold text-slate-800 text-center">ISO 9001:2015</p>
                <p class="text-sm text-slate-600 mt-1 text-center">Quality Management</p>
              </div>
              <div class="p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 w-48">
                <div class="flex justify-center mb-4">
                  <img src="/images/ISO-14001-Certificate.png" alt="ISO 14001" class="h-16 w-auto" />
                </div>
                <p class="text-lg font-semibold text-slate-800 text-center">ISO 14001:2015</p>
                <p class="text-sm text-slate-600 mt-1 text-center">Environmental Management</p>
              </div>
            </div>
          </div>
          
          <!-- Image Column -->
          <div class="relative rounded-2xl overflow-hidden lg:order-2">
            <img src="/images/company-overview.jpg" alt="Company Overview" class="w-full h-full object-cover" />
            <div class="absolute inset-0 bg-emerald-900/10 backdrop-blur-sm opacity-0 hover:opacity-100 transition-opacity duration-300">
              <div class="p-6 absolute bottom-0 left-0 right-0 bg-gradient-to-t from-emerald-900/80 to-transparent">
                <p class="text-white text-lg font-medium">25+ Years of Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Mission & Values Section -->
    <section class="py-16 bg-gradient-to-br from-slate-50 to-emerald-50">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-bold text-center text-slate-900 mb-12">Our Mission & Values</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Mission Card -->
          <div class="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
            <div class="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
              <Icon name="mingcute:target-line" class="w-6 h-6 text-emerald-600" />
            </div>
            <h3 class="text-xl font-semibold text-slate-900 mb-3">Our Mission</h3>
            <ul class="space-y-2">
              <li class="flex items-center gap-2">
                <Icon name="uil:check" class="w-5 h-5 text-emerald-600" />
                <span class="text-slate-600">Sustainable Solutions</span>
              </li>
              <li class="flex items-center gap-2">
                <Icon name="uil:check" class="w-5 h-5 text-emerald-600" />
                <span class="text-slate-600">Innovation Focus</span>
              </li>
            </ul>
          </div>

          <!-- Vision Card -->
          <div class="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
            <div class="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
              <Icon name="uil:eye" class="w-6 h-6 text-emerald-600" />
            </div>
            <h3 class="text-xl font-semibold text-slate-900 mb-3">Our Vision</h3>
            <ul class="space-y-2">
              <li class="flex items-center gap-2">
                <Icon name="uil:check" class="w-5 h-5 text-emerald-600" />
                <span class="text-slate-600">Industry Leadership</span>
              </li>
              <li class="flex items-center gap-2">
                <Icon name="uil:check" class="w-5 h-5 text-emerald-600" />
                <span class="text-slate-600">Global Impact</span>
              </li>
            </ul>
          </div>

          <!-- Values Card -->
          <div class="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
            <div class="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
              <Icon name="uil:heart" class="w-6 h-6 text-emerald-600" />
            </div>
            <h3 class="text-xl font-semibold text-slate-900 mb-3">Our Values</h3>
            <ul class="space-y-2">
              <li class="flex items-center gap-2">
                <Icon name="uil:check" class="w-5 h-5 text-emerald-600" />
                <span class="text-slate-600">Quality Excellence</span>
              </li>
              <li class="flex items-center gap-2">
                <Icon name="uil:check" class="w-5 h-5 text-emerald-600" />
                <span class="text-slate-600">Customer Focus</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

   

    <!-- Additional Sections -->
    <WebCallToAction />
    <WebGallery />
  </NuxtLayout>
</template>


<style scoped>
.blob-1 {
  position: absolute;
  width: 800px;
  height: 800px;
  background: radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, rgba(16, 185, 129, 0) 70%);
  border-radius: 50%;
  top: -400px;
  left: -200px;
  animation: blob-float 20s infinite linear;
}

.blob-2 {
  position: absolute;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, rgba(16, 185, 129, 0) 70%);
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
