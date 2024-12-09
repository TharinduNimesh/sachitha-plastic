<template>
  <div class="min-h-[60vh] flex items-center justify-center">
    <div class="text-center max-w-2xl mx-auto px-4">
      <!-- Animated Icon -->
      <div class="mb-8 relative">
        <div class="animate-bounce">
          <Icon 
            name="heroicons:cube" 
            class="w-32 h-32 text-emerald-300"
          />
        </div>
        <div class="absolute inset-0 animate-ping opacity-75">
          <Icon 
            name="heroicons:cube" 
            class="w-32 h-32 text-emerald-300/30"
          />
        </div>
      </div>

      <!-- Message -->
      <h1 class="text-4xl font-bold text-slate-900 mb-4 animate-fade-in">
        Product Not Found
      </h1>
      <p class="text-lg text-slate-600 mb-8 animate-slide-up">
        We couldn't find the product you're looking for. 
        It might have been moved or no longer exists.
      </p>

      <!-- Action Buttons -->
      <div class="flex gap-4 justify-center animate-fade-in-up">
        <NuxtLink
          to="/products"
          class="inline-flex items-center px-6 py-3 bg-emerald-600 text-white rounded-xl 
                 hover:bg-emerald-700 transition-all duration-300 transform hover:-translate-y-1
                 hover:shadow-lg"
        >
          <Icon 
            name="heroicons:arrow-left" 
            class="w-5 h-5 mr-2"
          />
          Back to Products
        </NuxtLink>

        <button
          @click="$router.go(-1)"
          class="inline-flex items-center px-6 py-3 bg-slate-100 text-slate-700 rounded-xl
                 hover:bg-slate-200 transition-all duration-300 transform hover:-translate-y-1
                 hover:shadow-lg mt-4 sm:mt-0"
        >
          Go Back
        </button>
      </div>

      <!-- Decorative Elements -->
      <div class="mt-12 flex justify-center space-x-2">
        <div v-for="n in 3" :key="n" 
             class="w-2 h-2 rounded-full bg-emerald-300"
             :class="[
               n === 1 ? 'animate-bounce' : '',
               n === 2 ? 'animate-bounce delay-100' : '',
               n === 3 ? 'animate-bounce delay-200' : ''
             ]"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.6s ease-out forwards;
}

.animate-slide-up {
  animation: slide-up 0.6s ease-out 0.2s forwards;
  opacity: 0;
}

.animate-fade-in-up {
  animation: fade-in-up 0.6s ease-out 0.4s forwards;
  opacity: 0;
}
</style>