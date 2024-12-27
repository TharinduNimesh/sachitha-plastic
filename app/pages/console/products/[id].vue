<template>
  <NuxtLayout name="console">
    <!-- Edit Mode Confirmation Modal -->
    <CommonModal
      :model-value="showLeaveConfirmation"
      @update:model-value="showLeaveConfirmation = $event"
      title="Unsaved Changes"
    >
      <p class="text-gray-600 mb-4">
        You have unsaved changes. Are you sure you want to leave? All changes
        will be lost.
      </p>

      <template #footer>
        <button
          type="button"
          class="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50"
          @click="handleStayOnPage"
        >
          Stay on Page
        </button>
        <button
          type="button"
          class="px-4 py-2 text-sm font-medium text-white bg-emerald-600 border border-transparent rounded-md hover:bg-emerald-700"
          @click="handleLeavePage"
        >
          Leave Page
        </button>
      </template>
    </CommonModal>

    <div class="container mx-auto px-4 py-6 max-w-7xl">
      <!-- Header -->
      <div class="flex items-center justify-between mb-6">
        <button
          @click="handleBackNavigation"
          class="flex items-center text-gray-600 hover:text-gray-900"
        >
          <Icon name="uil:arrow-left" class="w-5 h-5 mr-2" />
          <span>Back</span>
        </button>

        <div class="flex items-center gap-4">
          <!-- Save Status (visible in edit mode) -->
          <div v-if="isEditing" class="flex items-center gap-2">
            <Icon
              :name="saveStatusIcon"
              class="w-5 h-5"
              :class="saveStatusColor"
            />
            <span class="text-sm" :class="saveStatusColor">{{
              saveStatus
            }}</span>
          </div>

          <!-- Edit/Save Buttons -->
          <button
            v-if="!isEditing"
            @click="enableEditMode"
            class="flex items-center px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-md hover:bg-emerald-700"
          >
            <Icon name="uil:edit" class="w-5 h-5 mr-2" />
            Edit Product
          </button>
          <button
            v-else
            @click="handleSubmit"
            class="flex items-center px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-md hover:bg-emerald-700"
            :disabled="isSubmitting"
          >
            <Icon
              v-if="isSubmitting"
              name="i-uil-spinner-alt"
              class="w-5 h-5 mr-2 animate-spin"
            />
            {{ isSubmitting ? "Saving..." : "Save Changes" }}
          </button>
        </div>
      </div>

      <!-- Main Content -->
      <div class="grid grid-cols-3 gap-6">
        <!-- Product Details -->
        <div class="col-span-2 space-y-6">
          <!-- Basic Info Card -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4">
              Basic Information
            </h3>
            <div class="space-y-4">
              <FormInput
                v-if="isEditing"
                v-model="product.name"
                label="Product Name"
                :disabled="!isEditing"
              />
              <h1 v-else class="text-2xl font-bold text-gray-900">
                {{ product.name }}
              </h1>

              <FormSelect
                v-if="isEditing"
                v-model="product.category"
                label="Category"
                :disabled="!isEditing"
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
              <div v-else class="flex items-center gap-2">
                <span class="text-sm text-gray-500">Category:</span>
                <span class="text-sm font-medium">
                  {{ getCategoryName(product.category) }}
                </span>
              </div>

              <!-- Status Controls -->
              <div class="flex gap-4" v-if="isEditing">
                <FormSelect v-model="product.availability" label="Availability">
                  <option value="InStock">In Stock</option>
                  <option value="OutOfStock">Out of Stock</option>
                </FormSelect>
                <FormSelect
                  v-if="isEditing"
                  v-model="product.status"
                  label="Status"
                >
                  <option value="Active">Active</option>
                  <option value="Hidden">Archive</option>
                </FormSelect>
              </div>
              <div v-else class="flex gap-4">
                <span
                  class="px-2 py-1 text-xs font-medium rounded-full"
                  :class="availabilityClasses"
                >
                  {{ product.availability }}
                </span>
                <span
                  class="px-2 py-1 text-xs font-medium rounded-full"
                  :class="statusClasses"
                >
                  {{ product.status }}
                </span>
              </div>
            </div>
          </div>

          <!-- Description Card -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Description</h3>
            <ConsoleUEditor
              v-if="isEditing"
              v-model="product.description"
              :disabled="!isEditing"
            />
            <div
              v-else
              v-html="product.description"
              class="prose max-w-none"
            ></div>
          </div>

          <!-- Images Card -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4">
              Product Images
            </h3>
            <ConsoleImageUploader
              v-if="isEditing"
              v-model="product.images"
              :max-images="4"
              accept="image/*"
              :disabled="!isEditing"
            />
            <div v-else class="grid grid-cols-2 gap-4">
              <img
                v-for="image in product.images"
                :key="image.url"
                :src="image.url"
                :alt="product.name"
                class="rounded-lg w-full h-48 object-cover"
              />
            </div>
          </div>
        </div>

        <!-- Statistics Sidebar -->
        <div class="space-y-6">
          <!-- View Statistics -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Statistics</h3>
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-500">Total Views</span>
                <span class="text-lg font-semibold">{{
                  stats.totalViews
                }}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-500">Last 7 Days</span>
                <span class="text-lg font-semibold">{{
                  stats.lastWeekViews
                }}</span>
              </div>
              <div class="h-32">
                <!-- Add chart component here -->
                <div class="text-center text-sm text-gray-500">
                  Views Timeline Chart
                </div>
              </div>
            </div>
          </div>

          <!-- Product Info -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Product Info</h3>
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-500">Created</span>
                <span class="text-sm">{{
                  formatDate(product.created_at)
                }}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-500">Last Updated</span>
                <span class="text-sm">{{
                  formatDate(product.updated_at)
                }}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-500">Product ID</span>
                <span class="text-sm font-mono">{{ product.id }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { Database } from '@/types/database.types';
import type { ProductDraft, Category } from '@/types/product.types';

const route = useRoute();
const router = useRouter();
const client = useSupabaseClient<Database>();
const toast = useToast();

interface ProductStats {
  totalViews: number;
  lastWeekViews: number;
  viewsTimeline: Array<{ date: string; views: number }>;
}

interface ProductWithMeta extends ProductDraft {
  id?: number;
  created_at?: string;
  updated_at?: string;
  availability: Database['public']['Enums']['Availability'];
  status: Database['public']['Enums']['ProductStatus'];
}

// State
const isEditing = ref(false);
const isSubmitting = ref(false);
const showLeaveConfirmation = ref(false);
const navigationTarget = ref<string | null>(null);
const categories = ref<Category[]>([]);

// Enable edit mode based on query parameter
watchEffect(() => {
  const editable = route.query.editable;
  if (editable === 'true') {
    isEditing.value = true;
  }
});

// Clear editable query parameter when exiting edit mode
watch(isEditing, (newValue) => {
  if (!newValue) {
    // Remove editable query parameter without triggering navigation
    router.replace({ 
      query: { 
        ...route.query,
        editable: undefined 
      }
    });
  }
});

// Product and Stats
const product = reactive<ProductWithMeta>({
  id: undefined,
  name: "",
  description: "",
  category: "",
  images: [],
  availability: "InStock",
  status: "Active",
  created_at: undefined,
  updated_at: undefined,
});

const stats = reactive<ProductStats>({
  totalViews: 0,
  lastWeekViews: 0,
  viewsTimeline: [],
});

// Save status management
const SAVE_STATES = {
  SAVED: "saved",
  SAVING: "saving",
  ERROR: "error",
} as const;

type SaveState = typeof SAVE_STATES[keyof typeof SAVE_STATES];
const saveState = ref<SaveState>(SAVE_STATES.SAVED);
const saveTimeout = ref<NodeJS.Timeout | null>(null);

const saveStatusMap: Record<SaveState, { icon: string; text: string; color: string }> = {
  [SAVE_STATES.SAVED]: {
    icon: "i-uil-check-circle",
    text: "All changes saved",
    color: "text-emerald-600",
  },
  [SAVE_STATES.SAVING]: {
    icon: "i-uil-sync",
    text: "Saving...",
    color: "text-amber-600",
  },
  [SAVE_STATES.ERROR]: {
    icon: "i-uil-exclamation-circle",
    text: "Error saving",
    color: "text-red-600",
  },
};

const saveStatus = computed(() => saveStatusMap[saveState.value].text);
const saveStatusIcon = computed(() => saveStatusMap[saveState.value].icon);
const saveStatusColor = computed(() => saveStatusMap[saveState.value].color);

// Utility functions
const getCategoryName = (categoryId: string | number): string => {
  const category = categories.value.find(c => c.id === Number(categoryId));
  return category?.name || 'Unknown Category';
};

const formatDate = (date?: string): string => {
  if (!date) return 'N/A';
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const getImageUrl = (path: string): string => {
  const { data: { publicUrl } } = client.storage
    .from('product_images')
    .getPublicUrl(path);
  return publicUrl;
};

// Status classes
const availabilityClasses = computed(() => ({
  'bg-emerald-100 text-emerald-800': product.availability === 'InStock',
  'bg-red-100 text-red-800': product.availability === 'OutOfStock',
}));

const statusClasses = computed(() => ({
  'bg-emerald-100 text-emerald-800': product.status === 'Active',
  'bg-gray-100 text-gray-800': product.status === 'Hidden',
}));

// Navigation handlers
const handleStayOnPage = () => {
  showLeaveConfirmation.value = false;
  navigationTarget.value = null;
};

const handleLeavePage = () => {
  isEditing.value = false;
  if (navigationTarget.value) {
    router.push(navigationTarget.value);
  }
  showLeaveConfirmation.value = false;
};

const handleBackNavigation = () => {
  if (isEditing.value) {
    navigationTarget.value = '/console/products';
    showLeaveConfirmation.value = true;
  } else {
    router.push('/console/products');
  }
};

// Edit mode handlers
const enableEditMode = () => {
  isEditing.value = true;
};

// Form submission
const handleSubmit = async () => {
  try {
    isSubmitting.value = true;
    saveState.value = SAVE_STATES.SAVING;

    if (!product.category || !product.id) {
      toast.error("Please select a category");
      return;
    }

    // 1. Handle image deletions
    const currentImages = product.images.filter(img => !img.url.startsWith('data:'));
    const deletedImages = originalImages.value.filter(
      origImg => !currentImages.some(currImg => currImg.url === origImg.url)
    );

    if (deletedImages.length) {
      // Delete from storage and database
      await Promise.all(
        deletedImages.map(async (img) => {
          const pathParts = img.url.split('product_images/');
          if (pathParts.length < 2) return;
          const path = pathParts[1];
          await client.storage.from('product_images').remove([path]);
          await client.from('product_images')
            .delete()
            .eq('path', path as string);
        })
      );
    }

    // 2. Handle new image uploads
    const newImages = product.images.filter(img => img.url.startsWith('data:'));
    const uploadedImages = await Promise.all(
      newImages.map(async (image) => {
        const fileExt = image.url.split(';')[0]?.split('/')[1] || 'jpg';
        const fileName = `${crypto.randomUUID()}.${fileExt}`;
        const { data, error } = await client.storage
          .from('product_images')
          .upload(fileName, base64ToBlob(image.url), {
            contentType: image.url.split(';')[0]?.split(':')[1] || 'image/jpeg',
          });

        if (error) throw error;
        return {
          path: data.path,
          isPrimary: image.isPrimary
        };
      })
    );

    // 3. Determine primary image
    const primaryImage = product.images.find(img => img.isPrimary);
    let primaryImagePath = '';

    if (primaryImage) {
      if (primaryImage.url.startsWith('data:')) {
        // New image is primary
        const primary = uploadedImages.find(img => img.isPrimary)?.path || uploadedImages[0]?.path;
        if (primary) primaryImagePath = primary;
      } else {
        // Existing image is primary
        const pathParts = primaryImage.url.split('product_images/');
        if (pathParts.length > 1) primaryImagePath = pathParts[1];
      }
    } else {
      // Default to first image if no primary is set
      const firstPath = uploadedImages[0]?.path || currentImages[0]?.url.split('product_images/')[1];
      if (firstPath) primaryImagePath = firstPath;
    }

    if (!primaryImagePath) {
      toast.error("No valid primary image");
      return;
    }

    // 4. Update product record
    const { error: updateError } = await client
      .from('products')
      .update({
        name: product.name,
        description: product.description,
        category_id: Number(product.category),
        availability: product.availability,
        status: product.status,
        primary_image: primaryImagePath,
        updated_at: new Date().toISOString(),
      })
      .eq('id', product.id);

    if (updateError) throw updateError;

    // 5. Insert new image records
    if (uploadedImages.length) {
      const { error: imagesError } = await client
        .from('product_images')
        .insert(
          uploadedImages.map(({ path }) => ({
            product_id: product.id as number,
            path: path as string,
          }))
        );

      if (imagesError) throw imagesError;
    }

    saveState.value = SAVE_STATES.SAVED;
    isEditing.value = false;
    toast.success('Product updated successfully');
    await fetchProductData();
  } catch (error) {
    console.error('Error updating product:', error);
    saveState.value = SAVE_STATES.ERROR;
    toast.error('Error updating product');
  } finally {
    isSubmitting.value = false;
  }
};

// Base64 to Blob conversion
const base64ToBlob = (base64: string): Blob => {
  const [header, data] = base64.split(',');
  if (!header || !data) throw new Error('Invalid base64 string');
  const contentType = header.split(':')[1]?.split(';')[0] ?? 'application/octet-stream';
  const byteCharacters = atob(data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    const slice = byteCharacters.slice(offset, offset + 512);
    const byteNumbers = new Array(slice.length);
    
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }
    
    byteArrays.push(new Uint8Array(byteNumbers));
  }

  return new Blob(byteArrays, { type: contentType });
};

// Fetch initial data
onMounted(async () => {
  await Promise.all([
    fetchProductData(),
    fetchCategories(),
  ]);
});

// Navigation guard
onBeforeRouteLeave((to, from, next) => {
  if (isEditing.value) {
    showLeaveConfirmation.value = true;
    navigationTarget.value = to.fullPath;
    next(false);
    return;
  }
  next();
});

// Fetch categories
const fetchCategories = async () => {
  try {
    const { data, error } = await client
      .from('categories')
      .select('*')
      .order('name');

    if (error) throw error;
    categories.value = data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    toast.error('Error fetching categories');
  }
};

// Fetch data
const fetchProductData = async () => {
  try {
    const { data, error } = await client
      .from("products")
      .select(
        `
        *,
        product_images (
          path
        )
      `
      )
      .eq("id", route.params.id)
      .single();

    if (error) throw error;
    if (data) {
      const transformedImages = data.product_images.map((img) => ({
        url: getImageUrl(img.path),
        isPrimary: img.path === data.primary_image,
      }));

      // Store original images for comparison
      originalImages.value = [...transformedImages];

      Object.assign(product, {
        id: data.id,
        name: data.name,
        description: data.description,
        category: data.category_id ? String(data.category_id) : '', // Convert to string for form handling
        availability: data.availability,
        status: data.status,
        created_at: data.created_at,
        updated_at: data.updated_at,
        images: transformedImages,
      });
    }
  } catch (error) {
    console.error("Error fetching product:", error);
    toast.error("Error loading product");
  }
};

// Add tracking of original images
const originalImages = ref<Array<{ url: string; isPrimary: boolean }>>([]);
</script>
