<template>
  <div class="w-full markdown flex flex-col">
    <div
      v-if="editor"
      class="px-5 py-3 flex gap-3 flex-wrap border border-b-0 border-slate-300 bg-gray-50 rounded-t-lg"
    >
      <!-- Basic Formatting -->
      <button
        @click="editor.chain().focus().toggleBold().run()"
        :class="{ 'bg-gray-200': editor.isActive('bold') }"
        class="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-200 transition-colors"
      >
        <Icon name="mdi:format-bold" class="w-4 h-4" />
      </button>

      <button
        @click="editor.chain().focus().toggleItalic().run()"
        :class="{ 'bg-gray-200': editor.isActive('italic') }"
        class="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-200 transition-colors"
      >
        <Icon name="mdi:format-italic" class="w-4 h-4" />
      </button>

      <button
        @click="editor.chain().focus().setHorizontalRule().run()"
        class="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-200 transition-colors"
      >
        <Icon name="mdi:minus" class="w-4 h-4" />
      </button>

      <button
        @click="editor.chain().focus().toggleUnderline().run()"
        :class="{ 'bg-gray-200': editor.isActive('underline') }"
        class="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-200 transition-colors"
      >
        <Icon name="mdi:format-underline" class="w-4 h-4" />
      </button>

      <button
        @click="chooseColor"
        :class="{ 'bg-gray-200': editor.isActive('textStyle') }"
        class="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-200 transition-colors"
      >
        <Icon name="mdi:palette" class="w-4 h-4" />
      </button>

      <button
        @click="editor.chain().focus().toggleHighlight().run()"
        :class="{ 'bg-gray-200': editor.isActive('highlight') }"
        class="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-200 transition-colors"
      >
        <Icon name="mdi:marker" class="w-4 h-4" />
      </button>

      <!-- Heading Menu -->
      <div class="relative" ref="headingMenuRef">
        <button
          @click="isHeadingMenuOpen = !isHeadingMenuOpen"
          :class="{ 'bg-gray-200': editor.isActive('heading') }"
          class="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-200 transition-colors"
        >
          <Icon name="mdi:format-header-1" class="w-4 h-4" />
        </button>
        <!-- Heading dropdown menu -->
        <div
          v-if="isHeadingMenuOpen"
          class="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-lg border border-slate-200 p-3 z-10 min-w-[200px]"
        >
          <div class="grid grid-cols-3 gap-2">
        <button
          v-for="level in [1, 2, 3, 4, 5, 6]"
          :key="level"
          @click="editor.chain().focus().toggleHeading({ level }).run(); isHeadingMenuOpen = false"
          :class="{ 'bg-gray-200': editor.isActive('heading', { level }) }"
          class="w-12 h-12 flex items-center justify-center rounded border border-slate-200 hover:bg-gray-200 transition-colors"
        >
          <span class="text-sm font-semibold">H{{ level }}</span>
        </button>
          </div>
        </div>
      </div>

      <button
        @click="editor.chain().focus().toggleBlockquote().run()"
        :class="{ 'bg-gray-200': editor.isActive('blockquote') }"
        class="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-200 transition-colors"
      >
        <Icon name="mdi:format-quote-close" class="w-4 h-4" />
      </button>

      <button
        @click="editor.chain().focus().toggleBulletList().run()"
        :class="{ 'bg-gray-200': editor.isActive('bulletList') }"
        class="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-200 transition-colors"
      >
        <Icon name="mdi:format-list-bulleted" class="w-4 h-4" />
      </button>

      <button
        @click="editor.chain().focus().toggleOrderedList().run()"
        :class="{ 'bg-gray-200': editor.isActive('orderedList') }"
        class="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-200 transition-colors"
      >
        <Icon name="mdi:format-list-numbered" class="w-4 h-4" />
      </button>

      <!-- Alignment -->
      <button
        @click="editor.chain().focus().setTextAlign('left').run()"
        :class="{ 'bg-gray-200': editor.isActive({ textAlign: 'left' }) }"
        class="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-200 transition-colors"
      >
        <Icon name="mdi:format-align-left" class="w-4 h-4" />
      </button>
      <button
        @click="editor.chain().focus().setTextAlign('center').run()"
        :class="{ 'bg-gray-200': editor.isActive({ textAlign: 'center' }) }"
        class="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-200 transition-colors"
      >
        <Icon name="mdi:format-align-center" class="w-4 h-4" />
      </button>
      <button
        @click="editor.chain().focus().setTextAlign('right').run()"
        :class="{ 'bg-gray-200': editor.isActive({ textAlign: 'right' }) }"
        class="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-200 transition-colors"
      >
        <Icon name="mdi:format-align-right" class="w-4 h-4" />
      </button>

      <!-- Undo/Redo -->
      <button
        @click="editor.chain().focus().undo().run()"
        :disabled="!editor.can().undo()"
        class="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-200 transition-colors disabled:opacity-50"
      >
        <Icon name="mdi:undo" class="w-4 h-4" />
      </button>
      <button
        @click="editor.chain().focus().redo().run()"
        :disabled="!editor.can().redo()"
        class="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-200 transition-colors disabled:opacity-50"
      >
        <Icon name="mdi:redo" class="w-4 h-4" />
      </button>

      <input
        type="color"
        hidden
        ref="colorPicker"
        v-model="textColor"
        @change="editor.chain().focus().setColor($event.target.value).run()"
      />
    </div>
    <EditorContent :editor="editor" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

import { useEditor, EditorContent } from "@tiptap/vue-3";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import StarterKit from "@tiptap/starter-kit";
import Heading from "@tiptap/extension-heading";
import Code from "@tiptap/extension-code";
import Image from "@tiptap/extension-image";
import Highlight from "@tiptap/extension-highlight";
import Color from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import ListItem from "@tiptap/extension-list-item";
import { onClickOutside } from "@vueuse/core";

const emit = defineEmits(["update:modelValue"]);
const textColor = ref("#000000");
const colorPicker = ref();
const isHeadingMenuOpen = ref(false);
const headingMenuRef = ref(null);

onClickOutside(headingMenuRef, () => {
  isHeadingMenuOpen.value = false;
});

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
});

const editor = useEditor({
  editorProps: {
    attributes: {
      class:
        "w-full prose prose-sm max-w-none h-[400px] border border-slate-300 bg-gray-50 p-5 border-t-none rounded-bl-lg rounded-br-lg outline-none overflow-y-auto",
    },
  },
  content: props.modelValue,
  extensions: [
    StarterKit,
    Underline,
    TextStyle,
    Color,
    Highlight,
    TextStyle,
    ListItem,
    TextAlign.configure({
      types: ["heading", "paragraph"],
    }),
    Heading.configure({
      levels: [1, 2, 3, 4, 5, 6],
    }),
    Code.configure({
      HTMLAttributes: {
        class: "language-javascript",
      },
    }),
    Image.configure({
      inline: true,
      HTMLAttributes: {
        class: "w-full",
      },
    }),
    Color.configure({
      types: ["textStyle"],
    }),
  ],
});

watch(
  () => editor.value?.getHTML(),
  (value) => {
    emit("update:modelValue", value);
  }
);

const headingIcon = computed(() => {
  if (editor.value?.isActive("heading", { level: 1 })) return { icon: "uil:heading-1", isHeading: true };
  if (editor.value?.isActive("heading", { level: 2 })) return { icon: "uil:heading-2", isHeading: true };
  if (editor.value?.isActive("heading", { level: 3 })) return { icon: "uil:heading-3", isHeading: true };
  if (editor.value?.isActive("heading", { level: 4 })) return { icon: "uil:heading-4", isHeading: true };
  if (editor.value?.isActive("heading", { level: 5 })) return { icon: "uil:heading-5", isHeading: true };
  if (editor.value?.isActive("heading", { level: 6 })) return { icon: "uil:heading-6", isHeading: true };
  return { icon: "uil:heading", isHeading: false };
});

const alignmentIcon = computed(() => {
  if (editor.value?.isActive({ textAlign: 'justify' })) return "uil:align-justify";
  if (editor.value?.isActive({ textAlign: 'left' })) return "uil:align-left";
  if (editor.value?.isActive({ textAlign: 'center' })) return "uil:align-center";
  return "uil:align-right";
});

const toggleTextAlign = () => {
  if (editor.value?.isActive({ textAlign: 'justify' })) {
    editor.value?.chain().focus().setTextAlign('left').run();
  } else if (editor.value?.isActive({ textAlign: 'left' })) {
    editor.value?.chain().focus().setTextAlign('center').run();
  } else if (editor.value?.isActive({ textAlign: 'center' })) {
    editor.value?.chain().focus().setTextAlign('right').run();
  } else {
    editor.value?.chain().focus().setTextAlign('justify').run();
  }
};

function chooseColor() {
  colorPicker.value.click();
}
</script>

<style>
.ProseMirror {
  outline: none;
}
.ProseMirror p.is-editor-empty:first-child::before {
  content: attr(data-placeholder);
  float: left;
  color: #adb5bd;
  pointer-events: none;
  height: 0;
}
</style>