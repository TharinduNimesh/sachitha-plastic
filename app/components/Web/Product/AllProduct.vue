<template>
    <div class="flex justify-between items-center mb-12">
        <h2 class="text-3xl md:text-4xl font-bold text-slate-900">All Products</h2>
        <div class="flex gap-4">
            <button @click="scrollLeft"
                class="p-3 rounded-full border border-slate-200 hover:bg-blue-50 transition-colors duration-300">
                <svg class="w-6 h-6 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
            </button>
            <button @click="scrollRight"
                class="p-3 rounded-full border border-slate-200 hover:bg-blue-50 transition-colors duration-300">
                <svg class="w-6 h-6 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
            </button>
        </div>
    </div>

    <div class="relative overflow-hidden">
        <div ref="scrollContainer" class="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth"
            style="scroll-behavior: smooth;">
            <div v-for="product in products" :key="product.id" class="flex-none w-72 mb-12">
                <WebProductCard :product="product" />
            </div>
        </div>
    </div>
</template>

<script setup>

const props = defineProps({
    products: {
        type: Array,
        required: true
    }
});

const { products } = useProducts()
const scrollContainer = ref(null)

const scrollLeft = () => {
    if (scrollContainer.value) {
        scrollContainer.value.scrollLeft -= scrollContainer.value.offsetWidth
    }
}

const scrollRight = () => {
    if (scrollContainer.value) {
        scrollContainer.value.scrollLeft += scrollContainer.value.offsetWidth
    }
}
</script>

<style scoped>
.scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
    display: none;
}
</style>