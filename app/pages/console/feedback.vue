<template>
  <NuxtLayout name="console">
    <div class="p-6">
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
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <!-- Review Form -->
            <template v-if="selectedType === 'review'">
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-1">Rating</label>
                <div class="flex items-center gap-2">
                  <button
                    v-for="star in 5"
                    :key="star"
                    type="button"
                    @click="formData.rating = star"
                    class="text-2xl focus:outline-none"
                    :class="star <= formData.rating ? 'text-yellow-400' : 'text-slate-300'"
                  >
                    ★
                  </button>
                </div>
                <p v-if="errors.rating" class="mt-1 text-sm text-red-600">
                  {{ errors.rating }}
                </p>
              </div>
              <FormTextarea
                v-model="formData.positives"
                label="What did you like?"
                placeholder="Share what you enjoyed about our service..."
                :error="errors.positives"
                :rows="3"
              />
              <FormTextarea
                v-model="formData.improvements"
                label="What could be improved?"
                placeholder="Tell us how we can make it better..."
                :error="errors.improvements"
                :rows="3"
              />
            </template>

            <!-- Feature Request Form -->
            <template v-if="selectedType === 'feature'">
              <FormInput
                v-model="formData.title"
                label="Feature Title"
                placeholder="Give your feature request a clear title"
                :error="errors.title"
              />
              <FormTextarea
                v-model="formData.description"
                label="Description"
                placeholder="Describe the feature you'd like to see..."
                :error="errors.description"
                :rows="4"
              />
              <FormTextarea
                v-model="formData.useCase"
                label="Use Case"
                placeholder="Explain how this feature would be useful..."
                :error="errors.useCase"
                :rows="3"
              />
            </template>

            <!-- Bug Report Form -->
            <template v-if="selectedType === 'bug'">
              <FormInput
                v-model="formData.title"
                label="Issue Title"
                placeholder="Briefly describe the issue"
                :error="errors.title"
              />
              <FormTextarea
                v-model="formData.description"
                label="Description"
                placeholder="Provide a detailed description of the issue..."
                :error="errors.description"
                :rows="4"
              />
              <FormTextarea
                v-model="formData.steps"
                label="Steps to Reproduce"
                placeholder="List the steps to reproduce this issue..."
                :error="errors.steps"
                :rows="3"
              />
              <FormTextarea
                v-model="formData.expected"
                label="Expected Behavior"
                placeholder="What did you expect to happen?"
                :error="errors.expected"
                :rows="2"
              />
              <FormTextarea
                v-model="formData.actual"
                label="Actual Behavior"
                placeholder="What actually happened?"
                :error="errors.actual"
                :rows="2"
              />
            </template>

            <!-- Submit Button -->
            <div class="flex justify-end">
              <button
                type="submit"
                class="text-white flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 px-5 py-3 rounded-lg"
                :disabled="isSubmitting"
              >
                {{ isSubmitting ? 'Sending...' : 'Send Feedback' }}
                <!-- add a send icon -->
                <Icon
                  v-if="isSubmitting"
                  name="i-uil-spinner"
                  class="w-5 h-5 animate-spin"
                />
                <Icon
                  v-else
                  name="i-uil-message"
                  class="w-5 h-5"
                />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

// Types
interface FormData {
  rating: number
  title: string
  description: string
  positives: string
  improvements: string
  useCase: string
  steps: string
  expected: string
  actual: string
}

interface FormErrors {
  rating?: string
  title?: string
  description?: string
  positives?: string
  improvements?: string
  useCase?: string
  steps?: string
  expected?: string
  actual?: string
}

// Feedback types
const feedbackTypes = [
  {
    id: 'review',
    name: 'Review',
    icon: 'i-uil-star',
    description: 'Share your experience and help us improve'
  },
  {
    id: 'feature',
    name: 'Feature Request',
    icon: 'i-uil-lightbulb',
    description: 'Suggest new features or improvements'
  },
  {
    id: 'bug',
    name: 'Report Issue',
    icon: 'i-uil-bug',
    description: 'Report bugs or technical problems'
  }
]

// Form state
const selectedType = ref('')
const formData = reactive<FormData>({
  rating: 0,
  title: '',
  description: '',
  positives: '',
  improvements: '',
  useCase: '',
  steps: '',
  expected: '',
  actual: ''
})
const errors = reactive<FormErrors>({})
const isSubmitting = ref(false)
const toast = useToast()

// Select feedback type
const selectFeedbackType = (type: string) => {
  selectedType.value = type
  // Reset form data
  formData.rating = 0
  formData.title = ''
  formData.description = ''
  formData.positives = ''
  formData.improvements = ''
  formData.useCase = ''
  formData.steps = ''
  formData.expected = ''
  formData.actual = ''
  // Reset errors
  Object.keys(errors).forEach(key => delete errors[key as keyof FormErrors])
}

// Validation
const validateForm = (): boolean => {
  Object.keys(errors).forEach(key => delete errors[key as keyof FormErrors])

  if (selectedType.value === 'review') {
    if (!formData.rating) {
      errors.rating = 'Please provide a rating'
    }
    if (!formData.positives.trim()) {
      errors.positives = 'Please share what you liked'
    }
    if (!formData.improvements.trim()) {
      errors.improvements = 'Please share what could be improved'
    }
  }

  if (selectedType.value === 'feature') {
    if (!formData.title.trim()) {
      errors.title = 'Please provide a title'
    }
    if (!formData.description.trim()) {
      errors.description = 'Please provide a description'
    }
    if (!formData.useCase.trim()) {
      errors.useCase = 'Please explain the use case'
    }
  }

  if (selectedType.value === 'bug') {
    if (!formData.title.trim()) {
      errors.title = 'Please provide a title'
    }
    if (!formData.description.trim()) {
      errors.description = 'Please provide a description'
    }
    if (!formData.steps.trim()) {
      errors.steps = 'Please provide steps to reproduce'
    }
    if (!formData.expected.trim()) {
      errors.expected = 'Please describe expected behavior'
    }
    if (!formData.actual.trim()) {
      errors.actual = 'Please describe actual behavior'
    }
  }

  return Object.keys(errors).length === 0
}

// Handle form submission
const handleSubmit = async () => {
  if (!validateForm()) return

  isSubmitting.value = true

  try {
    await $fetch('/api/feedback/send', {
      method: 'POST',
      body: {
        type: selectedType.value,
        formData,
      }
    })

    toast.success('Thank you for your feedback!')
    selectFeedbackType('')
  } catch (error) {
    console.error('Error submitting feedback:', error)
    toast.error('Failed to send feedback. Please try again.')
  } finally {
    isSubmitting.value = false
  }
}

// Add meta information for SEO
useHead({
  title: 'Send Feedback - Console',
  meta: [
    { name: 'robots', content: 'noindex, nofollow' }
  ]
})
</script>
