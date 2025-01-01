<template>
  <div>
    <!-- Image Upload Area -->
    <div
      class="relative border-2 border-dashed border-slate-300 rounded-xl p-6 transition-colors"
      :class="isDragging ? 'border-emerald-500 bg-emerald-50' : 'hover:border-slate-400'"
      @dragenter.prevent="isDragging = true"
      @dragleave.prevent="isDragging = false"
      @dragover.prevent
      @drop.prevent="handleDrop"
    >
      <input
        type="file"
        ref="fileInput"
        multiple
        accept="image/*"
        class="hidden"
        @change="handleFileSelect"
      />

      <div class="text-center" v-if="!images.length">
        <Icon name="i-uil-image-upload" class="w-12 h-12 mx-auto text-slate-400" />
        <h3 class="mt-2 text-sm font-medium text-slate-900">Drop images here</h3>
        <p class="mt-1 text-xs text-slate-500">Or click to select files</p>
        <button
          type="button"
          @click="$refs.fileInput.click()"
          class="mt-4 btn-secondary text-sm"
        >
          Select Files
        </button>
      </div>

      <!-- Image Preview Grid -->
      <div v-else class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
        <div
          v-for="(image, index) in images"
          :key="image.id"
          class="relative group aspect-square"
        >
          <img
            :src="image.url"
            class="w-full h-full object-cover rounded-lg"
            :class="{'ring-2 ring-emerald-500': image.isPrimary}"
          />
          
          <!-- Overlay Actions -->
          <div class="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
            <button
              v-if="!image.isPrimary"
              @click="setPrimaryImage(index)"
              class="p-1.5 bg-white rounded-full text-emerald-600 hover:bg-emerald-50"
              title="Set as primary"
            >
              <Icon name="i-uil-star" class="w-4 h-4" />
            </button>
            <button
              @click="removeImage(index)"
              class="p-1.5 bg-white rounded-full text-red-600 hover:bg-red-50"
              title="Remove image"
            >
              <Icon name="i-uil-trash-alt" class="w-4 h-4" />
            </button>
          </div>

          <!-- Primary Badge -->
          <div
            v-if="image.isPrimary"
            class="absolute top-2 left-2 px-2 py-1 bg-emerald-500 text-white text-xs rounded-full"
          >
            Primary
          </div>
        </div>

        <!-- Upload More Button -->
        <button
          v-if="canAddMoreImages"
          type="button"
          @click="$refs.fileInput.click()"
          class="border-2 border-dashed border-slate-300 rounded-lg p-4 hover:border-slate-400 flex flex-col items-center justify-center aspect-square"
        >
          <Icon name="i-uil-plus" class="w-6 h-6 text-slate-400" />
          <span class="mt-2 text-xs text-slate-600">Add More</span>
        </button>
        <div v-else class="text-center p-4">
          <span class="text-xs text-slate-600">Maximum {{ props.maxImages }} images reached.</span>
        </div>
      </div>
    </div>

    <!-- Upload Progress -->
    <div v-if="uploadProgress > 0 && uploadProgress < 100" class="mt-4">
      <div class="flex justify-between text-sm text-slate-600 mb-1">
        <span>Uploading...</span>
        <span>{{ uploadProgress }}%</span>
      </div>
      <div class="w-full bg-slate-200 rounded-full h-1.5">
        <div
          class="bg-emerald-500 h-1.5 rounded-full transition-all duration-300"
          :style="{ width: `${uploadProgress}%` }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

interface Image {
  url: string;
  id: string;
  isPrimary?: boolean;
}

const props = defineProps<{
  modelValue: Image[];
  maxImages?: number;
}>();

const emit = defineEmits(['update:modelValue']);
const isDragging = ref(false);
const fileInput = ref<HTMLInputElement>();
const uploadProgress = ref(0);

const images = computed({
  get: () => props.modelValue || [],
  set: (value) => emit('update:modelValue', value)
});

// Check if we can add more images
const canAddMoreImages = computed(() => {
  return !props.maxImages || images.value.length < props.maxImages;
});

// Get remaining slots
const remainingSlots = computed(() => {
  if (!props.maxImages) return undefined;
  return Math.max(0, props.maxImages - images.value.length);
});

const handleFileSelect = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (!input.files?.length) return;

  const remainingCount = props.maxImages ? props.maxImages - images.value.length : input.files.length;
  const filesToProcess = Array.from(input.files).slice(0, remainingCount);
  
  processFiles(filesToProcess);
  input.value = ''; // Reset input
};

const handleDrop = (event: DragEvent) => {
  isDragging.value = false;
  const droppedFiles = Array.from(event.dataTransfer?.files || []);
  if (!droppedFiles.length) return;

  const remainingCount = props.maxImages ? props.maxImages - images.value.length : droppedFiles.length;
  const filesToProcess = droppedFiles.slice(0, remainingCount);
  
  processFiles(filesToProcess);
};

const processFiles = async (files: File[]) => {
  const imageFiles = files.filter(file => file.type.startsWith('image/'));
  if (!imageFiles.length) return;

  const newImages = [...images.value];

  for (const file of imageFiles) {
    try {
      uploadProgress.value = 0;
      const reader = new FileReader();
      
      reader.onprogress = (event) => {
        if (event.lengthComputable) {
          uploadProgress.value = Math.round((event.loaded / event.total) * 100);
        }
      };

      const imageUrl = await new Promise<string>((resolve, reject) => {
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      newImages.push({
        url: imageUrl,
        id: crypto.randomUUID(),
        isPrimary: newImages.length === 0
      });

      uploadProgress.value = 100;
      setTimeout(() => {
        uploadProgress.value = 0;
      }, 1000);
    } catch (error) {
      console.error('Error processing image:', error);
    }
  }

  emit('update:modelValue', newImages);
};

const setPrimaryImage = (index: number) => {
  const newImages = images.value.map((img, i) => ({
    ...img,
    isPrimary: i === index
  }));
  emit('update:modelValue', newImages);
};

const removeImage = (index: number) => {
  const newImages = [...images.value];
  newImages.splice(index, 1);

  // If we removed the primary image and there are other images, set the first one as primary
  if (newImages.length > 0 && !newImages.some(img => img.isPrimary)) {
    newImages[0].isPrimary = true;
  }

  emit('update:modelValue', newImages);
};
</script>
