<template>
  <NuxtLayout name="console">
    <div class="p-6">
      <h1 class="text-2xl font-bold text-slate-900">Account Settings</h1>
      <form @submit.prevent="updateAccount" class="mt-4">
        <div class="mb-4">
          <label for="firstName" class="block text-sm font-medium text-slate-700">First Name</label>
          <input v-model="firstName" type="text" id="firstName" class="mt-1 block w-full border border-slate-300 rounded-md p-2" required />
        </div>
        <div class="mb-4">
          <label for="lastName" class="block text-sm font-medium text-slate-700">Last Name</label>
          <input v-model="lastName" type="text" id="lastName" class="mt-1 block w-full border border-slate-300 rounded-md p-2" required />
        </div>
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-slate-700">Email</label>
          <input v-model="email" type="email" id="email" class="mt-1 block w-full border border-slate-300 rounded-md p-2" required />
        </div>
        <div class="mb-4">
          <label for="password" class="block text-sm font-medium text-slate-700">Change Password</label>
          <input v-model="password" type="password" id="password" class="mt-1 block w-full border border-slate-300 rounded-md p-2" placeholder="Leave blank to keep current password" />
        </div>
        <button type="submit" class="mt-2 bg-emerald-600 text-white px-4 py-2 rounded-md">Update Account</button>
      </form>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const firstName = ref('');
const lastName = ref('');
const email = ref('');
const password = ref('');

const updateAccount = () => {
  // Logic to update account details
  console.log({ firstName: firstName.value, lastName: lastName.value, email: email.value, password: password.value });
};
</script>
