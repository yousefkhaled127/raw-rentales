<template>
  <section class="section-all">
    <div class="container">
      <h5 class="text-center">المحفظه</h5>
      <div class="contact-box contact-wallet">
        <h5 class="mt-4">رصيدك : {{ wallet.available_balance }} {{ wallet.currency }}</h5>
        <img class="img-wallet" src="../../assets/images/wallet 1.png" alt="" />
      </div>
      <div class="mt-5 content-center">
        <button @click="popup = true" class="button-all">شحن الرصيد</button>
      </div>
    </div>
  </section>

  <div class="popup" v-if="popup">
    <div class="popup-content" @click="popup = false">
      <div class="popup-box" @click.stop="console.log(`test`)">
        <form @submit.prevent="chargeWallet">
          <div class="d-flex gap-3 flex-wrap">
            <div class="payment_brands" v-for="payment in payment_brands" :key="payment_brands">
              <input @input="selectPayment(payment.id)" v-model="brand" :value="payment.id" :id="payment.id" class="payment-radio" name="payment_brands" hidden type="radio" />
              <label class="m-0" :for="payment.id">
                <img class="payment-img" :src="payment.image" alt="">
                <span>{{ payment.name }}</span>
              </label>
            </div>
            <div v-if="formGroup" class="form-group w-100">
              <label>قيمة الشحن</label>
              <input v-model="amount" type="number" class="input-all" />
              <div class="d-flex gap-3 mt-4">
                <button :disabled="!amount" type="submit" class="button-all w-100">
                 شحن الرصيد
              </button>
              <button
                @click="popup = false"
                class="button-all button-bord w-100"
              >
                رجوع
              </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
const wallet = ref("");
const tokenCookie = useCookie("token")
const walletNew = async () => {
  try {
  const { data } = await useFetch("show-wallet", {
    responseType: "json",
    method: "get",
    baseURL: "https://backend.rawrentals.org/api/",
    headers: {
      Authorization: `Bearer ${tokenCookie.value}`, // Ensure correct token format
    },
  })

  
  wallet.value = data.value.data
}catch(error) {
  console.log(error)
}
}
walletNew()
const payment_brands = ref([])
try {
  const { data } = await useFetch("payment-brands", {
    responseType: "json",
    method: "get",
    baseURL: "https://backend.rawrentals.org/api/",
    headers: {
      Authorization: `Bearer ${tokenCookie.value}`, // Ensure correct token format
    },
  })
  
  payment_brands.value = data.value.data.payment_brands;
  console.log(data.value, "asdsda")
}catch(error) {
  console.log(error)
}


const amount = ref()
const brand = ref();
const formGroup = ref(false);
const popup = ref(false);
const { baseURL } = useAPI();
function selectPayment(paymentId) {
  // Set the selected payment brand
  brand.value = paymentId;

  // Show the form group if a payment is selected
  formGroup.value = !!paymentId;
}
async function chargeWallet() {
  try {
    const { data } = await useFetch("charge-wallet", {
    responseType: "json",
    method: "post",
    baseURL: baseURL,
    headers: {
      Authorization: `Bearer ${tokenCookie.value}`, // Ensure correct token format
    },
    body: {
      amount: amount.value,
      brand: brand.value,
    }
  })

  if(data.value.key === "success") {
    walletNew()
    popup.value = false
  }
  console.log(data.value)
  console.log(data.value.msg)
  } catch (error) {

  }
}

// function RechargeBalance() {
//   popup.value = false
//   walletNew()
// }
</script>
