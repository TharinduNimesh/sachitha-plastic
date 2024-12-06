<template>
  <div class="overflow-x-hidden min-h-screen flex flex-col">
    <WebHeader />
    <main class="flex-grow">
      <slot />
    </main>
    <WebFooter />
  </div>
</template>
