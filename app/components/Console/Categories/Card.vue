<template>
  <div
    class="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300"
  >
    <!-- Category Header -->
    <div class="p-5 flex items-start justify-between">
      <div class="flex items-center gap-4">
        <!-- Icon -->
        <div
          :class="[
            'w-12 h-12 rounded-lg flex items-center justify-center',
            `bg-${color}-50 text-${color}-600`,
          ]"
        >
          <Icon :name="icon" class="w-6 h-6" />
        </div>

        <!-- Title & Count -->
        <div>
          <h3
            class="text-lg font-semibold text-slate-900 group-hover:text-emerald-600 transition-colors"
          >
            {{ title }}
          </h3>
          <p class="text-sm text-slate-500">{{ productsCount }} Products</p>
        </div>
      </div>

      <!-- Actions -->
      <div
        class="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <button
          @click="$emit('edit')"
          class="p-2 text-slate-600 hover:text-emerald-600 rounded-lg hover:bg-emerald-50 transition-colors"
        >
          <Icon name="i-uil-edit" class="w-5 h-5" />
        </button>
        <button
          @click="$emit('delete')"
          class="p-2 text-slate-600 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
        >
          <Icon name="i-uil-trash-alt" class="w-5 h-5" />
        </button>
      </div>
    </div>

    <!-- Stats -->
    <div
      class="px-5 pb-5 grid grid-cols-2 gap-4 border-t border-slate-100 pt-5"
    >
      <div class="flex flex-col">
        <span class="text-sm text-slate-500">Active Products</span>
        <span class="text-lg font-semibold text-slate-700">{{
          activeProducts
        }}</span>
      </div>
      <div class="flex flex-col">
        <span class="text-sm text-slate-500">Total Views</span>
        <span class="text-lg font-semibold text-slate-700">{{
          totalViews
        }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string;
  icon: string;
  color: string;
  productsCount: number;
  activeProducts: number;
  totalViews: number;
}

defineProps<Props>();
defineEmits(["edit", "delete"]);
</script>
