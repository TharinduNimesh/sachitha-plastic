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
    <section class="py-16 bg-gradient-to-b from-emerald-50 to-white">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <!-- Content Column -->
          <div class="space-y-8 lg:order-1">
            <div>
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
            <div class="mt-12">
              <div class="text-center mb-8">
                <h3 class="text-2xl font-bold text-slate-900">International Standards</h3>
                <div class="w-20 h-1 bg-emerald-500 mx-auto mt-4 rounded-full"></div>
              </div>
              
              <div class="flex flex-col md:flex-row items-center justify-center gap-8">
                <!-- ISO 9001 -->
                <div class="group w-full md:w-72 relative overflow-hidden">
                  <div class="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div class="relative bg-white border border-slate-100 rounded-2xl p-8 text-center transform transition-transform duration-300 group-hover:-translate-y-1">
                    <div class="absolute top-0 left-0 w-full h-1 bg-emerald-500 transform -translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                    <div class="mb-6 relative">
                      <div class="w-20 h-20 mx-auto bg-emerald-50 rounded-2xl p-4 transform transition-transform duration-300 group-hover:scale-110">
                        <img src="/images/iso-9001.webp" alt="ISO 9001" class="w-full h-full object-contain" />
                      </div>
                    </div>
                    <h4 class="text-xl font-bold text-slate-800 mb-2">ISO 9001:2015</h4>
                    <p class="text-slate-600 text-sm">Quality Management System</p>
                    <div class="mt-4 pt-4 border-t border-slate-100">
                      <p class="text-emerald-600 font-medium text-sm">Certified Excellence</p>
                    </div>
                  </div>
                </div>

                <!-- ISO 14001 -->
                <div class="group w-full md:w-72 relative overflow-hidden">
                  <div class="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div class="relative bg-white border border-slate-100 rounded-2xl p-8 text-center transform transition-transform duration-300 group-hover:-translate-y-1">
                    <div class="absolute top-0 left-0 w-full h-1 bg-emerald-500 transform -translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                    <div class="mb-6 relative">
                      <div class="w-20 h-20 mx-auto bg-emerald-50 rounded-2xl p-4 transform transition-transform duration-300 group-hover:scale-110">
                        <img src="/images/iso-14001.png" alt="ISO 14001" class="w-full h-full object-contain" />
                      </div>
                    </div>
                    <h4 class="text-xl font-bold text-slate-800 mb-2">ISO 14001:2015</h4>
                    <p class="text-slate-600 text-sm">Environmental Management</p>
                    <div class="mt-4 pt-4 border-t border-slate-100">
                      <p class="text-emerald-600 font-medium text-sm">Sustainable Practice</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Image Column -->
          <div class="relative rounded-2xl overflow-hidden lg:order-2">
            <img 
              src="/images/company-overview.jpg" 
              alt="Company Overview" 
              class="w-full h-full object-cover transform transition-transform duration-700 hover:scale-105" 
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
              <div class="absolute bottom-0 left-0 right-0 p-6">
                <p class="text-white text-lg font-medium tracking-wide">
                  25+ Years of Excellence in Sustainable Solutions
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Mission & Values Section -->
    <section class="py-16 bg-gradient-to-br from-slate-50 to-emerald-50/30">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-bold text-center text-slate-900 mb-4">Our Purpose</h2>
        <p class="text-center text-slate-600 max-w-3xl mx-auto mb-12">Pioneering sustainable plastic solutions and recycling technologies to create a cleaner, greener future for generations to come.</p>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Mission Card -->
          <div class="group bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-emerald-100/50">
            <div class="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-emerald-200 transition-colors">
              <Icon name="carbon:growth" class="w-7 h-7 text-emerald-700" />
            </div>
            <h3 class="text-xl font-semibold text-slate-800 mb-4">Our Mission</h3>
            <ul class="space-y-3">
              <li class="flex items-start gap-3">
                <Icon name="carbon:checkmark" class="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" />
                <span class="text-slate-600 leading-relaxed">Provide cutting-edge recycling machinery solutions that transform waste into valuable resources</span>
              </li>
              <li class="flex items-start gap-3">
                <Icon name="carbon:checkmark" class="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" />
                <span class="text-slate-600 leading-relaxed">Drive innovation in plastic processing technology to promote circular economy</span>
              </li>
            </ul>
          </div>

          <!-- Vision Card -->
          <div class="group bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-emerald-100/50">
            <div class="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-emerald-200 transition-colors">
              <Icon name="carbon:idea" class="w-7 h-7 text-emerald-700" />
            </div>
            <h3 class="text-xl font-semibold text-slate-800 mb-4">Our Vision</h3>
            <ul class="space-y-3">
              <li class="flex items-start gap-3">
                <Icon name="carbon:checkmark" class="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" />
                <span class="text-slate-600 leading-relaxed">Lead Sri Lanka's transition to sustainable plastic waste management</span>
              </li>
              <li class="flex items-start gap-3">
                <Icon name="carbon:checkmark" class="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" />
                <span class="text-slate-600 leading-relaxed">Establish global standards in recycling machine manufacturing</span>
              </li>
            </ul>
          </div>

          <!-- Values Card -->
          <div class="group bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-emerald-100/50">
            <div class="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-emerald-200 transition-colors">
              <Icon name="carbon:badge" class="w-7 h-7 text-emerald-700" />
            </div>
            <h3 class="text-xl font-semibold text-slate-800 mb-4">Our Values</h3>
            <ul class="space-y-3">
              <li class="flex items-start gap-3">
                <Icon name="carbon:checkmark" class="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" />
                <span class="text-slate-600 leading-relaxed">Excellence in manufacturing with ISO 9001:2015 certification</span>
              </li>
              <li class="flex items-start gap-3">
                <Icon name="carbon:checkmark" class="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" />
                <span class="text-slate-600 leading-relaxed">Environmental stewardship backed by ISO 14001:2015</span>
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
