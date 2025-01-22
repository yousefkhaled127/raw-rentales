<template>
  <section class="section-all mt-0">
    <div v-if="!basketArray.length" class="container">
      <div  class="not-favourites">
      <img class="img-not-favourites" src="../assets/images/no-cart.svg" alt="">
      <h4 class="mt-3">السلة فارغة</h4>
      <h6 class="mt-3 active-white">لا يوجد منتجات في السلة حاليا اضف بعض المنتجات وحاول مرة اخرى</h6>
    </div>
    </div>
    <div class="container" v-if="basketArray.length > 0">
      <div class="row">
        <div class="col-lg-8">
          <div
            class="basket-content"
            v-for="basket in basketArray"
            :key="basket.id"
          >
            <div class="row">
              <div class="col-lg-4 col-md-4">
                <img
                  class="basket-img"
                  :src="basket.image"
                  alt=""
                />
              </div>
              <div class="col-lg-8 col-md-8">
                <h5>{{ basket.name }}</h5>
                <p class="active-white mt-3">{{ basket.description }}</p>
                <div class="mt-3 d-flex gap-3 align-items-center">
                  <h6>المقاس</h6>
                  <span class="item-measuring">{{ basket.size }}</span>
                </div>
                <div
                  class="d-flex justify-content-between align-items-center mt-5"
                >
                  <div class="d-flex gap-3 align-items-center">
                    <button @click="plusQuantity(basket)" class="box-size">
                      <font-awesome-icon icon="fa-solid fa-plus" />
                    </button>
                    <h5>{{ basket.quantity }}</h5>
                    <button @click="minusQuantity(basket)" class="box-size">
                      <font-awesome-icon icon="fa-solid fa-minus" />
                    </button>
                  </div>
                  <button class="button-all button-bord" @click="deleteCart(basket.id)">
                    <font-awesome-icon icon="fa-solid fa-trash-can" />
                    حذف من السلة
                  </button>
                </div>
              </div>
            </div>
            <div class="mt-2 ps-4">
              <h5 class="mb-2">السعر:</h5>
              <div
                class="d-flex justify-content-between align-items-center flex-wrap gap-3"
              >
                <h4>{{ basket.price }}</h4>
                <div class="d-flex gap-1">
                  <h6>مدة الايجار:</h6>
                  <h6>{{ basket.duration }}</h6>
                </div>
                <p class="color-red">{{ basket.full_date }}</p>
              </div>
            </div>
          </div>
        
        </div>
        <div class="col-lg-4">
          <div class="basket-slider">
            <h6 class="title-slider">ملخص الطلب</h6>
            <form @submit.prevent="createOrder" class="mt-4">
              <div>
                <label>كوبون الخصم</label>
                <div class="position-relative basket-box-input">
                  <input
                    class="input-all"
                    placeholder="أدخل كوبون الخصم"
                    type="text"
                  />
                  <button class="button-all button-basket-submit">تطبيق</button>
                </div>
              </div>
              <div class="mt-4 border-item">
                <h6>طريقة الدفع</h6>
                <div>
                  <label class="mt-3 mb-2" for="">
                    <input
                      id="lowest-price"
                      class="input-radio radio-sidbar"
                      type="radio"
                      name="input-radio"
                      v-model="paymentMethod"
                    />
                    <label for="lowest-price" class="label-radio-sidbar mb-0">
                      <div class="radio-box-item">
                          <div class="p-radiobutton-icon"></div>
                        </div>
                      <p>الدفع الالكتروني</p>
                    </label>
                  </label>
                </div>
                <div>
                  <label for="" class="">
                    <input
                      id="highest-price"
                      class="input-radio radio-sidbar"
                      type="radio"
                      name="input-radio"
                      v-model="paymentMethod"
                    />
                    <label for="highest-price" class="label-radio-sidbar mb-0">
                      <div class="radio-box-item">
                          <div class="p-radiobutton-icon"></div>
                        </div>
                      <p>المحفظه</p>
                    </label>
                  </label>
                </div>
              </div>
              <div class="mt-4 border-item">
                <div class="d-flex justify-content-between mb-3">
                  <h6>سعر المنتجات</h6>
                  <h6>{{ products_price }} ر.س</h6>
                </div>
                <div class="d-flex justify-content-between mb-3">
                  <h6>سعر التأمين</h6>
                  <h6>{{ admin_commission }} ر.س</h6>
                </div>
                <div class="d-flex justify-content-between">
                  <h6>قيمة الضريبة</h6>
                  <h6>{{ products_refundable_value }} ر.س</h6>
                </div>
              </div>

              <div class="content-input mt-4">
                <label for="">عنوان التوصيل</label>
                <!-- <Select
                  v-model="selectedCity"
                  :options="cities"
                  optionLabel="name"
                  placeholder="حدد المدينه"
                  class="w-full md:w-56 input-all select-city"
                /> -->
                <SelectCities v-model="selectedCity" />

              </div>

              <div class="content-input mt-4">
                <label for="">اضف ملاحظاتك</label>
                <textarea
                  class="textarea-all"
                  placeholder="أدخل ملاحظاتك"
                ></textarea>
              </div>
              <div class="content-center">
                <button type="submit" class="button-all">استكمال الطلب</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const selectedCity = ref();
const basketArray = ref([]);
const cockie = useCookie("mac_addressGlobal");
import { useUsersStoreauth } from '~/stores/useAuth';
const usersStore = useUsersStoreauth();
const {dataAuth} = storeToRefs(usersStore)
const token = dataAuth.value?.token;

const { baseURL } = useAPI();

const functionCart = async ()=> {
try {
  const { data } = await useFetch("get-cart-items", {
      responseType: "json",
      method: "post",
      baseURL: baseURL,
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
        },
      body: {
        "mac_address": cockie.value,
      }
})

  basketArray.value = data.value.data.cart;
  console.log(basketArray.value , "basketArray")
} catch(error) {
  console.log(error);
}
}

// if(usersStore.dataAuth !== null) {
  functionCart();
// }


async function deleteCart(id) {
  try {
    const { data } = await useFetch(`delete-cart-item/${id}`, {
      responseType: "json",
      method: "post",
      baseURL: "https://backend.rawrentals.org/api/",
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: {
        "mac_address": cockie.value,
      }
    })

    if(data.value.key == "success") {
      functionCart()
      globalStore.showToast('success', data.value.msg , "", 2000)
    }
    console.log(data.value);
  } catch(error) {
    console.log(error);
  }
}




const admin_commission = ref("");
const products_price = ref("");
const products_refundable_value = ref("");
 try {
   const { data } = await useFetch("cart-summary", {
       responseType: "json",
       method: "post",
       baseURL: "https://backend.rawrentals.org/api/",
        //  headers: {
        //     Authorization: `Bearer ${dataAuth.value.token}`, // Include the token in the Authorization header
        //   },
       body: {
        mac_address: cockie.value,
      }
   })

   if (data.value.key === "success") {
    console.log(data.value)
    admin_commission.value = data.value.data.admin_commission;
    products_price.value = data.value.data.products_price;
    products_refundable_value.value = data.value.data.products_refundable_value;
   }
   
 }catch(error) {
  console.log(error)
}


  function plusQuantity(basket) {
    basket.quantity++
  }
function minusQuantity(basket) {
  if (basket.quantity > 0) {
    basket.quantity--;
  }
}



////// createOrder ///// 


// const token = ref(null);

const route = useRouter()
const tokenCookie = useCookie("token");

const paymentMethod = ref(null)
console.log(tokenCookie.value)
const globalStore = useGlobalStore();

// console.log(usersStore.dataAuth.token)
async function createOrder() {

  try {
    const { data } = await useFetch("create-order", {
    responseType: "json",
    method: "post",
    baseURL: "https://backend.rawrentals.org/api/",
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
        },
    body: {
      address_id: 64,
      pay_type: paymentMethod.value === "on" ? 0 : 0,
      "mac_address": cockie.value,
    }
  })

  if(data.value.key == "success") {
      globalStore.showToast('success', data.value.msg , "", 2000)
      route.push("/")
    } else {
      globalStore.showToast('error', data.value.msg , "", 2000)
    }
  console.log(data.value, "data")

  } catch(error) {
    console.log(error);
  }
}
</script>
