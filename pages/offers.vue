<template>
    <section class="content-center">
        <h4>العروض</h4>
    </section>
    <section class="section-child m-0">
  
      <div class="container">
        <div class="row">
          <AppGallery :listGallery="listGalleryitem" />
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
  const listGalleryitem = ref([]);
  const { useFetchAPI } = useAPI();
  const { data } = await useFetchAPI("offer-products");
  listGalleryitem.value = data.value.data.data;
  
  </script>
  