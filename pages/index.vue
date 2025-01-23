<template>
  <div>
    <Skeleton v-if="globalHome.loading" class="mb-2 loading-Galleria"></Skeleton>
    <!-- <Skeleton class="mb-2"></Skeleton> -->
    <section v-else class="home-inner home-slider mt-0">
      <Galleria :value="images" :numVisible="5" autoPlay="true" :showThumbnails="false" :showIndicators="true"
        :circular="true">
        <template #item="slotProps">
          <img class="img-slider-home" :src="slotProps.item.image" :alt="slotProps.item.alt"
            style="width: 100%; display: block" />
          <div class="overlay">
            <h3>{{ slotProps.item.title }}</h3>
            <h5>{{ slotProps.item.description }}</h5>
          </div>
        </template>
      </Galleria>


    </section>

    <section class="mt-5">
      <div class="container">
        <div class="occasions-content">
          <Skeleton v-if="globalHome.loading" class="text-center">اتانق لمناسبه</Skeleton>
          <h3 class="text-center" v-else>اتانق لمناسبه</h3>
          <nuxt-link>
            <div class="occasions-box">

              <div v-if="globalHome.loading" v-for="item in 5" :key="item.id">
              <Skeleton class="mb-2 occasions-main"></Skeleton>
              </div>
              <nuxt-link v-else :to="localePath(`/shoping/${occas.id}`)" class="occasions-main" v-for="occas in occasions"
                :key="occas.id">
           
              <img :src="occas.image" alt="" />
              <h6>{{ occas.name }}</h6>
              </nuxt-link>
            </div>
          </nuxt-link>
        </div>
      </div>
    </section>

    <section>
      <div class="container">
        <h4>المنتجات الاحدث</h4>
        <div class="row">
          <AppGallery :listGallery="recent_products" :is-loading="globalHome.loading" />
        </div>
      </div>
    </section>
    <section>
      <div class="container">
        <div class="content-sohial">
          <h3>يمكنك الوصول إلينا عبر</h3>
          <div class="box-sohial">
            <NuxtLink :to="social.link" v-for="social in socials" :key="social.id">
              <img :src="social.icon" alt="" />
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
    <div class="show-more">
      <div class="container">
        <NuxtLink class="show-more-link" to="/offers">عرض المزيد</NuxtLink>
      </div>
    </div>
    <section>
      <div class="container">
        <h4>العروض</h4>
        <div class="row">
          <AppGallery :listGallery="offers" :is-loading="globalHome.loading" />
        </div>
      </div>
    </section>
    <section class="mt-5">
      <div class="container">
        <h4>المننتجات الاكثر طلبا</h4>
        <div class="row">
          <AppGallery :listGallery="top_ordered_products" :is-loading="globalHome.loading" />
        </div>
      </div>
    </section>
    <section class="mt-5">
      <div class="container">
        <div class="content-bettwen mb-3">
          <h4>الخدمات</h4>
          <NuxtLink class="show-more-link" to="/offers">عرض المزيد</NuxtLink>
        </div>
        <AppServices />
      </div>
    </section>
  </div>
</template>

<script setup>
const localePath = useLocalePath();




const images = ref();
const occasions = ref([]);
const offers = ref();
const recent_products = ref();
const top_ordered_products = ref();
const socials = ref()
/// data home 


const globalHome = useUsersStore();
globalHome.fetchUsers();
globalHome.loading = true; // Set loading to true before data fetch





onMounted(() => {
    const homeData = globalHome.dataHome?.data;
    images.value = homeData.slider;
    occasions.value = homeData.occasions;
    offers.value = homeData.offers;
    recent_products.value = homeData.recent_products;
    top_ordered_products.value = homeData.top_ordered_products;
    socials.value = homeData.socials;
});
</script>