// export function useToastHandler() {
//     const toastVisible = ref(false); // Visibility state of the toast
//     const toastMsg = ref({
//       type: "error",
//       summary: "Error",
//       message: "Error Message",
//       time: 3000,
//     });
  
//     const toast = useToast(); // PrimeVue's toast instance
  
//     const showToast = (type, summary, message, time = 3000) => {
//       toastMsg.value = { type, summary, message, time };
//       toastVisible.value = true;
  
//       // Automatically hide toast after the specified time
//       setTimeout(() => {
//         toastVisible.value = false;
//       }, time);
//     };
  
//     // Watch for changes in toast visibility and show the toast
//     watch(toastVisible, (newValue) => {
//       if (newValue) {
//         toast.add({
//           severity: toastMsg.value.type,
//           summary: toastMsg.value.summary,
//           detail: toastMsg.value.message,
//           life: toastMsg.value.time,
//         });
//       }
//     });
  
//     return {
//       showToast, // Function to trigger the toast
//       toastVisible, // Visibility state
//       toastMsg, // Current toast message data
//     };
//   }