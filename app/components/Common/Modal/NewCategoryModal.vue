<template>
  <CommonModal
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    title="Add New Category"
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
        {{ isSubmitting ? 'Creating...' : 'Create Category' }}
      </button>
    </template>
  </CommonModal>
</template>

<script setup lang="ts">
interface Props {
  modelValue: boolean
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
  'created': [category: any]
}>()

const formData = ref<FormData>({
  name: '',
  image: null
})

const imagePreview = ref<string | null>(null)
const isSubmitting = ref(false)
const errors = ref<FormErrors>({})

// Use toast composable
const { success, error } = useToast()

// Composable to get Supabase client
const supabase = useSupabaseClient()

// Generate unique filename
const generateUniqueFileName = (file: File): string => {
  const timestamp = new Date().getTime()
  const randomString = Math.random().toString(36).substring(2, 15)
  const extension = file.name.split('.').pop()
  return `${timestamp}-${randomString}.${extension}`
}

// Computed property to check if form is valid
const isValid = computed(() => {
  return formData.value.name.trim() !== '' && formData.value.image !== null && Object.keys(errors.value).length === 0
})

// Validate form data
const validateForm = (): boolean => {
  errors.value = {}
  
  if (!formData.value.name.trim()) {
    errors.value.name = 'Category name is required'
  } else if (formData.value.name.length < 3) {
    errors.value.name = 'Category name must be at least 3 characters'
  }

  if (!formData.value.image) {
    errors.value.image = 'Category image is required'
  }

  return Object.keys(errors.value).length === 0
}

const handleImageChange = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files[0]) {
    const file = input.files[0]
    if (file.size > 5 * 1024 * 1024) {
      errors.value.image = 'Image size should be less than 5MB'
      error('Image size should be less than 5MB')
      return
    }
    formData.value.image = file
    imagePreview.value = URL.createObjectURL(file)
    delete errors.value.image
  }
}

const removeImage = () => {
  formData.value.image = null
  imagePreview.value = null
  errors.value.image = 'Category image is required'
}

const handleSubmit = async () => {
  if (!validateForm()) {
    error('Please fill in all required fields correctly')
    return
  }

  try {
    isSubmitting.value = true

    if (!formData.value.image) {
      throw new Error('Image is required')
    }

    // 1. Generate unique filename
    const uniqueFileName = generateUniqueFileName(formData.value.image)

    // 2. Upload image to Supabase storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('category_images')
      .upload(uniqueFileName, formData.value.image)

    if (uploadError) {
      throw new Error('Failed to upload image: ' + uploadError.message)
    }

    // 3. Get public URL for the uploaded image
    const { data: { publicUrl } } = supabase.storage
      .from('category_images')
      .getPublicUrl(uniqueFileName)

    // 4. Create category in the database
    const { data: categoryData, error: categoryError } = await supabase
      .from('categories')
      .insert([
        {
          name: formData.value.name,
          image: publicUrl,
        }
      ])
      .select()
      .single()

    if (categoryError) {
      // If category creation fails, delete the uploaded image
      await supabase.storage
        .from('category_images')
        .remove([uniqueFileName])
      
      throw new Error('Failed to create category: ' + categoryError.message)
    }

    // Show success message
    success('Category created successfully')
    
    // Close modal
    emit('update:modelValue', false)
    
    // Reset form
    formData.value = {
      name: '',
      image: null
    }
    imagePreview.value = null
    errors.value = {}
    
  } catch (err) {
    console.error('Error creating category:', err)
    error(err instanceof Error ? err.message : 'Failed to create category. Please try again.')
  } finally {
    isSubmitting.value = false
  }
}
</script>
