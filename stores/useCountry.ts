// export const useCountryphone = defineStore('country', {
//     state: () => ({
//       countryCode: null,
//   }),
//   actions: {
//     async countryUsers() {
//       try {
//         const { data } = await useFetch('country-codes', {
//           responseType: "json",
//           method: "get",
//           baseURL: "https://backend.rawrentals.org/api/",
//         });
//         this.countryCode = data.value || null;

//         return data.value;

//       } catch (error) {
//         console.error("error", error);
//       }
//     },
//   },
// });