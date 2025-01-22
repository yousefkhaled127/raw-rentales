import { defineStore } from "pinia";
export const useUsersPruduct = defineStore('cart', {
    state: () => ({
      cart: null, 
  }),
  persist: {
    // storage: piniaPluginPersistedstate.localStorage(),
    storage: piniaPluginPersistedstate.cookies(),
  },
});