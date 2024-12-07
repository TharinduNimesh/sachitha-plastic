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
          <span class="inline-block px-4 py-1 bg-emerald-100 text-emerald-600 rounded-full text-sm font-medium transition-all hover:bg-emerald-200">
            Our Services
          </span>
          <h1 class="text-4xl md:text-5xl font-bold text-slate-900 mb-4 transition-all">
            Professional Services
          </h1>
          <p class="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            We offer comprehensive services in plastic recycling, machinery maintenance, and consulting to help your business thrive.
          </p>
        </div>
      </div>
    </div>

    

    <!-- Services Grid Section -->
    <section class="py-16 bg-gradient-to-br from-slate-50 to-emerald-50">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="space-y-24">
          <!-- Eco-Friendly Products -->
          <div class="relative">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <!-- Image Column -->
              <div class="relative rounded-2xl overflow-hidden">
                <img 
                  src="/images/services/echo-friendly.jpg" 
                  alt="Eco-Friendly Products" 
                  class="w-full h-[400px] object-cover"
                />
                <div class="absolute inset-0 bg-emerald-900/10 backdrop-blur-sm opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <div class="p-6 absolute bottom-0 left-0 right-0 bg-gradient-to-t from-emerald-900/80 to-transparent">
                    <p class="text-white text-lg font-medium">Sustainable Solutions</p>
                  </div>
                </div>
              </div>
              
              <!-- Content Column -->
              <div class="space-y-8">
                <div class="bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
                  <div class="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                    <Icon name="mingcute:recycle-line" class="w-6 h-6 text-emerald-600" />
                  </div>
                  <h2 class="text-3xl font-bold text-slate-900 mb-4">Eco-Friendly Products</h2>
                  <p class="text-slate-600 mb-6 leading-relaxed">
                    Sustainable plastic solutions that prioritize environmental responsibility while maintaining high quality and performance.
                  </p>
                  <ul class="space-y-3">
                    <li class="flex items-center gap-2">
                      <Icon name="uil:check-circle" class="w-5 h-5 text-emerald-600 flex-shrink-0" />
                      <span class="text-slate-600">Biodegradable packaging solutions</span>
                    </li>
                    <li class="flex items-center gap-2">
                      <Icon name="uil:check-circle" class="w-5 h-5 text-emerald-600 flex-shrink-0" />
                      <span class="text-slate-600">Recycled plastic materials</span>
                    </li>
                    <li class="flex items-center gap-2">
                      <Icon name="uil:check-circle" class="w-5 h-5 text-emerald-600 flex-shrink-0" />
                      <span class="text-slate-600">Sustainable product designs</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <!-- Recycling Machinery -->
          <div class="relative">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <!-- Content Column -->
              <div class="space-y-8 lg:order-1">
                <div class="bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
                  <div class="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                    <Icon name="mdi:state-machine" class="w-6 h-6 text-emerald-600" />
                  </div>
                  <h2 class="text-3xl font-bold text-slate-900 mb-4">Quality Recycling Machinery</h2>
                  <p class="text-slate-600 mb-6 leading-relaxed">
                    State-of-the-art equipment and machinery for efficient plastic recycling operations and waste management.
                  </p>
                  <ul class="space-y-3">
                    <li class="flex items-center gap-2">
                      <Icon name="uil:check-circle" class="w-5 h-5 text-emerald-600 flex-shrink-0" />
                      <span class="text-slate-600">Advanced sorting systems</span>
                    </li>
                    <li class="flex items-center gap-2">
                      <Icon name="uil:check-circle" class="w-5 h-5 text-emerald-600 flex-shrink-0" />
                      <span class="text-slate-600">Processing equipment</span>
                    </li>
                    <li class="flex items-center gap-2">
                      <Icon name="uil:check-circle" class="w-5 h-5 text-emerald-600 flex-shrink-0" />
                      <span class="text-slate-600">Maintenance services</span>
                    </li>
                  </ul>
                </div>
              </div>
              <!-- Image Column -->
              <div class="relative rounded-2xl overflow-hidden lg:order-2">
                <img 
                  src="/images/services/recycling-machinery.jpg" 
                  alt="Recycling Machinery" 
                  class="w-full h-[400px] object-cover"
                />
                <div class="absolute inset-0 bg-emerald-900/10 backdrop-blur-sm opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <div class="p-6 absolute bottom-0 left-0 right-0 bg-gradient-to-t from-emerald-900/80 to-transparent">
                    <p class="text-white text-lg font-medium">Modern Equipment</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Expert Support -->
          <div class="relative">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <!-- Image Column -->
              <div class="relative rounded-2xl overflow-hidden">
                <img 
                  src="/images/services/expert-support.jpg" 
                  alt="Expert Support" 
                  class="w-full h-[400px] object-cover"
                />
                <div class="absolute inset-0 bg-emerald-900/10 backdrop-blur-sm opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <div class="p-6 absolute bottom-0 left-0 right-0 bg-gradient-to-t from-emerald-900/80 to-transparent">
                    <p class="text-white text-lg font-medium">24/7 Support</p>
                  </div>
                </div>
              </div>
              
              <!-- Content Column -->
              <div class="space-y-8">
                <div class="bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
                  <div class="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                    <Icon name="fluent:person-support-16-filled" class="w-6 h-6 text-emerald-600" />
                  </div>
                  <h2 class="text-3xl font-bold text-slate-900 mb-4">Expert Support</h2>
                  <p class="text-slate-600 mb-6 leading-relaxed">
                    Professional guidance and technical assistance to help you achieve your sustainability goals.
                  </p>
                  <ul class="space-y-3">
                    <li class="flex items-center gap-2">
                      <Icon name="uil:check-circle" class="w-5 h-5 text-emerald-600 flex-shrink-0" />
                      <span class="text-slate-600">24/7 technical support</span>
                    </li>
                    <li class="flex items-center gap-2">
                      <Icon name="uil:check-circle" class="w-5 h-5 text-emerald-600 flex-shrink-0" />
                      <span class="text-slate-600">Training programs</span>
                    </li>
                    <li class="flex items-center gap-2">
                      <Icon name="uil:check-circle" class="w-5 h-5 text-emerald-600 flex-shrink-0" />
                      <span class="text-slate-600">Consultation services</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <!-- Innovative Solutions -->
          <div class="relative">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <!-- Content Column -->
              <div class="space-y-8 lg:order-1">
                <div class="bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
                  <div class="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                    <Icon name="ant-design:solution-outlined" class="w-6 h-6 text-emerald-600" />
                  </div>
                  <h2 class="text-3xl font-bold text-slate-900 mb-4">Innovative Solutions</h2>
                  <p class="text-slate-600 mb-6 leading-relaxed">
                    Cutting-edge approaches to plastic recycling and sustainability challenges.
                  </p>
                  <ul class="space-y-3">
                    <li class="flex items-center gap-2">
                      <Icon name="uil:check-circle" class="w-5 h-5 text-emerald-600 flex-shrink-0" />
                      <span class="text-slate-600">Custom recycling solutions</span>
                    </li>
                    <li class="flex items-center gap-2">
                      <Icon name="uil:check-circle" class="w-5 h-5 text-emerald-600 flex-shrink-0" />
                      <span class="text-slate-600">Process optimization</span>
                    </li>
                    <li class="flex items-center gap-2">
                      <Icon name="uil:check-circle" class="w-5 h-5 text-emerald-600 flex-shrink-0" />
                      <span class="text-slate-600">Research and development</span>
                    </li>
                  </ul>
                </div>
              </div>
              <!-- Image Column -->
              <div class="relative rounded-2xl overflow-hidden lg:order-2">
                <img 
                  src="/images/services/innovative-solutions.jpg" 
                  alt="Innovative Solutions" 
                  class="w-full h-[400px] object-cover"
                />
                <div class="absolute inset-0 bg-emerald-900/10 backdrop-blur-sm opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <div class="p-6 absolute bottom-0 left-0 right-0 bg-gradient-to-t from-emerald-900/80 to-transparent">
                    <p class="text-white text-lg font-medium">Smart Solutions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- why choose us section -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12 space-y-4">
          <span class="inline-block px-4 py-1 bg-emerald-100 text-emerald-600 rounded-full text-sm font-medium transition-all hover:bg-emerald-200">
            Why Choose Us
          </span>
          <h2 class="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Your Trusted Partner in Plastic Recycling
          </h2>
          <p class="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            We combine expertise, innovation, and commitment to deliver exceptional plastic recycling solutions.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Experience Card -->
          <div class="bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-slate-100">
            <div class="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
              <Icon name="mdi:certificate" class="w-6 h-6 text-emerald-600" />
            </div>
            <h3 class="text-xl font-bold text-slate-900 mb-4">25+ Years Experience</h3>
            <p class="text-slate-600 leading-relaxed">
              Decades of expertise in plastic recycling and sustainable solutions, serving industries worldwide.
            </p>
          </div>

          <!-- Quality Card -->
          <div class="bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-slate-100">
            <div class="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
              <Icon name="mdi:shield-check" class="w-6 h-6 text-emerald-600" />
            </div>
            <h3 class="text-xl font-bold text-slate-900 mb-4">Quality Assurance</h3>
            <p class="text-slate-600 leading-relaxed">
              Rigorous quality control processes ensuring the highest standards in recycling and production.
            </p>
          </div>

          <!-- Innovation Card -->
          <div class="bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-slate-100">
            <div class="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
              <Icon name="mdi:trending-up" class="w-6 h-6 text-emerald-600" />
            </div>
            <h3 class="text-xl font-bold text-slate-900 mb-4">Innovative Approach</h3>
            <p class="text-slate-600 leading-relaxed">
              Cutting-edge technology and creative solutions for modern recycling challenges.
            </p>
          </div>
        </div>

        <!-- Stats Section -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
          <div class="text-center p-6 rounded-lg bg-emerald-50 hover:bg-emerald-100 transition-colors">
            <div class="text-3xl font-bold text-emerald-600 mb-2">25+</div>
            <div class="text-sm text-slate-600">Years Experience</div>
          </div>
          <div class="text-center p-6 rounded-lg bg-emerald-50 hover:bg-emerald-100 transition-colors">
            <div class="text-3xl font-bold text-emerald-600 mb-2">1000+</div>
            <div class="text-sm text-slate-600">Projects Completed</div>
          </div>
          <div class="text-center p-6 rounded-lg bg-emerald-50 hover:bg-emerald-100 transition-colors">
            <div class="text-3xl font-bold text-emerald-600 mb-2">24/7</div>
            <div class="text-sm text-slate-600">Support Available</div>
          </div>
          <div class="text-center p-6 rounded-lg bg-emerald-50 hover:bg-emerald-100 transition-colors">
            <div class="text-3xl font-bold text-emerald-600 mb-2">100%</div>
            <div class="text-sm text-slate-600">Client Satisfaction</div>
          </div>
        </div>
      </div>
    </section>
    
  </NuxtLayout>
</template>

<style scoped>
.blob-1 {
  position: absolute;
  width: 800px;
  height: 800px;
  background: linear-gradient(
    180deg,
    rgba(47, 184, 255, 0.42) 31.77%,
    #5dc9c2 100%
  );
  mix-blend-mode: color-dodge;
  -webkit-animation: move 25s infinite alternate;
          animation: move 25s infinite alternate;
  transition: 1s cubic-bezier(0.07, 0.8, 0.16, 1);
  border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
  opacity: 0.15;
  left: 20%;
  top: 20%;
}

.blob-2 {
  position: absolute;
  width: 600px;
  height: 600px;
  background: linear-gradient(
    180deg,
    rgba(76, 201, 157, 0.42) 31.77%,
    #3ad8c8 100%
  );
  mix-blend-mode: color-dodge;
  -webkit-animation: move 30s infinite alternate-reverse;
          animation: move 30s infinite alternate-reverse;
  transition: 1s cubic-bezier(0.07, 0.8, 0.16, 1);
  border-radius: 70% 30% 50% 50% / 30% 60% 40% 70%;
  opacity: 0.15;
  right: 20%;
  top: 30%;
}

@-webkit-keyframes move {
  from {
    transform: translate(-100px, -50px) rotate(-90deg);
    border-radius: 24% 76% 35% 65% / 27% 36% 64% 73%;
  }

  to {
    transform: translate(500px, 100px) rotate(-10deg);
    border-radius: 76% 24% 33% 67% / 68% 55% 45% 32%;
  }
}

@keyframes move {
  from {
    transform: translate(-100px, -50px) rotate(-90deg);
    border-radius: 24% 76% 35% 65% / 27% 36% 64% 73%;
  }

  to {
    transform: translate(500px, 100px) rotate(-10deg);
    border-radius: 76% 24% 33% 67% / 68% 55% 45% 32%;
  }
}
</style>
