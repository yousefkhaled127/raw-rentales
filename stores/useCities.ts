export const useCitiesStore = defineStore('cities', {
    state: () => ({
      cities: [],
  }),
  actions: {
    async citiesUsers() {
      try {
        const { data } = await useFetch('cities', {
          responseType: "json",
          method: "get",
          baseURL: "https://backend.rawrentals.org/api/",
        });
        this.cities = data.value;
      } catch (error) {
        console.error("error", error);
      }
    },
  },
});