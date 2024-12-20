<!-- Member card component -->
<template>
  <div class="group bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
    <div class="p-6">
      <div class="flex items-center justify-between">
        <!-- Member Info -->
        <div class="flex items-center gap-6">
          <!-- Avatar/Initial -->
          <div class="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0">
            <span class="text-lg font-medium text-emerald-600">
              {{ member.name.charAt(0) }}
            </span>
          </div>

          <div>
            <h3 class="text-lg font-semibold text-slate-900">
              {{ member.name }}
            </h3>
            <div class="mt-1 flex items-center gap-4">
              <p class="text-sm text-slate-600 flex items-center gap-2">
                <Icon name="i-uil-envelope" class="w-4 h-4" />
                {{ member.email }}
              </p>
              <div class="flex items-center gap-2">
                <span
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                  :class="{
                    'bg-emerald-50 text-emerald-600': member.role === 'Admin',
                    'bg-blue-50 text-blue-600': member.role === 'Moderator',
                  }"
                >
                  {{ member.role }}
                </span>
                <span
                  v-if="member.status && member.status !== 'Active'"
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                  :class="{
                    'bg-yellow-50 text-yellow-600': member.status === 'Suspend',
                    'bg-red-50 text-red-600': member.status === 'Removed',
                  }"
                >
                  {{ member.status }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <template v-if="member.status !== 'Removed' && member.email !== currentUserEmail">
            <template v-if="member.status === 'Suspend'">
              <button
                @click="$emit('reactivate', member.id)"
                class="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors"
              >
                <Icon name="i-uil-check" class="w-4 h-4" />
                <span class="hidden sm:inline">Reactivate</span>
              </button>
            </template>
            <template v-else>
              <button
                @click="$emit('suspend', member.id)"
                class="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50 rounded-lg transition-colors"
              >
                <Icon name="i-uil-ban" class="w-4 h-4" />
                <span class="hidden sm:inline">Suspend</span>
              </button>
              <button
                @click="$emit('remove', member.id)"
                class="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Icon name="i-uil-trash-alt" class="w-4 h-4" />
                <span class="hidden sm:inline">Remove</span>
              </button>
            </template>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Member } from '~/types'

defineProps<{
  member: Member
  currentUserEmail: string
}>()

defineEmits<{
  (e: 'suspend', id: string): void
  (e: 'remove', id: string): void
  (e: 'reactivate', id: string): void
}>()
</script>
