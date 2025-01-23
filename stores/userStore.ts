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
    functionMacaddress: async function () {
      const characters = 'abcdefghijklmnopqrstuvwxyz';
      let result = '';
      for (let i = 0; i < 7; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
      }
      const cockie = useCookie("mac_addressGlobal");
      cockie.value = result; // Set the new MAC address in the cookie
    
      // Fetch users after setting the MAC address
      await this.fetchUsers();
    },
    async fetchUsers() {
      try {
        this.loading = true; // Set loading to true while fetching
        const tokenCookie = useCookie("token");
        const cockie = useCookie("mac_addressGlobal");
        const token = tokenCookie?.value;
    
        const { data, status } = await useFetch('home', {
          responseType: "json",
          method: "post",
          baseURL: "https://backend.rawrentals.org/api/",
          headers: token
            ? { Authorization: `Bearer ${token}` }
            : {},
          body: {
            mac_address: cockie.value,
          },
        });
    
        // Update state with fetched data
        this.dataHome = data.value || null;
        this.loading = false; // Set loading to false after fetch
    
        return data.value;
      } catch (error) {
        console.error("Error fetching users:", error);
        this.loading = false; // Stop loading on error
      }
    },



    
  },
});
