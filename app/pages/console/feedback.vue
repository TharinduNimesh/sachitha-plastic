<template>
  <NuxtLayout name="console">
    <div class="p-6">
      <h1 class="text-2xl font-bold text-slate-900">Feedback</h1>
      <form @submit.prevent="submitFeedback" class="mt-4">
        <div class="mb-4">
          <label for="feedback" class="block text-sm font-medium text-slate-700">Your Feedback</label>
          <textarea v-model="feedback" id="feedback" rows="4" class="mt-1 block w-full border border-slate-300 rounded-md p-2" required></textarea>
        </div>
        <button type="submit" class="mt-2 bg-emerald-600 text-white px-4 py-2 rounded-md">Submit Feedback</button>
      </form>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const feedback = ref('');

const submitFeedback = () => {
  // Logic to submit feedback
  console.log(feedback.value);
};
</script>
