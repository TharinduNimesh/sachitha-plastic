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
          :key="index"
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
          type="button"
          @click="$refs.fileInput.click()"
          class="border-2 border-dashed border-slate-300 rounded-lg p-4 hover:border-slate-400 flex flex-col items-center justify-center aspect-square"
        >
          <Icon name="i-uil-plus" class="w-6 h-6 text-slate-400" />
          <span class="mt-2 text-xs text-slate-600">Add More</span>
        </button>
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
import { ref } from 'vue';

interface Image {
  url: string;
  file: File;
  isPrimary: boolean;
}

const props = defineProps<{
  modelValue: Image[];
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: Image[]): void;
}>();

const isDragging = ref(false);
const uploadProgress = ref(0);
const fileInput = ref<HTMLInputElement | null>(null);

const images = ref<Image[]>(props.modelValue || []);

// Watch for changes in images array and emit updates
watch(images, (newImages) => {
  emit('update:modelValue', newImages.value);
}, { deep: true });

const handleFileSelect = async (event: Event) => {
  const files = (event.target as HTMLInputElement).files;
  if (files) {
    await processFiles(Array.from(files));
  }
};

const handleDrop = async (event: DragEvent) => {
  isDragging.value = false;
  const files = event.dataTransfer?.files;
  if (files) {
    await processFiles(Array.from(files));
  }
};

const processFiles = async (files: File[]) => {
  const imageFiles = files.filter(file => file.type.startsWith('image/'));
  
  for (const file of imageFiles) {
    const url = URL.createObjectURL(file);
    images.value.push({
      url,
      file,
      isPrimary: images.value.length === 0 // First image is primary by default
    });

    // Simulate upload progress
    uploadProgress.value = 0;
    const interval = setInterval(() => {
      uploadProgress.value += 10;
      if (uploadProgress.value >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          uploadProgress.value = 0;
        }, 500);
      }
    }, 200);
  }
};

const setPrimaryImage = (index: number) => {
  images.value = images.value.map((image, i) => ({
    ...image,
    isPrimary: i === index
  }));
};

const removeImage = (index: number) => {
  const image = images.value[index];
  URL.revokeObjectURL(image.url);
  images.value.splice(index, 1);

  // If we removed the primary image, set the first remaining image as primary
  if (image.isPrimary && images.value.length > 0) {
    images.value[0].isPrimary = true;
  }
};
</script>
