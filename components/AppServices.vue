<template>
  <div class="row">
    <div class="col-lg-3 col-md-6" v-if="globalHome.loading" v-for="item in 4" :key="item.id">
      <Skeleton class="mb-2 img-services mb-3"></Skeleton>
      <Skeleton class="mb-2 skeleton-text-small"></Skeleton>
      <Skeleton class="mb-2 skeleton-text skeleton-services"></Skeleton>
    </div>
    <div
      v-else
      class="col-lg-3 col-md-6"
      v-for="services in arrayServices"
      :key="services.id"
    >
      <NuxtLink :to="localePath(`/servicees/${services.id}`)">
        <div class="services-box">
          <img class="img-services" :src="services.image" alt="" />
          <div class="card-body">
            <div class="services-text">
              <h6>{{ services.title }}</h6>
              <p class="item-text mt-2">{{ services.description }}</p>
            </div>
            <NuxtLink class="button-all" to="https://web.whatsapp.com/">
              <font-awesome-icon
                class="icon-whats"
                icon="fa-brands fa-whatsapp"
              />
              تواصل معنا
            </NuxtLink>
          </div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>
<script setup>
const localePath = useLocalePath();
const globalHome = useUsersStore();
globalHome.fetchUsers();


// Define arrayServices
const arrayServices = ref([]);

onMounted(() => {
  arrayServices.value = globalHome.dataHome.data.services;
})
</script>
