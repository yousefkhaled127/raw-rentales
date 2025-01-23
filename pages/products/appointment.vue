<template>
  <section class="section-all section-child mt-0">
    <div class="container">
      <div class="contact-box">
        <h5 class="text-center">حجز الميعاد</h5>
        <div class="mt-5">
          <h5>اختر المدة التي تريدها وحدد بداية الأيام</h5>
          <div class="d-flex gap-3 mt-4">
            <form @submit.prevent="submitAddcart">
              <div class="d-flex gap-3 flex-wrap">
                <label :class="{ 'disabled-opacity': durationDisabled }" v-for="duration in durations"
                  :key="duration.id">
                  <input v-model="durationValue" type="radio" class="input-radio input-appointment"
                    name="input-appointment" :id="duration.id" :value="duration.id" :disabled="durationDisabled">
                  <label class="button-all button-appointment" :for="duration.id">{{ duration.day }} {{
                    duration.discrimination }}</label>
                </label>

              </div>
              <div class="mt-5 position-relative" v-if="submitForm">
                <div class="button-all data-box">
                  <img class="img-calendar" src="../../assets/images/calendar.png" alt="" />
                  اختر بدايه الايام
                </div>
                <DatePicker :minDate="new Date()" v-model="date" />
              </div>
              <button class="button-all mt-4" type="submit" v-if="submitForm">
                تاكيد
              </button>
            </form>

          </div>

        </div>
      </div>

      <div class="content-center mt-5" v-if="buttonCart">
        <nuxt-link class="button-all" :to="localePath(`/basket`)">اذهب الي السلة</nuxt-link>
      </div>
    </div>
  </section>
  <div class="popup" v-if="popup">
    <div class="popup-content">
      <div class="popup-box">
        <font-awesome-icon @click="popup = false" class="exit-popup" icon="fa-solid fa-x" />
        <h5>عذرا</h5>
        <h6 class="mt-4">المنتج غير متوفر في هذا الوقت</h6>
        <button @click="popup = false" class="button-all mt-4">موافق</button>
      </div>
    </div>
  </div>
</template>

<script setup>
const localePath = useLocalePath();
const submitForm = ref(true);
const date = ref(null);
const durations = ref("");
const popup = ref(false);
const durationValue = ref();
const buttonCart = ref(false);
const durationDisabled = ref(false);
import { useUsersStoreauth } from '~/stores/useAuth';
const usersStore = useUsersStoreauth();
const { dataAuth } = storeToRefs(usersStore)
const token = dataAuth.value?.token;
const globalStore = useGlobalStore();
const { baseURL } = useAPI();

// const products = ref("");
try {
  const { data } = await useFetch("durations", {
    responseType: "json",
    method: "get",
    baseURL: baseURL,
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  })
  durations.value = data.value.data;
  // console.log(data.value);
} catch (error) {
  console.log(error);
}



import { useUsersPruduct } from '#build/imports';
const usePruduct = useUsersPruduct()
const cockie = useCookie("mac_addressGlobal");

async function submitAddcart() {
  try {
    const { data } = await useFetch("add-cart-item", {
      responseType: "json",
      method: "post",
      baseURL: baseURL,
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: {
        product_id: usePruduct.cart.numberPruduct,
        size_id: usePruduct.cart.sizeid,
        color_id: 1,
        quantity: usePruduct.cart.quantity,
        start_date: date.value.toISOString().split('T')[0],
        duration_id: durationValue.value,
        notify: usePruduct.cart.notify,
        mac_address: cockie.value,
      }
    })


    if (data.value.key === "success") {
      globalStore.showToast('success', data.value.msg, "", 2000)
      buttonCart.value = true;
      submitForm.value = false;
      durationDisabled.value = true;
      console.log(data.value)
    } else {
      globalStore.showToast('error', data.value.msg, "", 2000)
    }
  } catch (error) {
    console.log(error)
  }

}


// function onDateSelected(selectedDate) {
//   if (
//     selectedDate.toLocaleDateString() === "12/27/2024" ||
//     selectedDate.toLocaleDateString() === "12/26/2024" ||
//     selectedDate.toLocaleDateString() === "12/25/2024"
//   ) {
//     popup.value = true;
//   }
// }
</script>
