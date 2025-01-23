<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
  <Toast />
</template>

<script setup>



const globalStore = useGlobalStore();
const globalHome = useUsersStore();
const cockieMacaddress = useCookie("mac_addressGlobal");

import { useToast } from "primevue/usetoast";
const toast = useToast();

const isToastVisible = toRef(globalStore, "toastVisible");


watch(isToastVisible, (newValue) => {
  if (newValue) {
    toast.add(
      { 
        severity: globalStore.toastMsg.type, 
        summary: globalStore.toastMsg.summary, 
        detail: globalStore.toastMsg.message, 
        life: globalStore.toastMsg.time 
      }
  );
  }
})

onMounted(() => {
  if(!cockieMacaddress.value) {
    globalHome.functionMacaddress()
  }
})
</script>