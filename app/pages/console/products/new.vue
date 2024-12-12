<template>
  <NuxtLayout name="console">
    <div class="container mx-auto px-4 py-6 max-w-7xl">
      <!-- Header with Back Button and Save Status -->
      <div class="flex items-center justify-between mb-6">
        <button 
          @click="$router.back()" 
          class="flex items-center text-gray-600 hover:text-gray-900"
        >
          <Icon name="uil:arrow-left" class="w-5 h-5 mr-2" />
          <span>Back</span>
        </button>
        
        <!-- Save Status -->
        <div class="flex items-center gap-2">
          <Icon 
            :name="saveStatusIcon" 
            class="w-5 h-5"
            :class="saveStatusColor" 
          />
          <span class="text-sm" :class="saveStatusColor">{{ saveStatus }}</span>
        </div>
      </div>

      <!-- Main Form Card -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200">
        <div class="p-6 space-y-8">
          <!-- Basic Information -->
          <div>
            <h3 class="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
            <div class="grid grid-cols-2 gap-6">
              <FormInput
                v-model="product.name"
                label="Product Name"
                placeholder="Enter product name"
                type="text"
              />
              <FormSelect
                v-model="product.category"
                label="Category"
              >
                <option value="">Select a category</option>
                <option 
                  v-for="category in categories" 
                  :key="category.id" 
                  :value="category.id"
                >
                  {{ category.name }}
                </option>
              </FormSelect>
            </div>
          </div>

          <!-- Status -->
          <div>
            <FormSelect
              v-model="product.status"
              label="Status"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </FormSelect>
          </div>

          <!-- Product Description -->
          <div>
            <h3 class="text-lg font-medium text-gray-900 mb-4">Product Description</h3>
            <ConsoleUEditor
              v-model="product.description"
              placeholder="Enter product description"
            />
          </div>

          <!-- Product Images -->
          <div>
            <h3 class="text-lg font-medium text-gray-900 mb-4">Product Images</h3>
            <ConsoleImageUploader
              v-model="product.images"
              :max-files="3"
              accept="image/*"
            />
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { debounce } from 'lodash-es';

const router = useRouter();

// Product data
const product = ref({
  name: '',
  description: '',
  category: '',
  status: 'draft',
  images: []
});

// Mock categories (replace with actual data)
const categories = ref([
  { id: 1, name: 'Category 1' },
  { id: 2, name: 'Category 2' },
  { id: 3, name: 'Category 3' }
]);

// Save status management
const SAVE_STATES = {
  SAVED: 'saved',
  SAVING: 'saving',
  ERROR: 'error',
  IDLE: 'idle'
};

const saveState = ref(SAVE_STATES.IDLE);

const saveStatusMap = {
  [SAVE_STATES.SAVED]: {
    text: 'Draft saved',
    icon: 'uil:check-circle',
    color: 'text-green-600'
  },
  [SAVE_STATES.SAVING]: {
    text: 'Saving draft...',
    icon: 'uil:spinner',
    color: 'text-blue-600'
  },
  [SAVE_STATES.ERROR]: {
    text: 'Error saving draft',
    icon: 'uil:exclamation-circle',
    color: 'text-red-600'
  },
  [SAVE_STATES.IDLE]: {
    text: 'All changes saved',
    icon: 'uil:check',
    color: 'text-gray-600'
  }
};

const saveStatus = computed(() => saveStatusMap[saveState.value].text);
const saveStatusIcon = computed(() => saveStatusMap[saveState.value].icon);
const saveStatusColor = computed(() => saveStatusMap[saveState.value].color);

// Auto-save functionality
const saveDraft = debounce(async () => {
  try {
    saveState.value = SAVE_STATES.SAVING;
    // TODO: Implement actual API call to save draft
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
    saveState.value = SAVE_STATES.SAVED;
  } catch (error) {
    console.error('Error saving draft:', error);
    saveState.value = SAVE_STATES.ERROR;
  }
}, 1000);

// Watch for changes and trigger auto-save
watch(
  () => ({
    name: product.value.name,
    description: product.value.description,
    category: product.value.category,
    status: product.value.status,
    images: product.value.images
  }),
  () => {
    saveState.value = SAVE_STATES.SAVING;
    saveDraft();
  },
  { deep: true }
);

// Save product
const saveProduct = async () => {
  saveState.value = SAVE_STATES.SAVING;
  
  try {
    // TODO: Implement API call to save product
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
    
    // Show success message
    saveState.value = SAVE_STATES.SAVED;
    setTimeout(() => {
      saveState.value = SAVE_STATES.IDLE;
    }, 2000);
    
    // Navigate to products list
    navigateTo('/console/products');
  } catch (error) {
    console.error('Error saving product:', error);
    saveState.value = SAVE_STATES.ERROR;
  }
};
</script>
