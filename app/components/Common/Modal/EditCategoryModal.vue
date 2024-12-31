<template>
  <CommonModal
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    title="Edit Category"
  >
    <!-- Form Content -->
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Image Upload -->
      <div class="space-y-2">
        <label class="block text-sm font-medium text-slate-700">
          Category Image
          <span class="text-red-500">*</span>
        </label>
        <div 
          :class="[
            'flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-lg transition-colors',
            errors.image ? 'border-red-300 hover:border-red-500' : 'border-slate-300 hover:border-emerald-500'
          ]"
        >
          <div class="space-y-2 text-center">
            <div v-if="!imagePreview" class="flex flex-col items-center">
              <Icon name="i-uil-image-upload" class="w-12 h-12 text-slate-400" />
              <div class="flex text-sm text-slate-600">
                <label class="relative cursor-pointer rounded-md font-medium text-emerald-600 hover:text-emerald-700">
                  <span>Upload an image</span>
                  <input
                    type="file"
                    class="sr-only"
                    accept="image/*"
                    @change="handleImageChange"
                  >
                </label>
              </div>
              <p class="text-xs text-slate-500">PNG, JPG up to 5MB</p>
              <p v-if="errors.image" class="text-sm text-red-600 mt-1">{{ errors.image }}</p>
            </div>
            <div v-else class="relative">
              <img
                :src="imagePreview"
                class="h-40 w-40 object-cover rounded-lg mx-auto"
                alt="Category preview"
              >
              <button
                type="button"
                class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                @click="removeImage"
              >
                <Icon name="i-uil-times" class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Category Name -->
      <FormInput
        v-model="formData.name"
        label="Category Name"
        placeholder="Enter category name"
        :error="errors.name"
        required
      />
    </form>

    <!-- Footer Actions -->
    <template #footer>
      <button
        type="button"
        class="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50"
        @click="$emit('update:modelValue', false)"
      >
        Cancel
      </button>
      <button
        type="submit"
        class="px-4 py-2 text-sm font-medium text-white bg-emerald-600 border border-transparent rounded-md hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
        :disabled="isSubmitting || !isValid"
        @click="handleSubmit"
      >
        {{ isSubmitting ? 'Updating...' : 'Update Category' }}
      </button>
    </template>
  </CommonModal>
</template>

<script setup lang="ts">
import type { Database } from '~/types/database.types'

interface Props {
  modelValue: boolean
  category: {
    id: number
    name: string
    image: string
  }
}

interface FormData {
  name: string
  image: File | null
}

interface FormErrors {
  name?: string
  image?: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'category-updated': []
}>()

const client = useSupabaseClient<Database>()
const toast = useToast()

const formData = ref<FormData>({
  name: props.category.name,
  image: null
})

const imagePreview = ref<string>(props.category.image)
const errors = ref<FormErrors>({})
const isSubmitting = ref(false)

// Generate unique filename for uploaded image
const generateUniqueFileName = (file: File): string => {
  const timestamp = Date.now()
  const randomString = Math.random().toString(36).substring(2, 8)
  const extension = file.name.split('.').pop()
  return `${timestamp}-${randomString}.${extension}`
}

// Computed property to check if form is valid
const isValid = computed(() => {
  return formData.value.name.trim() !== '' && Object.keys(errors.value).length === 0
})

// Validate form data
const validateForm = (): boolean => {
  errors.value = {}
  
  if (!formData.value.name.trim()) {
    errors.value.name = 'Category name is required'
  }
  
  return Object.keys(errors.value).length === 0
}

// Handle image change
const handleImageChange = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files[0]) {
    const file = input.files[0]
    
    if (file.size > 5 * 1024 * 1024) {
      errors.value.image = 'Image size should be less than 5MB'
      return
    }
    
    formData.value.image = file
    imagePreview.value = URL.createObjectURL(file)
  }
}

// Remove selected image
const removeImage = () => {
  formData.value.image = null
  imagePreview.value = ''
}

// Handle form submission
const handleSubmit = async () => {
  if (!validateForm()) return
  
  isSubmitting.value = true
  
  try {
    let imagePath = props.category.image
    
    // Upload new image if selected
    if (formData.value.image) {
      // Delete old image if it exists
      if (props.category.image) {
        const oldImagePath = new URL(props.category.image).pathname.split('/').pop()
        if (oldImagePath) {
          await client.storage
            .from('categories')
            .remove([oldImagePath])
        }
      }

      // Upload new image
      const fileName = generateUniqueFileName(formData.value.image)
      const { error: uploadError } = await client.storage
        .from('category_images')
        .upload(fileName, formData.value.image)
      
      if (uploadError) throw uploadError
      
      // Get public URL for the uploaded image
      const { data: { publicUrl } } = client.storage
        .from('category_images')
        .getPublicUrl(fileName)
      
      imagePath = publicUrl
    }
    
    // Update category in database
    const { error: updateError } = await client
      .from('categories')
      .update({
        name: formData.value.name,
        image: imagePath,
      })
      .eq('id', props.category.id)
    
    if (updateError) throw updateError
    
    toast.success('Category updated successfully')
    
    emit('category-updated')
    emit('update:modelValue', false)
  } catch (error) {
    console.error('Error updating category:', error)
    toast.error('Failed to update category. Please try again.')
  } finally {
    isSubmitting.value = false
  }
}
</script>
