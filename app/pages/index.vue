<template>
  <NuxtLayout name="web">
    <WebHero />
    <WebAbout />
    <WebProductShowcase />
    <WebCategorySlider />
    <WebCallToAction />
    <WebProducts />
    <WebGallery />
  </NuxtLayout>
</template>

<script setup lang="ts">
useHead({
  title: 'Samarasinghe Trade Center - Leading Plastic Manufacturing & Recycling Solutions',
  meta: [
    {
      name: 'description',
      content: 'Samarasinghe Trade Center is a leading provider of plastic manufacturing and recycling solutions in Sri Lanka. Expert in plastic products, machinery, and sustainable solutions since 1984.'
    },
    {
      name: 'keywords',
      content: 'plastic manufacturing, recycling solutions, plastic products, Sri Lanka, machinery, sustainable solutions, eco-friendly'
    },
    { name: 'robots', content: 'index, follow' },
    { name: 'author', content: 'Samarasinghe Trade Center' },
    { name: 'canonical', content: 'https://samarasinghetrade.com' }
  ],
  link: [
    {
      rel: 'canonical',
      href: 'https://samarasinghetrade.com'
    }
  ]
})
</script>
