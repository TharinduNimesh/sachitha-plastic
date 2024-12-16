<script setup lang="ts">

interface InvitationData {
  email: string
  role: string
}

interface PasswordForm {
  password: string
  confirmPassword: string
}

interface FormErrors {
  password?: string
  confirmPassword?: string
}

type InvitationState = 'loading' | 'valid' | 'invalid' | 'used'

// Get Supabase client
const supabase = useSupabaseClient()

// Get invitation ID from query params
const route = useRoute()
const invitationId = computed(() => route.query.id as string)

// Form state
const form = ref<PasswordForm>({
  password: '',
  confirmPassword: ''
})

const errors = ref<FormErrors>({})
const isLoading = ref(true)
const isSubmitting = ref(false)
const invitationState = ref<InvitationState>('loading')
const invitationData = ref<InvitationData>({
  email: '',
  role: ''
})

// Fetch invitation data from Supabase
async function fetchInvitationData() {
  try {
    isLoading.value = true

    if (!invitationId.value) {
      invitationState.value = 'invalid'
      return
    }

    // Get invitation from database
    const { data: invite, error } = await supabase
      .from('invites')
      .select('*')
      .eq('id', invitationId.value)
      .single()

    if (error || !invite) {
      invitationState.value = 'invalid'
      return
    }

    // Check if invitation is used or expired
    if (invite.is_used) {
      invitationState.value = 'used'
      return
    }

    if (invite.is_expired) {
      invitationState.value = 'invalid'
      return
    }

    // Valid invitation
    invitationState.value = 'valid'
    invitationData.value = {
      email: invite.email,
      role: invite.role
    }
  } catch (error) {
    console.error('Error fetching invitation:', error)
    invitationState.value = 'invalid'
  } finally {
    isLoading.value = false
  }
}

// Validate password
function validateForm(): boolean {
  errors.value = {}
  let isValid = true

  if (form.value.password.length < 8) {
    errors.value.password = 'Password must be at least 8 characters'
    isValid = false
  }

  if (form.value.password !== form.value.confirmPassword) {
    errors.value.confirmPassword = 'Passwords do not match'
    isValid = false
  }

  return isValid
}

// Handle form submission
async function handleAcceptInvitation() {
  if (!validateForm()) return

  try {
    isSubmitting.value = true

    // Sign up user with Supabase
    const { data: authData, error: signUpError } = await supabase.auth.signUp({
      email: invitationData.value.email,
      password: form.value.password,
      options: {
        data: {
          role: invitationData.value.role
        }
      }
    })

    if (signUpError) throw signUpError

    // Mark invitation as used
    const { error: updateError } = await supabase
      .from('invites')
      .update({ is_used: true })
      .eq('id', invitationId.value)

    if (updateError) throw updateError

    // Redirect to sign in
    await navigateTo('/auth/sign-in')
  } catch (error) {
    console.error('Error accepting invitation:', error)
    errors.value.password = 'Failed to create account. Please try again.'
  } finally {
    isSubmitting.value = false
  }
}

// Fetch invitation data on mount
onMounted(() => {
  fetchInvitationData()
})

// Add meta information for SEO
useHead({
  title: 'Accept Invitation - Samarasinghe Trade Center',
  meta: [
    { name: 'description', content: 'Accept your invitation to join Samarasinghe Trade Center' }
  ]
})
</script>

<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-sm">
      <!-- Header -->
      <div class="text-center">
        <NuxtLink to="/" class="flex items-center justify-center space-x-3 mb-8">
          <img src="/images/logo.webp" alt="Logo" class="h-12 w-auto" />
          <div class="flex flex-col">
            <span class="text-xl font-bold leading-tight text-slate-900 uppercase">Samarasinghe</span>
            <span class="text-sm text-slate-600 font-semibold -mt-1 uppercase">Trade Center</span>
          </div>
        </NuxtLink>

        <!-- Loading State -->
        <div v-if="isLoading" class="space-y-4">
          <h2 class="text-3xl font-bold text-slate-900 mb-2">Verifying Invitation</h2>
          <div class="flex justify-center">
            <Icon name="i-uil-spinner" class="w-8 h-8 animate-spin text-emerald-600" />
          </div>
        </div>

        <!-- Invalid Invitation State -->
        <div v-else-if="invitationState === 'invalid'" class="space-y-4">
          <h2 class="text-3xl font-bold text-slate-900 mb-2">Invalid Invitation</h2>
          <p class="text-slate-600">This invitation link is invalid or has expired.</p>
          <NuxtLink 
            to="/"
            class="mt-6 inline-block px-6 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all duration-300 hover:shadow-lg font-medium"
          >
            Return Home
          </NuxtLink>
        </div>

        <!-- Used Invitation State -->
        <div v-else-if="invitationState === 'used'" class="space-y-4">
          <h2 class="text-3xl font-bold text-slate-900 mb-2">Invitation Already Used</h2>
          <p class="text-slate-600">This invitation has already been accepted.</p>
          <NuxtLink 
            to="/auth/sign-in"
            class="mt-6 inline-block px-6 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all duration-300 hover:shadow-lg font-medium"
          >
            Sign In
          </NuxtLink>
        </div>

        <!-- Valid Invitation State -->
        <div v-else-if="invitationState === 'valid'" class="space-y-4">
          <h2 class="text-3xl font-bold text-slate-900 mb-2">Welcome to the Team</h2>
          <div class="space-y-2">
            <p class="text-slate-600">You've been invited as</p>
            <div class="inline-flex items-center space-x-2 px-4 py-2 bg-emerald-50 rounded-lg">
              <span class="text-emerald-600 font-medium">{{ invitationData.role }}</span>
            </div>
            <p class="text-sm text-slate-500">{{ invitationData.email }}</p>
          </div>
        </div>
      </div>

      <!-- Password Setup Form -->
      <form v-if="invitationState === 'valid'" @submit.prevent="handleAcceptInvitation" class="space-y-6">
        <FormInput
          v-model="form.password"
          label="Set Password"
          type="password"
          placeholder="Enter your password"
          required
          :error="errors.password"
        />

        <FormInput
          v-model="form.confirmPassword"
          label="Confirm Password"
          type="password"
          placeholder="Confirm your password"
          required
          :error="errors.confirmPassword"
        />

        <button
          type="submit"
          :disabled="isSubmitting"
          class="w-full px-6 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center justify-center space-x-2"
        >
          <Icon v-if="isSubmitting" name="i-uil-spinner" class="w-5 h-5 animate-spin" />
          <span>{{ isSubmitting ? 'Setting up account...' : 'Accept Invitation' }}</span>
        </button>
      </form>
    </div>
  </div>
</template>