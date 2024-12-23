<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-sm">
      <!-- Header -->
      <div class="text-center">
        <NuxtLink to="/" class="flex items-center justify-center space-x-3 mb-8">
          <img src="/images/logo.png" alt="Logo" class="h-12 w-auto" />
          <div class="flex flex-col">
            <span class="text-xl font-bold leading-tight text-slate-900 uppercase">Samarasinghe</span>
            <span class="text-sm text-slate-600 font-semibold -mt-1 uppercase">Trade Center</span>
          </div>
        </NuxtLink>
        <h2 class="text-3xl font-bold text-slate-900 mb-2">Welcome Back</h2>
        <p class="text-slate-600">Sign in to your account</p>
      </div>

      <!-- Sign In Form -->
      <form @submit.prevent="handleSignIn" class="space-y-6">
        <div>
          <FormInput
            v-model="form.email"
            label="Email"
            type="email"
            placeholder="Enter your email"
            autocomplete="email"
            :error="errors.email"
          />
        </div>

        <div>
          <FormInput
            v-model="form.password"
            label="Password"
            type="password"
            placeholder="Enter your password"
            autocomplete="current-password"
            :error="errors.password"
          />
          <div class="mt-2 flex justify-end">
            <NuxtLink
              to="/auth/forgot-password"
              class="text-sm font-medium text-emerald-600 hover:text-emerald-500 transition-colors duration-300"
            >
              Forgot password?
            </NuxtLink>
          </div>
        </div>

        <button
          type="submit"
          :disabled="isLoading"
          class="w-full px-6 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center justify-center space-x-2"
        >
          <Icon v-if="isLoading" name="i-uil-spinner" class="w-5 h-5 animate-spin" />
          <span>{{ isLoading ? 'Signing in...' : 'Sign in' }}</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
interface SignInForm {
  email: string
  password: string
}

interface FormErrors {
  email?: string
  password?: string
}

const form = ref<SignInForm>({
  email: '',
  password: ''
})

const supabase = useSupabaseClient();
const errors = ref<FormErrors>({})
const isLoading = ref(false)
const { error: toastError } = useToast()

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

function validateForm(): boolean {
  const newErrors: FormErrors = {}
  let isValid = true

  // Email validation
  if (!form.value.email) {
    newErrors.email = 'Email is required'
    isValid = false
  } else if (!isValidEmail(form.value.email)) {
    newErrors.email = 'Please enter a valid email address'
    isValid = false
  }

  // Password validation
  if (!form.value.password) {
    newErrors.password = 'Password is required'
    isValid = false
  } else if (form.value.password.length < 6) {
    newErrors.password = 'Password must be at least 6 characters'
    isValid = false
  }

  errors.value = newErrors
  return isValid
}

async function handleSignIn() {
  if (isLoading.value) return

  if (!validateForm()) {
    toastError('Please fix the form errors')
    return
  }

  try {
    isLoading.value = true

    const { data: ValidateDate } = await supabase.rpc("is_suspended_or_removed_user", { email_input: form.value.email });
    if (ValidateDate) {
      toastError('Your account has been suspended or removed. Please contact support for more information.')
      return
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: form.value.email,
      password: form.value.password,
    });
    
    if (error) {
      if (error.message.includes('Email not confirmed')) {
        toastError('Please check your email and confirm your account before signing in')
      } else {
        toastError('Invalid email or password')
      }
      return
    }

    // Fetch user profile
    await useAuthStore().fetchUser();

    // Redirect to dashboard on success
    navigateTo('/console');
  } catch (error) {
    console.error('Sign in error:', error)
    toastError('An unexpected error occurred. Please try again later.')
  } finally {
    isLoading.value = false
  }
}

const user = useSupabaseUser()
onMounted(() => {
  watchEffect(() => {
    if (user.value) {
      navigateTo('/console')
    }
  });
});

// Add meta information for SEO
useHead({
  title: 'Sign In - Samarasinghe Trade Center',
  meta: [
    { name: 'description', content: 'Sign in to your Samarasinghe Trade Center account' }
  ]
})
</script>
