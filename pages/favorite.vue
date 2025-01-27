<template>
  <section class="section-all section-all-fav m-0">
    <div class="container">
      <Skeleton class="mb-2 img-gallery mb-3" v-if="loading"></Skeleton>
      <div class="row" v-else>
        <AppGallery :listGallery="listGalleryitem" :deleteFavurte="deleteItem" :is-loading="loading" />
         <div v-if="!listGalleryitem.length"  class="not-favourites">
          <img class="img-not-favourites" src="../assets/images/no-favourites.svg" alt="">
          <h4 class="mt-3">لا توجد منتجات مفضلة</h4>
          <h6 class="mt-3 active-white">عذرا لا توجد منتجات مفضلة الأن قم بإضافة منتج والعودة</h6>
         </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const { baseURL } = useAPI();

import { useUsersStoreauth } from '~/stores/useAuth';
const usersStore = useUsersStoreauth();
const {dataAuth} = storeToRefs(usersStore)
const token = dataAuth.value?.token;

const listGalleryitem = ref([]);
const deleteItem = ref(true);
// const globalHome = useUsersStore();
const loading = ref(true)


  const cockie = useCookie("mac_addressGlobal");
  
  const { data , status} = await useFetch("get-favourite-products", {
    responseType: "json",
    method: "post",
    baseURL: baseURL,
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: {
      mac_address: cockie.value, // Send the proper mac_address
    },
  });

  loading.value = status.value == 'pending' ?  true : false;

  console.log(data.value, "data");

  if (data.value.key === "success") {
    listGalleryitem.value = data.value.data.data;
  } else {
    console.error("API Error:", data.value.msg);
  }


</script>
