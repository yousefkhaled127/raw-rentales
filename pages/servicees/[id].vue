<template>
  <section>
    <div class="container">
      <h4 class="mb-5">{{ service.title }}</h4>
      <img
        class="service-img"
        :src="service.image"
        alt=""
      />
      <h5 class="mt-3">تفاصيل الخدمه</h5>
      <p class="line-height mt-3">{{ service.description }}</p>
      <div class="content-center mt-5">
        <NuxtLink class="button-all" to="https://web.whatsapp.com/">
          <font-awesome-icon class="icon-whats" icon="fa-brands fa-whatsapp" />
          تواصل معنا
        </NuxtLink>
      </div>
    </div>
  </section>
</template>


<script setup>
const service = ref({})
const { useFetchAPI } = useAPI();
const { data } = await useFetchAPI(`service_details/${useRoute().params.id}`);
service.value = data.value.data;

</script>