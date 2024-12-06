<template>
  <NuxtLayout name="web">
    <div class="pt-32 pb-16">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <span class="inline-block px-4 py-1 bg-emerald-100 text-emerald-600 rounded-full text-sm font-medium mb-4">
            Contact Us
          </span>
          <h1 class="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Get in Touch
          </h1>
          <p class="text-lg text-slate-600 max-w-2xl mx-auto">
            Have questions or need assistance? We're here to help. Reach out to us and our team will get back to you shortly.
          </p>
        </div>
        
        <!-- Contact Form and Info -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <!-- Contact Form -->
          <div class="bg-white rounded-2xl shadow-lg p-8">
            <h2 class="text-2xl font-bold text-slate-900 mb-6">Send us a Message</h2>
            <form class="space-y-6">
              <div>
                <label for="name" class="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <label for="email" class="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="john@example.com"
                />
              </div>
              
              <div>
                <label for="message" class="block text-sm font-medium text-slate-700 mb-1">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="How can we help you?"
                ></textarea>
              </div>
              
              <button
                type="submit"
                class="w-full bg-emerald-600 text-white py-3 px-6 rounded-xl hover:bg-emerald-700 transition-colors duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
          
          <!-- Contact Information -->
          <div class="space-y-8">
            <div>
              <h2 class="text-2xl font-bold text-slate-900 mb-6">Contact Information</h2>
              <div class="space-y-4">
                <div class="flex items-start space-x-4">
                  <div class="p-3 bg-emerald-100 rounded-lg">
                    <svg class="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 class="font-semibold text-slate-900">Address</h3>
                    <p class="text-slate-600">123 Industrial Zone, Colombo, Sri Lanka 10115</p>
                  </div>
                </div>
                
                <div class="flex items-start space-x-4">
                  <div class="p-3 bg-emerald-100 rounded-lg">
                    <svg class="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 class="font-semibold text-slate-900">Email</h3>
                    <p class="text-slate-600">info@samarasinghetrade.com</p>
                  </div>
                </div>
                
                <div class="flex items-start space-x-4">
                  <div class="p-3 bg-emerald-100 rounded-lg">
                    <svg class="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 class="font-semibold text-slate-900">Phone</h3>
                    <p class="text-slate-600">(+94) 112-555-1234</p>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Business Hours -->
            <div>
              <h2 class="text-2xl font-bold text-slate-900 mb-6">Business Hours</h2>
              <div class="space-y-2">
                <div class="flex justify-between">
                  <span class="text-slate-600">Monday - Friday</span>
                  <span class="font-medium text-slate-900">9:00 AM - 6:00 PM</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-slate-600">Saturday</span>
                  <span class="font-medium text-slate-900">9:00 AM - 1:00 PM</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-slate-600">Sunday</span>
                  <span class="font-medium text-slate-900">Closed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
