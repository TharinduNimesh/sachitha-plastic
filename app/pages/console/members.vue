<template>
  <NuxtLayout name="console">
    <div class="p-6">
      <h1 class="text-2xl font-bold text-slate-900">Members Management</h1>
      <div class="mt-4">
        <ul class="space-y-2">
          <li v-for="member in members" :key="member.id" class="flex justify-between items-center p-4 bg-white rounded-md shadow-sm">
            <span>{{ member.name }} ({{ member.role }})</span>
            <button @click="removeMember(member.id)" class="text-red-600">Remove</button>
          </li>
        </ul>
        <button @click="addMember" class="mt-4 bg-emerald-600 text-white px-4 py-2 rounded-md">Add Member</button>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const members = ref([
  { id: 1, name: 'Admin User', role: 'Admin' },
  { id: 2, name: 'Moderator User', role: 'Moderator' }
]);

const removeMember = (id: number) => {
  members.value = members.value.filter(member => member.id !== id);
};

const addMember = () => {
  // Logic to add a new member
  console.log('Add Member clicked');
};
</script>
