<template>
  <section class="section-all mt-0">
    <div class="container">
      <h4 class="text-center">تفاصيل الطلب</h4>
      <div class="show-order">
        <div class="order-head">
            <p>قيد التجهيز</p>
            <img class="img-frame" src="../../assets/images/Frame.png" alt="" />
            <p>جارئ التجهيز</p>
            <img class="img-frame" src="../../assets/images/Frame.png" alt="" />
            <p>تم الشحن</p>
            <img class="img-frame" src="../../assets/images/Frame.png" alt="" />
            <p class="active-white">تم التسليم</p>
            <img class="img-frame" src="../../assets/images/Frame.png" alt="" />
            <p class="active-white">في الطريق لاسترجاع المنتج</p>
          </div>

          <div class="order-parent">
          <div>
            <div class="order-item">
              <h5>رقم الطلب:</h5>
              <h6 class="active-white">{{ orderDetals.order_num }}</h6>
            </div>
            <div class="order-item">
              <h5>تاريخ الطلب:</h5>
              <h6 class="active-white">{{ orderDetals.day }} {{ orderDetals.month }} {{ orderDetals.year }}</h6>
            </div>
            <div class="order-item">
              <h5>وقت الطلب:</h5>
              <h6 class="active-white">{{ orderDetals.order_time }}</h6>
            </div>
            <div class="order-item">
              <h5>حاله الطلب</h5>
              <h6 class="active-white">{{ orderDetals.status_text }}</h6>
            </div>
            <div class="order-item">
              <h5>عددالمنتجات:</h5>
              <h6 class="active-white">{{ orderDetals.total_products }}</h6>
            </div>
            <div class="order-item">
              <h5>سعر المنتجات:</h5>
              <h6 class="active-white">{{ orderDetals.products_price }}</h6>
            </div>
            <div class="order-item">
              <h5>قيمة التوصيل:</h5>
              <h6 class="active-white">{{ orderDetals.delivery_price }}</h6>
            </div>
            <div class="order-item">
              <h5>قيمة الخصم:</h5>
              <h6 class="active-white">{{ orderDetals.total_discount }}</h6>
            </div>
            <div class="order-item">
              <h5>قيمة الضريبة:</h5>
              <h6 class="active-white">{{ orderDetals.vat_amount }}</h6>
            </div>
            <div class="order-item">
              <h5>سعر التأمين:</h5>
              <h6 class="active-white">{{ orderDetals.refundable_value }}</h6>
            </div>
            <div class="order-item">
              <div class="order-item mt-0">
                <h5>السعر الاجمالي:</h5>
                <h6 class="active-white">{{ orderDetals.final_price }}</h6>
              </div>
            </div>
          </div>
          <!-- <div v-if="!btonOrder" class="btons-inner">
            <button @click="popup4 = true" class="button-all mb-3">
              تقييم
            </button>
            <button @click="popup2 = true" class="button-all button-bord">
              الفاتوره
            </button>
          </div> -->
          <div>
            <!-- <button
              v-if="!cancelOrder"
              @click="popup = true"
              class="button-Report"
            >
              <img class="img-report" src="../../assets/images/report.png" />
              ابلاغ
            </button> -->
            <button
              @click="popupCanselOrder = true"
              class="button-Report"
            >
              الغاء الطلب
            </button>
          </div>
        </div>
        </div>
    </div>
    <section>
    <div class="container">
      <h3 class="mb-4">تفاصيل المنتج</h3>
      <div
            class="basket-content"
            v-for="product in products"
            :key="product.id"
          >
            <div class="row">
              <div class="col-lg-2 col-md-4">
                <img
                  class="basket-img order-details-img"
                  :src="product.image"
                  alt=""
                />
              </div>
              <div class="col-lg-8 col-md-8">
                <h5>{{ product.name }}</h5>
                <p class="active-white mt-4">{{ product.description }}</p>
                <div class="mt-4 d-flex gap-3 align-items-center">
                  <h6>المقاس</h6>
                  <span class="item-measuring">{{ product.size }}</span>
                </div>
                <h5 class="mt-4">الكميه {{ product.quantity }}</h5>
              </div>
            </div>
            <div class="mt-2 ps-4">
              <h5 class="mb-2">السعر:</h5>
              <div
                class="d-flex align-items-center flex-wrap gap-5"
              >
                <h4>{{ product.price }}</h4>
                <div class="d-flex gap-3 align-items-center flex-wrap">
                  <div class="d-flex gap-1">
                  <h6>مدة الايجار:</h6>
                  <h6>{{ product.duration }}</h6>
                </div>
                <p class="color-red">{{ product.full_date }}</p>
                </div>
              </div>
            </div>
          </div>
    </div>
  </section>
  </section>


  <div class="popup" v-show="popupCanselOrder" @click="popupCanselOrder = false">
    <div class="popup-content">
      <div class="popup-box" @click.stop="console.log(1)">
        <div class="popup-item popup-item-2">
          <h3>الغاء الطلب</h3>
          <form @submit.prevent="canselOrder" action="" class="form-popup">
            <label><h6 class="active-white">ما سبب إلغاء الطلب؟</h6></label>
            <textarea
              @input="refuseblur"
              v-model="refuse_reason"
              placeholder="اكتب السبب"
              class="textarea-all"
            ></textarea>
            <span class="reason-reqird" v-if="show_text">اكتب السبب</span>
            <div class="btons-popup">
              <button class="button-all button-Report w-100">
                الغاء الطلب
              </button>
              <button
                type="submit"
                @click="popupCanselOrder = false"
                class="button-all button-bord w-100"
              >
                رجوع
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// const route = useRoute();

const popupCanselOrder = ref(false);
const refuse_reason = ref("")
const tokenCookie = useCookie("token");
const orderDetals = ref({})
const products = ref({})
const show_text = ref(false)
const { baseURL } = useAPI();
const globalStore = useGlobalStore();

import { useUsersStoreauth } from '~/stores/useAuth';
const usersStore = useUsersStoreauth();
const {dataAuth} = storeToRefs(usersStore)
try {
  const { data } = await useFetch(`order-details/${useRoute().params.id}`, {
    responseType: "json",
    method: "get",
    baseURL: baseURL,
    headers: {
      Authorization: `Bearer ${dataAuth.value.token}`,
    },
  })

  orderDetals.value = data.value.data.order;
  products.value = data.value.data.products;
  console.log(products.value, "products")

  console.log(data.value);
} catch(error) {
  console.log(error)
}



function refuseblur() {
  if(!refuse_reason.value) {
    show_text.value = true;
  } else {
    show_text.value = false;
  }
}
async function canselOrder() {
  if(refuse_reason.value !== "") {
    show_text.value = false;
    const { data } = await useFetch("cancel-order", {
      responseType: "json",
      method: "post",
      baseURL: baseURL,
      headers: {
      Authorization: `Bearer ${tokenCookie.value}`,
    },
    body: {
      order_id: useRoute().params.id,
      refuse_reason: "dddddd",
    },
    })

    if(data.value.key == "success") {
      globalStore.showToast('success', data.value.msg , "", 2000)
      popupCanselOrder.value = false
    }else {
      globalStore.showToast('error', data.value.msg , "", 2000)
    }
    console.log(data.value)
  } else {
    show_text.value = true
  }
}

</script>
