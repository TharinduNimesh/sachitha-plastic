<template>
  <NuxtLayout name="console">
    <div class="px-4 py-8">
      <div>
        <!-- Header -->
        <div class="mb-8">
          <h1 class="text-2xl font-bold text-slate-900">Account Settings</h1>
          <p class="mt-2 text-slate-600">
            Manage your account details and security settings
          </p>
        </div>

        <!-- Account Details Card -->
        <div class="bg-white rounded-xl shadow-sm overflow-hidden">
          <div class="p-6">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-lg font-semibold text-slate-900">
                Personal Information
              </h2>
              <button
                @click="toggleEdit"
                class="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md"
                :class="isEditing ? 'text-white bg-emerald-600 hover:bg-emerald-700' : 'text-slate-700 bg-white border border-slate-300 hover:bg-slate-50'"
              >
                <Icon
                  :name="isEditing ? 'i-uil-check' : 'i-uil-edit'"
                  class="w-4 h-4"
                />
                {{ isEditing ? "Save Changes" : "Edit Details" }}
              </button>
            </div>

            <form @submit.prevent="saveChanges" class="space-y-4">
              <div class="grid md:grid-cols-2 gap-4">
                <!-- Name -->
                <FormInput
                  v-model="user.name"
                  label="Full Name"
                  :disabled="!isEditing"
                  required
                />

                <!-- Email -->
                <FormInput
                  v-model="user.email"
                  label="Email Address"
                  type="email"
                  disabled
                  required
                />

                <!-- Role -->
                <FormInput
                  v-model="user.role"
                  label="Role"
                  disabled
                  required
                />
              </div>
            </form>
          </div>
        </div>

        <!-- Security Card -->
        <div class="mt-8 bg-white rounded-xl shadow-sm overflow-hidden">
          <div class="p-6">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-lg font-semibold text-slate-900">Security</h2>
              <button
                @click="showPasswordModal = true"
                class="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-white bg-emerald-600 rounded-md hover:bg-emerald-700"
              >
                <Icon name="i-uil-lock" class="w-4 h-4" />
                Change Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Password Change Modal -->
    <CommonModal
      :model-value="showPasswordModal"
      @update:model-value="showPasswordModal = $event"
      title="Change Password"
    >
      <form @submit.prevent="changePassword" class="space-y-4">
        <FormInput
          v-model="passwordForm.newPassword"
          label="New Password"
          type="password"
          required
        />
        <FormInput
          v-model="passwordForm.confirmPassword"
          label="Confirm New Password"
          type="password"
          required
        />
      </form>

      <template #footer>
        <button
          type="button"
          class="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50"
          @click="showPasswordModal = false"
        >
          Cancel
        </button>
        <button
          type="button"
          :disabled="passwordForm.loading"
          class="px-4 py-2 text-sm font-medium text-white bg-emerald-600 border border-transparent rounded-md hover:bg-emerald-700 disabled:opacity-50"
          @click="changePassword"
        >
          {{ passwordForm.loading ? 'Updating...' : 'Update Password' }}
        </button>
      </template>
    </CommonModal>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
import type { UserState } from '~/types/auth.types'

const authStore = useAuthStore()
const supabase = useSupabaseClient()

// User data with proper typing
const user = ref<Partial<UserState>>({
  name: '',
  email: '',
  role: '',
})

const isEditing = ref(false)
const showPasswordModal = ref(false)

const passwordForm = ref({
  newPassword: '',
  confirmPassword: '',
  loading: false,
  error: null as string | null,
})

const { error: toastError, success: toastSuccess } = useToast()

// Load user data on component mount
onMounted(async () => {
  try {
    await authStore.fetchUser()
    if (authStore.isAuthenticated) {
      user.value = {
        name: authStore.name || '',
        email: authStore.email || '',
        role: authStore.role || '',
      }
    }
  } catch (error) {
    console.error('Error loading user data:', error)
  }
})

// Toggle edit mode
const toggleEdit = () => {
  if (isEditing.value) {
    saveChanges()
  }
  isEditing.value = !isEditing.value
}

// Save user changes
const saveChanges = async () => {
  try {
    if (!authStore.id) {
      throw new Error('User not authenticated')
    }

    const { error } = await supabase
      .from('profiles')
      .update({
        name: user.value.name,
      })
      .eq('id', authStore.id)

    if (error) throw error

    // Update local auth store data
    authStore.$patch({
      name: user.value.name
    })
    
    isEditing.value = false
    toastSuccess('Profile updated successfully')
  } catch (error: any) {
    console.error('Error saving changes:', error)
    toastError(error.message || 'Failed to update profile')
  }
}

// Change password
const changePassword = async () => {
  try {
    passwordForm.value.loading = true
    passwordForm.value.error = null

    if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {
      passwordForm.value.error = 'New passwords do not match'
      return
    }

    const { error } = await supabase.auth.updateUser({ 
      password: passwordForm.value.newPassword 
    })

    if (error) throw error

    // Reset form and close modal
    passwordForm.value = {
      newPassword: '',
      confirmPassword: '',
      loading: false,
      error: null,
    }
    showPasswordModal.value = false

    // Show success message
    toastSuccess('Password updated successfully')
  } catch (error: any) {
    passwordForm.value.error = error.message || 'Failed to update password'
    toastError(passwordForm.value.error)
  } finally {
    passwordForm.value.loading = false
  }
}
</script>