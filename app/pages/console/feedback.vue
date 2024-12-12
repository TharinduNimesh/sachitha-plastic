<template>
  <NuxtLayout name="console">
    <div class="px-4 py-8">
      <div>
        <!-- Header -->
        <div class="mb-8">
          <h1 class="text-2xl font-bold text-slate-900">Send Feedback</h1>
          <p class="mt-2 text-slate-600">
            Help us improve by sharing your thoughts, reporting issues, or requesting new features
          </p>
        </div>

        <!-- Feedback Type Selection -->
        <div class="mb-8">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              v-for="type in feedbackTypes"
              :key="type.id"
              @click="selectFeedbackType(type.id)"
              class="p-4 rounded-xl border-2 transition-all"
              :class="[
                selectedType === type.id
                  ? 'border-emerald-500 bg-emerald-50'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              ]"
            >
              <Icon
                :name="type.icon"
                class="w-6 h-6 mb-2"
                :class="selectedType === type.id ? 'text-emerald-500' : 'text-slate-600'"
              />
              <h3 class="font-medium" :class="selectedType === type.id ? 'text-emerald-700' : 'text-slate-900'">
                {{ type.name }}
              </h3>
              <p class="text-sm mt-1" :class="selectedType === type.id ? 'text-emerald-600' : 'text-slate-600'">
                {{ type.description }}
              </p>
            </button>
          </div>
        </div>

        <!-- Dynamic Form -->
        <div v-if="selectedType" class="bg-white rounded-xl shadow-sm overflow-hidden">
          <div class="p-6">
            <form @submit.prevent="submitFeedback" class="space-y-6">
              <!-- Review Form -->
              <template v-if="selectedType === 'review'">
                <div>
                  <label class="block text-sm font-medium text-slate-700 mb-1">Rating</label>
                  <div class="flex items-center gap-2">
                    <button
                      v-for="star in 5"
                      :key="star"
                      type="button"
                      @click="rating = star"
                      class="text-2xl focus:outline-none"
                      :class="star <= rating ? 'text-yellow-400' : 'text-slate-300'"
                    >
                      ★
                    </button>
                  </div>
                </div>
                <div>
                  <label class="block text-sm font-medium text-slate-700 mb-1">What did you like?</label>
                  <textarea
                    v-model="formData.positives"
                    rows="3"
                    class="w-full px-3 py-2 border border-slate-300 rounded-lg"
                    placeholder="Share what you enjoyed about our service..."
                  ></textarea>
                </div>
                <div>
                  <label class="block text-sm font-medium text-slate-700 mb-1">What could be improved?</label>
                  <textarea
                    v-model="formData.improvements"
                    rows="3"
                    class="w-full px-3 py-2 border border-slate-300 rounded-lg"
                    placeholder="Tell us how we can make it better..."
                  ></textarea>
                </div>
              </template>

              <!-- Feature Request Form -->
              <template v-if="selectedType === 'feature'">
                <div>
                  <label class="block text-sm font-medium text-slate-700 mb-1">Feature Title</label>
                  <input
                    type="text"
                    v-model="formData.title"
                    class="w-full px-3 py-2 border border-slate-300 rounded-lg"
                    placeholder="Give your feature request a clear title"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-slate-700 mb-1">Description</label>
                  <textarea
                    v-model="formData.description"
                    rows="4"
                    class="w-full px-3 py-2 border border-slate-300 rounded-lg"
                    placeholder="Describe the feature you'd like to see..."
                  ></textarea>
                </div>
                <div>
                  <label class="block text-sm font-medium text-slate-700 mb-1">Use Case</label>
                  <textarea
                    v-model="formData.useCase"
                    rows="3"
                    class="w-full px-3 py-2 border border-slate-300 rounded-lg"
                    placeholder="How would this feature benefit you or others?"
                  ></textarea>
                </div>
              </template>

              <!-- Bug Report Form -->
              <template v-if="selectedType === 'bug'">
                <div>
                  <label class="block text-sm font-medium text-slate-700 mb-1">Issue Title</label>
                  <input
                    type="text"
                    v-model="formData.title"
                    class="w-full px-3 py-2 border border-slate-300 rounded-lg"
                    placeholder="Briefly describe the issue"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-slate-700 mb-1">Steps to Reproduce</label>
                  <textarea
                    v-model="formData.steps"
                    rows="4"
                    class="w-full px-3 py-2 border border-slate-300 rounded-lg"
                    placeholder="1. Go to...&#10;2. Click on...&#10;3. Observe that..."
                  ></textarea>
                </div>
                <div>
                  <label class="block text-sm font-medium text-slate-700 mb-1">Expected Behavior</label>
                  <textarea
                    v-model="formData.expected"
                    rows="2"
                    class="w-full px-3 py-2 border border-slate-300 rounded-lg"
                    placeholder="What should have happened?"
                  ></textarea>
                </div>
                <div>
                  <label class="block text-sm font-medium text-slate-700 mb-1">Actual Behavior</label>
                  <textarea
                    v-model="formData.actual"
                    rows="2"
                    class="w-full px-3 py-2 border border-slate-300 rounded-lg"
                    placeholder="What happened instead?"
                  ></textarea>
                </div>
                <div>
                  <label class="block text-sm font-medium text-slate-700 mb-1">Additional Context</label>
                  <textarea
                    v-model="formData.context"
                    rows="2"
                    class="w-full px-3 py-2 border border-slate-300 rounded-lg"
                    placeholder="Browser version, operating system, or any other relevant details..."
                  ></textarea>
                </div>
              </template>

              <!-- Submit Button -->
              <div class="flex justify-end">
                <button
                  type="submit"
                  class="btn-primary flex items-center space-x-2"
                >
                  <Icon name="i-uil-message" class="w-4 h-4" />
                  <span>Submit Feedback</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';

// Feedback types configuration
const feedbackTypes = [
  {
    id: 'review',
    name: 'Review',
    icon: 'i-uil-star',
    description: 'Share your experience with our service'
  },
  {
    id: 'feature',
    name: 'Feature Request',
    icon: 'i-uil-lightbulb',
    description: 'Suggest new features or improvements'
  },
  {
    id: 'bug',
    name: 'Bug Report',
    icon: 'i-uil-bug',
    description: 'Report issues or unexpected behavior'
  }
];

// Form state
const selectedType = ref('');
const rating = ref(0);
const formData = reactive({
  // Review fields
  positives: '',
  improvements: '',
  
  // Feature request fields
  title: '',
  description: '',
  useCase: '',
  
  // Bug report fields
  steps: '',
  expected: '',
  actual: '',
  context: ''
});

// Select feedback type
const selectFeedbackType = (type: string) => {
  selectedType.value = type;
  // Reset form data
  Object.keys(formData).forEach(key => {
    formData[key] = '';
  });
  if (type === 'review') {
    rating.value = 0;
  }
};

// Submit feedback
const submitFeedback = () => {
  const feedback = {
    type: selectedType.value,
    ...formData
  };
  
  if (selectedType.value === 'review') {
    feedback.rating = rating.value;
  }
  
  // TODO: Implement API call to submit feedback
  console.log('Submitting feedback:', feedback);
  
  // Reset form
  selectFeedbackType('');
  alert('Thank you for your feedback!');
};
</script>
