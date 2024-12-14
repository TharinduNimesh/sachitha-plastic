// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",

  future: {
    compatibilityVersion: 4,
  },

  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxt/icon",
    "@pinia/nuxt",
    "@nuxtjs/supabase",
  ],
  icon: {
    serverBundle: {
      collections: ["uil"],
    },
  },

  tailwindcss: {
    cssPath: "~/assets/css/tailwind.css",
    configPath: "~/tailwind.config.ts",
  },

  supabase: {
    redirectOptions: {
      login: '/auth/sign-in',
      callback: '/auth/sign-in',
      include: ['/console', '/console(/*)?']
    }
  }
});