<template>
  <NuxtLayout name="console">
    <!-- Draft Recovery Modal -->
    <CommonModal
      :model-value="showDraftDialog"
      @update:model-value="showDraftDialog = $event"
      title="Resume Draft?"
    >
      <p class="text-gray-600 mb-4">
        You have an unsaved draft from {{ formattedLastSaved }}. Would you like
        to continue editing it?
      </p>

      <template #footer>
        <button
          type="button"
          class="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50"
          @click="startFresh"
        >
          Start Fresh
        </button>
        <button
          type="button"
          class="px-4 py-2 text-sm font-medium text-white bg-emerald-600 border border-transparent rounded-md hover:bg-emerald-700"
          @click="loadDraft"
        >
          Resume Draft
        </button>
      </template>
    </CommonModal>

    <!-- Leave Confirmation Modal -->
    <CommonModal
      :model-value="showLeaveConfirmation"
      @update:model-value="showLeaveConfirmation = $event"
      title="Unsaved Changes"
    >
      <p class="text-gray-600 mb-4">
        You have unsaved changes. Are you sure you want to leave? Your draft
        will be saved automatically.
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
      <!-- Header with Back Button and Save Status -->
      <div class="flex items-center justify-between mb-6">
        <button
          @click="handleBackNavigation"
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
        <form @submit.prevent="handleSubmit" class="p-6 space-y-8">
          <!-- Basic Information -->
          <div>
            <h3 class="text-lg font-medium text-gray-900 mb-4">
              Basic Information
            </h3>
            <div class="grid grid-cols-2 gap-6">
              <FormInput
                v-model="product.name"
                label="Product Name"
                placeholder="Enter product name"
                type="text"
                required
              />
              <FormSelect v-model="product.category" label="Category" required>
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

          <!-- Product Description -->
          <div>
            <h3 class="text-lg font-medium text-gray-900 mb-4">
              Product Description
            </h3>
            <ConsoleUEditor
              v-model="product.description"
              placeholder="Enter product description"
            />
          </div>

          <!-- Product Images -->
          <div>
            <h3 class="text-lg font-medium text-gray-900 mb-4">
              Product Images
            </h3>
            <ConsoleImageUploader
              v-model="product.images"
              :max-images="4"
              accept="image/*"
            />
          </div>

          <!-- Submit Button -->
          <div class="flex justify-end pt-4">
            <button
              type="submit"
              class="px-4 py-2 text-sm font-medium text-white bg-emerald-600 border border-transparent rounded-md hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
              :disabled="isSubmitting"
            >
              <Icon
                v-if="isSubmitting"
                name="i-uil-spinner-alt"
                class="w-5 h-5 mr-2 animate-spin"
              />
              {{ isSubmitting ? "Creating Product..." : "Create Product" }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, reactive } from "vue";
import type { RouteLocationNormalized } from "vue-router";
import { useRouter, onBeforeRouteLeave } from "vue-router";
import { productDraftService } from "@/utils/productDraftService";
import type { ProductDraft, Category } from "@/types/product.types";
import type { Database } from "@/types/database.types";

const router = useRouter();
const client = useSupabaseClient<Database>();
const toast = useToast();
const showDraftDialog = ref(false);
const showLeaveConfirmation = ref(false);
const navigationTarget = ref<string | null>(null);
const isNavigating = ref(false);
const isFormSubmitted = ref(false);
const isSubmitting = ref(false);

// Initialize product state
const product = reactive<ProductDraft>({
  name: "",
  description: "",
  category: "",
  images: [],
});

// Watch for changes in product state and save to localStorage
watch(
  () => ({ ...product }),
  (newValue) => {
    if (!isFormSubmitted.value && hasUnsavedChanges.value) {
      productDraftService.saveDraft(newValue);
      saveState.value = SAVE_STATES.SAVING;
      startSaveTimeout();
    }
  },
  { deep: true }
);

// Check for existing draft on component mount
onMounted(async () => {
  await fetchCategories();
  const hasDraft = productDraftService.hasDraft();
  if (hasDraft) {
    showDraftDialog.value = true;
  }
});

// Load draft content
const loadDraft = (): void => {
  const draft = productDraftService.getDraft();
  if (draft) {
    Object.assign(product, {
      name: draft.name,
      description: draft.description,
      category: draft.category,
      images: draft.images,
    });
  }
  showDraftDialog.value = false;
};

// Start fresh without clearing draft
const startFresh = (): void => {
  showDraftDialog.value = false;
};

// Clear draft and reset form
const clearDraft = (): void => {
  productDraftService.clearDraft();
  Object.assign(product, {
    name: "",
    description: "",
    category: "",
    images: [],
  });
};

// Handle navigation attempts
const handleStayOnPage = (): void => {
  showLeaveConfirmation.value = false;
  navigationTarget.value = null;
  isNavigating.value = false;
};

const handleLeavePage = (): void => {
  if (navigationTarget.value) {
    isNavigating.value = true;
    router.push(navigationTarget.value);
  }
  showLeaveConfirmation.value = false;
};

const handleBackNavigation = (): void => {
  if (hasUnsavedChanges.value) {
    navigationTarget.value = "/console/products";
    showLeaveConfirmation.value = true;
  } else {
    router.push("/console/products");
  }
};

// Check for unsaved changes
const hasUnsavedChanges = computed((): boolean => {
  return (
    product.name !== "" ||
    product.description !== "" ||
    product.category !== "" ||
    product.images.length > 0
  );
});

// Handle form submission
const handleSubmit = async (): Promise<void> => {
  try {
    if (!product.category) {
      toast.error("Please select a category");
      return;
    }

    if (!product.images.length) {
      toast.error("Please upload at least one image");
      return;
    }

    isSubmitting.value = true;
    isFormSubmitted.value = true;

    // 1. Upload images to Supabase Storage
    const uploadedImages = await Promise.all(
      product.images.map(async (image) => {
        const fileName = `${crypto.randomUUID()}.${
          image.url.split(";")[0]?.split("/")[1]
        }`;
        const { data, error } = await client.storage
          .from("product_images")
          .upload(`${fileName}`, base64ToBlob(image.url), {
            contentType: image.url.split(";")[0]?.split(":")[1],
          });

        if (error) throw error;
        return data.path;
      })
    );

    // 2. Create product record
    const primaryImage = product.images.find(img => img.isPrimary)?.url || product.images[0]?.url || '';
    const primaryImagePath = uploadedImages.find(path => 
      path.includes(primaryImage.split(";")[0]?.split("/")[1] ?? '')
    ) || uploadedImages[0];

    const { data: productData, error: productError } = await client
      .from("products")
      .insert({
        name: product.name,
        description: product.description,
        category_id: Number(product.category),
        availability: "InStock", // Only InStock or OutOfStock
        status: "Active", // Only Active or Hidden
        primary_image: primaryImagePath,
      })
      .select()
      .single();

    if (productError) throw productError;

    // 3. Create product images records
    const { error: imagesError } = await client.from("product_images").insert(
      uploadedImages.map((path) => ({
        product_id: productData.id,
        path,
      }))
    );

    if (imagesError) throw imagesError;

    toast.success("Product created successfully");
    clearDraft();
    router.push("/console/products");
  } catch (error) {
    console.error("Error creating product:", error);
    toast.error("Error creating product. Please try again.");
    isFormSubmitted.value = false;
  } finally {
    isSubmitting.value = false;
  }
};

// Helper function to convert base64 to Blob
const base64ToBlob = (base64: string): Blob => {
  const [header, data] = base64.split(",");
  if (!header || !data) throw new Error("Invalid base64 string");
  const contentType =
    header.split(":")[1]?.split(";")[0] ?? "application/octet-stream";
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

// Categories
const categories = ref<Category[]>([]);
const fetchCategories = async (): Promise<void> => {
  try {
    const { data, error } = await client
      .from("categories")
      .select("*")
      .order("name");

    if (error) throw error;
    categories.value = data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    toast.error("Error fetching categories");
  }
};

// Save status management
const SAVE_STATES = {
  SAVED: "saved",
  SAVING: "saving",
  ERROR: "error",
} as const;

type SaveState = (typeof SAVE_STATES)[keyof typeof SAVE_STATES];
const saveState = ref<SaveState>(SAVE_STATES.SAVED);
const saveTimeout = ref<NodeJS.Timeout | null>(null);

const saveStatusMap: Record<
  SaveState,
  { icon: string; text: string; color: string }
> = {
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

const saveStatus = computed((): string => saveStatusMap[saveState.value].text);
const saveStatusIcon = computed(
  (): string => saveStatusMap[saveState.value].icon
);
const saveStatusColor = computed(
  (): string => saveStatusMap[saveState.value].color
);

const startSaveTimeout = (): void => {
  if (saveTimeout.value) clearTimeout(saveTimeout.value);
  saveTimeout.value = setTimeout(() => {
    saveState.value = SAVE_STATES.SAVED;
  }, 1000);
};

// Navigation guard
onBeforeRouteLeave(
  (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: (valid?: boolean | string) => void
  ) => {
    if (isFormSubmitted.value) {
      next();
      return;
    }

    if (hasUnsavedChanges.value && !isNavigating.value) {
      showLeaveConfirmation.value = true;
      navigationTarget.value = to.fullPath;
      next(false);
      return;
    }

    next();
  }
);
</script>
