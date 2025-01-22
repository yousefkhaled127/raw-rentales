
export const useGlobalStore = defineStore('global', {
    state: () => ({
      toastMsg: {
        type: 'error',
        summary: 'Error',
        message: 'Error Message',
        time: 1000
      },
      toastVisible: false,
      mac_address: null,
      adressglobal: "idjmfmp",
    }),
    actions: {
      functionMacaddress() {
        const characters = 'abcdefghijklmnopqrstuvwxyz'; // Define the characters to use
        let result = '';
        for (let i = 0; i < 7; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          result += characters[randomIndex];
        }
        this.mac_address = result; // تعيين النتيجة إلى mac_address
        if (process.client) {
          try {
            sessionStorage.setItem("mac_addressGlobal", this.mac_address);
            this.adressglobal = sessionStorage.getItem("mac_addressGlobal")
          } catch (error) {
            console.error("Error saving to sessionStorage:", error);
          }
        }
      },
      showToast(type, summary, message, time) {
        this.toastMsg = { type, summary, message, time };
        this.toastVisible = true;
    
        // Reset visibility after the toast display duration
        setTimeout(() => {
          this.toastVisible = false;
        }, time);
      },
    }
  })