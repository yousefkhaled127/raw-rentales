export const useUsersStore = defineStore('users', {
    state: () => ({
      occasions: null, // لتخزين البيانات المسترجعة
      dataOccasions :null,
      dataHome: null,
      mac_address: null,
      adressglobal: "",
      loading : true,
  }),
  actions: {
    functionMacaddress() {
      const characters = 'abcdefghijklmnopqrstuvwxyz'; // Define the characters to use
      let result = '';
      for (let i = 0; i < 7; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
      }
      const cockie = useCookie("mac_addressGlobal");
      cockie.value = result
    },
    async fetchUsers() {
      try {
        this.loading = true;
        const tokenCookie = useCookie("token"); // Access the token from cookies
        const cockie = useCookie("mac_addressGlobal");
        const token = tokenCookie?.value;
        const { data , status } = await useFetch('home', {
          responseType: "json",
          method: "post",
          baseURL: "https://backend.rawrentals.org/api/",
          headers: token
          ? { Authorization: `Bearer ${token}` } // Include token if available
          : {}, // No headers if token is not available
          body: {
            mac_address: cockie.value,
          },
        });

      
        this.loading = status.value === 'pending' ? true : false;

        this.dataHome = data.value || null;


        return data.value;

      } catch (error) {
        console.error("error", error);
      }
    },
  },
});
