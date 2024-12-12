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
                class="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium"
                :class="isEditing ? 'text-emerald-600' : 'text-slate-600'"
              >
                <Icon
                  :name="isEditing ? 'i-uil-check' : 'i-uil-edit'"
                  class="w-4 h-4"
                />
                {{ isEditing ? "Save Changes" : "Edit Details" }}
              </button>
            </div>

            <div class="space-y-4">
              <div class="grid md:grid-cols-2 gap-4">
                <!-- First Name -->
                <div>
                  <label class="block text-sm font-medium text-slate-700 mb-1"
                    >First Name</label
                  >
                  <input
                    type="text"
                    v-model="user.firstName"
                    :disabled="!isEditing"
                    class="w-full px-3 py-2 border rounded-lg"
                    :class="
                      isEditing
                        ? 'border-slate-300'
                        : 'border-slate-200 bg-slate-50'
                    "
                  />
                </div>

                <!-- Last Name -->
                <div>
                  <label class="block text-sm font-medium text-slate-700 mb-1"
                    >Last Name</label
                  >
                  <input
                    type="text"
                    v-model="user.lastName"
                    :disabled="!isEditing"
                    class="w-full px-3 py-2 border rounded-lg"
                    :class="
                      isEditing
                        ? 'border-slate-300'
                        : 'border-slate-200 bg-slate-50'
                    "
                  />
                </div>
              </div>

              <!-- Email -->
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-1"
                  >Email</label
                >
                <input
                  type="email"
                  v-model="user.email"
                  disabled
                  class="w-full px-3 py-2 border border-slate-200 rounded-lg bg-slate-50"
                />
              </div>

              <!-- Role -->
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-1"
                  >Role</label
                >
                <div class="mt-1">
                  <span
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                    :class="{
                      'bg-emerald-50 text-emerald-600': user.role === 'Admin',
                      'bg-blue-50 text-blue-600': user.role === 'Moderator',
                      'bg-slate-50 text-slate-600': user.role === 'Member',
                    }"
                  >
                    {{ user.role }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Password Change Card -->
        <div class="mt-6 bg-white rounded-xl shadow-sm overflow-hidden">
          <div class="p-6">
            <div class="flex items-center justify-between">
              <div>
                <h2 class="text-lg font-semibold text-slate-900">Password</h2>
                <p class="mt-1 text-sm text-slate-600">
                  Change your password to keep your account secure
                </p>
              </div>
              <button
                @click="showChangePasswordModal = true"
                class="btn-primary flex items-center space-x-2"
              >
                <Icon name="i-uil-lock" class="w-4 h-4" />
                <span>Change Password</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Change Password Modal -->
      <Modal
        v-if="showChangePasswordModal"
        @close="showChangePasswordModal = false"
      >
        <template #header>
          <h3 class="text-lg font-semibold text-slate-900">Change Password</h3>
        </template>

        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1"
              >Current Password</label
            >
            <input
              type="password"
              v-model="passwordForm.currentPassword"
              class="w-full px-3 py-2 border border-slate-300 rounded-lg"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1"
              >New Password</label
            >
            <input
              type="password"
              v-model="passwordForm.newPassword"
              class="w-full px-3 py-2 border border-slate-300 rounded-lg"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1"
              >Confirm New Password</label
            >
            <input
              type="password"
              v-model="passwordForm.confirmPassword"
              class="w-full px-3 py-2 border border-slate-300 rounded-lg"
            />
          </div>
        </div>

        <template #footer>
          <div class="flex justify-end gap-3">
            <button
              @click="showChangePasswordModal = false"
              class="px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-800"
            >
              Cancel
            </button>
            <button @click="changePassword" class="btn-primary">
              Update Password
            </button>
          </div>
        </template>
      </Modal>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref } from "vue";

// User data
const user = ref({
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  role: "Admin",
});

// Edit mode state
const isEditing = ref(false);

// Password change modal state
const showChangePasswordModal = ref(false);
const passwordForm = ref({
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
});

// Toggle edit mode
const toggleEdit = () => {
  if (isEditing.value) {
    // Save changes
    saveChanges();
  }
  isEditing.value = !isEditing.value;
};

// Save user changes
const saveChanges = () => {
  // TODO: Implement API call to save user changes
  console.log("Saving changes:", user.value);
};

// Change password
const changePassword = () => {
  // TODO: Implement password change logic
  if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {
    alert("New passwords do not match");
    return;
  }

  console.log("Changing password");
  showChangePasswordModal.value = false;

  // Reset form
  passwordForm.value = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };
};
</script>
