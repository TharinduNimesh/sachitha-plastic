<!-- Member filters component -->
<template>
  <div class="bg-white rounded-xl shadow-sm p-6 mb-6">
    <div class="flex flex-col gap-6">
      <!-- Search Bar -->
      <div class="relative max-w-2xl">
        <div class="relative">
          <input
            type="text"
            v-model="search"
            placeholder="Search members by name, email or role..."
            class="w-full pl-12 pr-4 h-12 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-200"
          />
          <Icon
            name="i-uil-search"
            class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"
          />
        </div>
      </div>

      <!-- Role Filter -->
      <div class="flex flex-wrap items-center gap-4">
        <div class="flex items-center gap-2">
          <button
            v-for="role in roles"
            :key="role"
            @click="$emit('update:selectedRole', role)"
            class="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
            :class="
              selectedRole === role
                ? 'bg-emerald-50 text-emerald-600'
                : 'text-slate-600 hover:bg-slate-50'
            "
          >
            {{ role }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  selectedRole: string
  roles: string[]
}>()

const search = defineModel('search')

defineEmits<{
  (e: 'update:selectedRole', role: string): void
}>()
</script>
