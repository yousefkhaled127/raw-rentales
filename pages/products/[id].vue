<template>
  <section>
    <div class="container">
      <div class="row">
        <div class="col-lg-6">
          <h5>{{ product.name }}</h5>
          <div class="mt-4">
            <h6>وصف المنتج</h6>
            <p class="active-white mt-2">{{ product.description }}</p>
            <form class="mt-5">
              <label for="">المقاس</label>
              <div class="d-flex gap-3">
                <label v-for="sizeItem in product.sizes" :key="sizeItem.id">
                  <input
                    v-model="size"
                    class="input-radio radio-size"
                    type="radio"
                    :id="sizeItem.id"
                    name="radio-size"
                    :value="sizeItem.id"
                  />
                  <!-- :checked="sizeItem.id === 2" -->
                  <label class="box-size" :for="sizeItem.id">{{ sizeItem.size }}</label>
                </label>
              </div>
              <button @click.prevent="clickk">click</button>
            </form>

            <div class="mt-5 d-flex gap-3 align-items-center">
              <h5>الكميه</h5>
              <button @click="number++" class="box-size">
                <font-awesome-icon icon="fa-solid fa-plus" />
              </button>
              <h5>{{ number }}</h5>
              <button @click="minus" class="box-size">
                <font-awesome-icon icon="fa-solid fa-minus" />
              </button>
            </div>
            <div class="mt-4">
              <div class="d-flex gap-4 mb-4">
                <h4 v-if="product.price_after_discount" class="discount-text active-white">{{ product.price_before_discount }} ر.س</h4>
                <h4 v-if="!product.price_after_discount">{{ product.price_before_discount }} ر.س</h4>
                <h4 v-if="product.price_after_discount">{{ product.price_after_discount }} ر.س</h4>
              </div>
              <p v-if="product.time_remaining" class="color-red mt-2">{{ product.time_remaining }}</p>
            </div>
            <div class="mt-5">
              <!-- <h4 class="mb-5">{{ product.price_before_discount }} ر.س</h4> -->
              <h5>صور توضيحية لطريقة قياس المنتج</h5>
              <div class="mt-3 item-product">
                <div></div>
                <!-- <div class="d-flex gap-3" v-for="img in images" :key="img.id"> -->
                  <!-- <img :src="img.image" alt=""> -->
                  <!-- <img
                    class="item-img-product"
                    src="../../assets/images/Rectangle 25928.png"
                    alt=""
                  />
                  <img
                    class="item-img-product"
                    src="../../assets/images/Rectangle 25928.png"
                    alt=""
                  />
                  <img
                    class="item-img-product"
                    src="../../assets/images/Rectangle 25928.png"
                    alt=""
                  /> -->
                <!-- </div> -->

                <button class="bton-love" @click="submitFavourite">
                  <font-awesome-icon v-if="!product.is_favorite" icon="fa-regular fa-heart" />
                  <font-awesome-icon v-if="product.is_favorite" icon="fa-solid fa-heart" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="position-relative">
            <div class="btons-prev-next">
              <button @click="prevImage" class="next-button">
                <font-awesome-icon icon="fa-solid fa-angle-right" />
              </button>
              <button @click="nextImage" class="prev-button">
                <font-awesome-icon icon="fa-solid fa-angle-left" />
              </button>
            </div>


            <Galleria
             v-model:activeIndex="activeIndex"
             :value="images" 
             :responsiveOptions="responsiveOptions"
             :numVisible="5" 
             containerStyle="max-width: 640px"
            :circular="true" :autoPlay="false" 
            :transitionInterval="3000"
            >
            <template #item="{ item }">
                <span class="rival-Sallery">% {{ product.discount }}</span>
                <Image :src="item.image" :alt="item.alt" class="fancyImg" preview style="width: 100%; display: block; cursor: pointer;" />
              </template>
            <template #thumbnail="{ item }">
              <img loading="lazy" :src="item.image" :alt="item.alt" style="display: block" />
            </template>
            </Galleria>





<!-- 
            <Galleria
              :value="images"
              :responsiveOptions="responsiveOptions"
              :numVisible="5"
              :circular="true"
              containerStyle="max-width: 640px"
              :activeIndex="activeIndex"
              @update:activeIndex="onActiveIndexChange"
            >
              <template #item="{ item }">
                <div class="gallery-inner">
                  <span class="rival-Sallery">10%</span>
                  <img
                    :src="item.image"
                    :alt="item.alt"
                    style="width: 100%; display: block"
                  />
                </div>
              </template>
              <template #thumbnail="{ item }">
                <img
                  :src="item.thumbnail"
                  :alt="item.alt"
                  style="width: 100%; display: block"
                />
              </template>
            </Galleria> -->
          </div>
          <div class="btons-product">
            <button @click="popup = true" class="button-all">تاجير</button>
            <button class="button-all button-bord">
              <font-awesome-icon icon="fa-solid fa-share-from-square" /> مشاركه
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section>
    <div class="container">
      <div class="products-cards">
        <h5>أكملي إطلالتك ب:</h5>
        <div class="row">
          <AppGallery :listGallery="products" />
        </div>
        <div class="row">
          <AppGallery :listGallery="listGalleryitem2" />
        </div>
      </div>
    </div>
  </section>
  <div class="popup" v-if="popup" @click="popup = false">
    <div class="popup-content">
      <div class="popup-box">
        <div class="popup-item popup-item-2" @click.stop="console.log(1)">
          <font-awesome-icon
            @click="popup = false"
            class="exit-popup"
            icon="fa-solid fa-x"
          />
          <img src="../../assets/images/important.png" alt="" />
          <h4>تعليمات مهمة</h4>
          <p class="mt-4 active-white">
            لوريم ايبسوم هو نموذج افتراضي يوضع في التصاميم لتعرض على العميل
            ليتصور طريقه وضع لوريم ايبسوم هو نموذج افتراضي يوضع في التصاميم
            لتعرض على العميل ليتصور طريقه وضع
          </p>
          <label for="" class="w-100 mt-3">
            <input
              class="input-radio radio-chekd"
              type="checkbox"
              id="radio-checkd"
              name="radio-checkd"
              v-model="notify"
            />
            <label for="radio-checkd" class="label-check">
              <div class="box-checkd">
                <font-awesome-icon icon="fa-solid fa-check" />
              </div>
              <p>ذكرني بميعاد التاجير قبل أيام</p>
            </label>
          </label>

          <button @click="toAppointment" class="button-all"
            >موافق</button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>


const toast = useToast();
import { useUsersStoreauth } from '~/stores/useAuth';
const usersStore = useUsersStoreauth();
const {dataAuth} = storeToRefs(usersStore)
const token = dataAuth.value?.token;







// const localePath = useLocalePath();
const products = ref([]);
const listGalleryitem2 = ref([]);
const size = ref(2)
const number = ref(2);
const notify = ref(0)
const popup = ref(false);
const { baseURL } = useAPI();

// import rentalImage from "@/assets/images/Rectangle 25928.png";

function clickk() {
  console.log(size.value); // Logs the value of the checked radio button
}




// const numberPruduct = useCookie("numberPruduct");
// const sizeId = useCookie("sizeId")


function minus() {
  if (number.value > 0) {
    number.value--;
  }
}

const product = ref("");
const globalStore = useGlobalStore();


  try {
    const { data } = await useFetch(`product-details/${useRoute().params.id}`, {
      responseType: "json",
      method: "post",
      baseURL: baseURL,
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: {
        "mac_address": "a7j3i78",
      },
    })


    console.log(data.value)
    product.value = data.value.data.product.product;
    console.log(product.value, "products");
    products.value = data.value.data.complete_your_look_with;
    listGalleryitem2.value = data.value.data.we_choose_you;
    
    // numberPruduct.value = useRoute().params.id;
  } catch(error) {
    console.log(error)
  }

async function submitFavourite() {
  try {
    const { data } = await useFetch("product-favourite-action", {
      responseType: "json",
      method: "post",
      baseURL: baseURL,
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: {
        product_id: useRoute().params.id,
        "mac_address": "a7j3i78",
      }
      
    })
    if(data.value.key === "success") {
      globalStore.showToast('success', data.value.msg , "", 2000)

      if(data.value.msg === "تم الاضافه الي المفضله بنجاح") {
        product.value.is_favorite = true
      }else {
        product.value.is_favorite = false
      }
      console.log(data.value)
    }else {
      globalStore.showToast('error', data.value.msg , "", 2000)
    }
  }catch(error) {
    console.log(error)
  }
}

// import rentalImage from "@/assets/images/Rectangle 25928.png";
const images = ref(product.value.colors);
const activeIndex = ref(0);

const responsiveOptions = ref([
    {
        breakpoint: '1300px',
        numVisible: 4
    },
    {
        breakpoint: '575px',
        numVisible: 1
    }
]);






const notifyValue = computed(() => (notify.value ? 1 : 0));

const router = useRouter();
import { useUsersPruduct } from '#build/imports';
const usePruduct = useUsersPruduct()
function toAppointment() {
  usePruduct.cart = {
    sizeid: size.value,
    numberPruduct: useRoute().params.id,
    quantity: number.value,
    notify: notifyValue.value,
  }
  router.push("/products/appointment")
}







const prevImage = () => {
  activeIndex.value =
    (activeIndex.value - 1 + images.value.length) % images.value.length;
};

// Next Image
const nextImage = () => {
  activeIndex.value = (activeIndex.value + 1) % images.value.length;
};

</script>
<style scoped>
/* Add custom styling for the fancy image preview */
.fancyImg {
  margin-top: 1rem;
  max-width: 100%;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}
</style>