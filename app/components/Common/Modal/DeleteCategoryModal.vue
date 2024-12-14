<template>
  <CommonModal
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    title="Delete Category"
    :close-on-outside-click="false"
  >
    <div class="space-y-4">
      <div class="flex items-center gap-3 p-4 bg-red-50 text-red-700 rounded-lg">
        <Icon name="i-uil-exclamation-triangle" class="w-5 h-5 flex-shrink-0" />
        <p class="text-sm">
          Are you sure you want to delete <strong>{{ category?.name }}</strong>? This action cannot be undone.
        </p>
      </div>
      
      <div class="bg-amber-50 text-amber-700 p-4 rounded-lg">
        <div class="flex items-center gap-3 mb-2">
          <Icon name="i-uil-info-circle" class="w-5 h-5 flex-shrink-0" />
          <p class="font-medium">Warning</p>
        </div>
        <p class="text-sm">
          Deleting this category will also delete all products associated with it. Make sure to move or reassign any products you want to keep to another category before proceeding.
        </p>
      </div>
    </div>

    <template #footer>
      <button
        @click="$emit('update:modelValue', false)"
        class="px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-800 focus:outline-none"
      >
        Cancel
      </button>
      <button
        @click="handleDelete"
        class="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-colors"
        :class="{ 'opacity-50 cursor-not-allowed': loading }"
        :disabled="loading"
      >
        {{ loading ? 'Deleting...' : 'Delete Category' }}
      </button>
    </template>
  </CommonModal>
</template>

<script setup lang="ts">
import type { Database } from '~/types/database.types'

type Category = Database['public']['Tables']['categories']['Row']

interface Props {
  modelValue: boolean
  category: Category | null
}

const props = defineProps<Props>()
const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'deleted': []
}>()

const loading = ref(false)
const client = useSupabaseClient<Database>()
const toast = useToast()

const handleDelete = async () => {
  if (!props.category) return

  loading.value = true
  try {
    // delete image before deleting the category
    if (props.category.image) {
      // split image name from url
      const imageName = props.category.image.split('/').pop()
      console.log(imageName);
      await client.storage.from('category_images').remove([imageName]);
    }

    const { error } = await client
      .from('categories')
      .delete()
      .eq('id', props.category.id)

    if (error) throw error

    toast.success('Category deleted successfully')
    emit('deleted')
    emit('update:modelValue', false)
  } catch (error: any) {
    toast.error('Failed to delete category')
    console.error('Error deleting category:', error)
  } finally {
    loading.value = false
  }
}
</script>
