<template>
  <!-- <div class="row"> -->
    <div v-if="isLoading" class="col-lg-3 col-md-6" v-for="item in 4" :key="item.id">
      <Skeleton class="mb-2 img-gallery mb-3"></Skeleton>
      <Skeleton class="mb-2 skeleton-text mb-3"></Skeleton>
      <Skeleton class="mb-2 skeleton-text-small mb-3"></Skeleton>
      <Skeleton class="mb-2 skeleton-text-small"></Skeleton>
    </div>
    
  <div
    v-else
    class="col-lg-3 col-md-6"
    :class="{ 'col-lg-4': props.classCategories }"
    v-for="gallery in listGallery"
   
    :key="gallery.id"
  >

  <div class="position-relative">
    <nuxt-link :to="localePath(`/products/${gallery.id}`)">
      <div class="gallery-content">
        <div class="gallery-inner">
          <span v-if="!gallery.discount == 0" class="rival-Sallery">{{
            gallery.discount
          }}%</span>

 

          <img class="img-gallery" :src="gallery.image" alt="" />
        </div>
        <div class="gallery-text">
          <div>
            <div>
              <h6>{{ gallery.name }}</h6>
              <p class="item-text mt-2">{{ gallery.description }}</p>
              <p class="rival-text">{{ gallery.price_before_discount }}</p>
            </div>
            <div class="content-sallery">
              <p class="sallery" v-if="!gallery.discount == 0">{{ gallery.price_after_discount }}</p>
              <p class="sallery" v-if="gallery.discount == 0">{{ gallery.price_before_discount }}</p>
              <div class="flex-global active-color">
                <font-awesome-icon icon="fa-solid fa-suitcase-rolling" />
                <p>اضافة إلى السلة</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nuxt-link>
    <button :disabled="props.deleteFavurte" @click.prevent="eventFavourate(gallery)">
            <font-awesome-icon v-if="!gallery.is_favorite" class="love-gallery" icon="fa-regular fa-heart" />
            <font-awesome-icon v-if="gallery.is_favorite" class="love-gallery" icon="fa-solid fa-heart" />
     </button>
     <button
            v-if="props.deleteFavurte"
            class="delete-gallery"
            @click="eventFavourate(gallery)"
          >
            <font-awesome-icon icon="fa-solid fa-trash-can" />
          </button>
  </div>
 

  </div>
  <!-- </div> -->
</template>

<script setup>
const localePath = useLocalePath();

/// gallery array
const props = defineProps({
  listGallery: {
    type: Array,
    Required: true,
  },
  deleteFavurte: {
    type: Boolean,
    Required: true,
  },
  classCategories: {
    type: Boolean,
    required: true, // Fixed capitalization
  },
  isLoading: {
    type: Boolean,
    required: true,
  }
});
import { useUsersStoreauth } from '~/stores/useAuth';
const usersStore = useUsersStoreauth();
const {dataAuth} = storeToRefs(usersStore)
const token = dataAuth.value?.token;

const globalStore = useGlobalStore();
const { baseURL } = useAPI();


const cockie = useCookie("mac_addressGlobal");

async function eventFavourate(gallery) {
  try {
    const { data } = await useFetch("product-favourite-action", {
      responseType: "json",
      method: "post",
      baseURL: baseURL,
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: {
        product_id: gallery.id,
        mac_address: cockie.value,
      }
    })
    

    console.log("data", data.value)

    if(props.deleteFavurte) {
      console.log("das")
      const index = props.listGallery.findIndex((item) => item.id === gallery.id);
      if (index !== -1) {
        props.listGallery.splice(index, 1);
      }
    }
    if(data.value.key == "success") {
      gallery.is_favorite = !gallery.is_favorite
      globalStore.showToast('success', data.value.msg , "", 2000)
      console.log(data.value , "dattaaaaa")
    }else {
      globalStore.showToast('error', data.value.msg , "", 2000)
    }
  }catch(error) {
    console.log(error);
  }

}


</script>
           
           
