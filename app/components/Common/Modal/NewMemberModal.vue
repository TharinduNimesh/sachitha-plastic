<template>
  <CommonModal
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    title="Invite New Member"
  >
    <!-- Form Content -->
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Email Input -->
      <FormInput
        v-model="formData.email"
        label="Email Address"
        type="email"
        placeholder="Enter member's email address"
        :error="errors.email"
        required
      />

      <!-- Role Selection -->
      <FormSelect
        v-model="formData.role"
        label="Role"
        :error="errors.role"
        required
      >
        <option value="">Select a role</option>
        <option value="Admin">Admin</option>
        <option value="Moderator">Moderator</option>
      </FormSelect>
    </form>

    <!-- Footer Actions -->
    <template #footer>
      <button
        type="button"
        class="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50"
        @click="$emit('update:modelValue', false)"
      >
        Cancel
      </button>
      <button
        type="submit"
        class="px-4 py-2 text-sm font-medium text-white bg-emerald-600 border border-transparent rounded-md hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
        :disabled="isSubmitting || !isValid"
        @click="handleSubmit"
      >
        {{ isSubmitting ? 'Sending Invitation...' : 'Send Invitation' }}
      </button>
    </template>
  </CommonModal>
</template>

<script setup lang="ts">
interface Props {
  modelValue: boolean
}

type Role = 'Admin' | 'Moderator'

interface FormData {
  email: string
  role: Role | ''
}

interface FormErrors {
  email?: string
  role?: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'invited': []
}>()

const formData = ref<FormData>({
  email: '',
  role: ''
})

const isSubmitting = ref(false)
const errors = ref<FormErrors>({})

// Use toast composable
const { success, error } = useToast()

// Composable to get Supabase client
const supabase = useSupabaseClient()

// Computed property to check if form is valid
const isValid = computed(() => {
  return formData.value.email.trim() !== '' && 
         formData.value.role !== '' && 
         Object.keys(errors.value).length === 0
})

// Validate form data
const validateForm = (): boolean => {
  errors.value = {}
  
  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!formData.value.email.trim()) {
    errors.value.email = 'Email is required'
  } else if (!emailRegex.test(formData.value.email)) {
    errors.value.email = 'Please enter a valid email address'
  }

  // Validate role
  if (!formData.value.role) {
    errors.value.role = 'Role is required'
  }

  return Object.keys(errors.value).length === 0
}

const handleSubmit = async () => {
  if (!validateForm()) {
    error('Please fill in all required fields correctly')
    return
  }

  try {
    isSubmitting.value = true

    // check if already sent an invitation
    const { data: invite, error: checkInviteError } = await supabase
      .from('invites')
      .select('id')
      .eq('email', formData.value.email)
      .maybeSingle()
    
    if (checkInviteError) throw checkInviteError

    if (invite) {
      error('An invitation has already been sent to this email address')
      return
    }

    // Check if user already exists
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('id')
      .eq('email', formData.value.email)
      .maybeSingle()

    if (profileError) throw profileError

    if (profile) {
      error('User already exists with this email')
      return
    }

    const { data: inviteData, error: inviteError } = await supabase
      .from('invites')
      .insert([
        {
          email: formData.value.email,
          role: formData.value.role,
          is_used: false
        }
      ])
      .select()
      .single();

    if (inviteError) throw inviteError

    if (!inviteData) {
      throw new Error('Failed to create invite')
    }

    // Send invitation email
    const { error: emailError } = await useFetch('/api/invites/send', {
      method: 'POST',
      body: {
        email: formData.value.email,
        role: formData.value.role,
        inviteId: inviteData.id
      }
    });

    if (emailError.value) {
      throw emailError.value;
    }

    console.log('Invitation created:', inviteData);

    // Show success message
    success('Invitation sent successfully')
    
    // Close modal
    emit('update:modelValue', false)
    
    // Emit invited event
    emit('invited')
    
    // Reset form
    formData.value = {
      email: '',
      role: ''
    }
    errors.value = {}
    
  } catch (err) {
    console.error('Error sending invitation:', err)
    error(err instanceof Error ? err.message : 'Failed to send invitation. Please try again.')
  } finally {
    isSubmitting.value = false
  }
}
</script>
