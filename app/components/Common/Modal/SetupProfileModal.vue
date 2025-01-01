<template>
  <CommonModal
    :model-value="true"
    :closeable="false"
    title="Complete Your Profile"
  >
    <!-- Setup Progress -->
    <div v-if="setupState !== 'input'" class="space-y-4">
      <div class="flex flex-col items-center py-8">
        <div class="relative">
          <Icon 
            :name="setupStateIcon" 
            :class="[
              'w-16 h-16',
              setupState === 'finished' ? 'text-emerald-500' : 'text-emerald-400 animate-spin'
            ]"
          />
        </div>
        <p class="mt-4 text-lg font-medium text-slate-700">{{ setupStateMessage }}</p>
      </div>
    </div>

    <!-- Form Content -->
    <form v-else @submit.prevent="handleSubmit" class="space-y-6">
      <FormInput
        v-model="formData.name"
        label="Your Name"
        placeholder="Enter your full name"
        :error="errors.name"
        required
        autofocus
      />
    </form>

    <!-- Footer Actions -->
    <template #footer>
      <button
        v-if="setupState === 'input'"
        type="submit"
        class="w-full px-4 py-2 text-sm font-medium text-white bg-emerald-600 border border-transparent rounded-md hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
        :disabled="!isValid"
        @click="handleSubmit"
      >
        Continue
      </button>
    </template>
  </CommonModal>
</template>

<script setup lang="ts">
interface FormData {
  name: string
}

interface FormErrors {
  name?: string
}

type SetupState = 'input' | 'updating' | 'setting-up' | 'finished'

const formData = ref<FormData>({
  name: ''
})

const errors = ref<FormErrors>({})
const setupState = ref<SetupState>('input')

// Toast composable
const { success, error } = useToast()
const supabase = useSupabaseClient()
const user = useSupabaseUser()

// Computed properties
const isValid = computed(() => {
  return formData.value.name.trim().length >= 2 && Object.keys(errors.value).length === 0
})

const setupStateIcon = computed(() => {
  switch (setupState.value) {
    case 'updating':
    case 'setting-up':
      return 'i-uil-spinner'
    case 'finished':
      return 'i-uil-check-circle'
    default:
      return ''
  }
})

const setupStateMessage = computed(() => {
  switch (setupState.value) {
    case 'updating':
      return 'Updating your details...'
    case 'setting-up':
      return 'Setting up your account...'
    case 'finished':
      return 'Setup completed!'
    default:
      return ''
  }
})

// Form validation
const validateForm = (): boolean => {
  errors.value = {}
  
  if (!formData.value.name.trim()) {
    errors.value.name = 'Name is required'
  } else if (formData.value.name.trim().length < 2) {
    errors.value.name = 'Name must be at least 2 characters'
  }

  return Object.keys(errors.value).length === 0
}

const handleSubmit = async () => {
  if (!validateForm()) {
    error('Please enter a valid name')
    return
  }

  try {
    setupState.value = 'updating'

    // Update profile in database
    const { error: updateError } = await supabase
      .from('profiles')
      .update({
        name: formData.value.name,
      })
      .eq('id', user.value?.id)

    if (updateError) throw updateError

    setupState.value = 'setting-up'
    
    // Simulate some setup time
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setupState.value = 'finished'
    
    // Show success message and redirect after a delay
    success('Profile setup completed!')
    setTimeout(() => {
      navigateTo('/console/products')
    }, 1500)

  } catch (err) {
    setupState.value = 'input'
    error(err instanceof Error ? err.message : 'Failed to update profile')
  }
}
</script>
