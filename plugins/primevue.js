import { defineNuxtPlugin } from "#app";
import PrimeVue from "primevue/config";
import "primeicons/primeicons.css"; // PrimeIcons
import Password from "primevue/password";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("Password", Password).use(PrimeVue);
});
