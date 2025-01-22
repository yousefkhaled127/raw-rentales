
import { defineStore } from "pinia";

export const useUsersStoreauth = defineStore('auth', {
  state: () => ({
      dataAuth: null, // Holds the user data
      mainusersStore: null,
  }),
  getters: {
    token(state) {
      state.dataAuth?.token;
    }
  },
  actions: {
    async fetchAuth(formData) {
      try {
        const { data } = await useFetch('sign-up', {
          responseType: "json",
          method: "post",
          baseURL: "https://backend.rawrentals.org/api/",
          body: formData,
        });
        this.dataAuth = data.value;
        return data.value;

      } catch (error) {
        console.error("error", error);
      }
    },
  },
  persist: {
    // storage: piniaPluginPersistedstate.localStorage(),
    storage: piniaPluginPersistedstate.cookies(),
  },
});