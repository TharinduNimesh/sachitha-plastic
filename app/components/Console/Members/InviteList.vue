<!-- Member invite list component -->
<template>
  <div v-if="invites.length > 0" class="space-y-4 mt-5">
    <h2 class="text-lg font-bold text-slate-900">Pending Invites</h2>
    <div class="space-y-4">
      <div
        v-for="invite in invites"
        :key="invite.id"
        class="group bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
      >
        <div class="p-6">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-6">
              <!-- Avatar/Initial -->
              <div class="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center flex-shrink-0">
                <Icon name="i-uil-envelope" class="w-6 h-6 text-slate-400" />
              </div>

              <div>
                <h3 class="text-lg font-semibold text-slate-900">
                  {{ invite.email }}
                </h3>
                <div class="mt-1 flex items-center gap-4">
                  <p class="text-sm text-slate-500">
                    Invited {{ formatDate(invite.created_at) }}
                  </p>
                  <span
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                    :class="{
                      'bg-emerald-50 text-emerald-600': invite.role === 'Admin',
                      'bg-blue-50 text-blue-600': invite.role === 'Moderator',
                    }"
                  >
                    {{ invite.role }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                @click="$emit('resend', invite)"
                class="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors"
              >
                <Icon name="i-uil-redo" class="w-4 h-4" />
                <span class="hidden sm:inline">Resend</span>
              </button>
              <button
                @click="$emit('remove', invite)"
                class="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Icon name="i-uil-trash-alt" class="w-4 h-4" />
                <span class="hidden sm:inline">Remove</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PendingInvite } from '~/types'

defineProps<{
  invites: PendingInvite[]
}>()

defineEmits<{
  (e: 'resend', invite: PendingInvite): void
  (e: 'remove', invite: PendingInvite): void
}>()

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}
</script>
