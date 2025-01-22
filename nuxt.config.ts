// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from "@primevue/themes/aura";

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  css: [
    "@/assets/style.css",
    "bootstrap/dist/css/bootstrap.rtl.css",
    "bootstrap/dist/css/bootstrap.min.css",
    "@fortawesome/fontawesome-svg-core/styles.css",
  ],
  
  app: {
    pageTransition: { name: "page", mode: "in-out" },
    layoutTransition: { name: "layout", mode: "in-out" },
  },
  modules: ["@primevue/nuxt-module", "@nuxtjs/i18n", "@pinia/nuxt","pinia-plugin-persistedstate/nuxt",],
  i18n: {
    // lazy: true,
    langDir: "locales",
    strategy: "prefix_except_default",
    locales: [
      {
        code: "ar",
        iso: "ar",
        name: "العربيه",
        file: "ar.json",
        dir: "rtl",
      },
      {
        code: "en",
        iso: "en",
        name: "english",
        file: "en.json",
        dir: "ltr",
      },
    ],
  },
  plugins: [
    { src: "~/plugins/bootstrap.js", mode: "client" },
    { src: "~/plugins/fontawesome.js", mode: "client" },
  ],
  primevue: {
    options: {
      theme: {
        preset: Aura,
      },
    },
  },
  runtimeConfig: {
    public: {
      baseURL: "https://backend.rawrentals.org/api/", // العنوان الأساسي للـ API
    },
  },

});
