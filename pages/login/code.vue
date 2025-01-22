<template>
  <section>
    <div class="login-LangSwitchar">
        <LangSwitchar />
      </div>
    <div class="container">
      <div class="row align-items-center">
        <div class="col-lg-6">
          <h4 class="text-center">كود التحقق</h4>
          <p class="mt-5 mb-5 text-center">
            برجاء إدخال رقم الجوال ليصلك كود تحقق
          </p>
          <form @submit.prevent="activate()">
            <div class="content-input content-center">
              <InputOtp @input="blurotp" v-model="otpValue" integerOnly :length="6" />
            </div>
            <p class="valid-eror text-center mt-0">{{ otpvalid }}</p>
            <div class="content-column mt-3">
              <button type="submit" class="button-all">
                <p v-if="!looding">تاكيد</p>
                <ProgressSpinner v-if="looding" class="spinner" strokeWidth="8" fill="transparent"
                animationDuration=".5s" aria-label="Custom ProgressSpinner" />
              </button>
            </div>
          </form>
          <div class="mt-1 content-center">
            <button class="font-small" @click="resendCode()">
              <span class="active-white me-1">لم تستلم الكود بعد؟</span>
              <span class="active-color text-decoration-underline">
                ارسل مره ثانيه</span
              >
            </button>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="box-login-images">
            <img
              class="img-login"
              src="../../assets/images/Rectangle 1.png"
              alt=""
            />
            <img
              class="login-logo"
              src="../../assets/images/raw rentals 1.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
definePageMeta({
  layout: false,
});
const router = useRouter();
const otpValue = ref(null);
import { useUsersStoreauth } from '~/stores/useAuth';
const usersStore = useUsersStoreauth();
const fetchedData = ref(null);
fetchedData.value = await usersStore.fetchAuth();
const looding = ref(false);
const globalStore = useGlobalStore();
const { baseURL } = useAPI();



// resend-code 
async function resendCode() {
  try {
    if (!usersStore.mainusersStore.phone || !usersStore.mainusersStore.country_code) {
      globalStore.showToast('success', "رقم الهاتف ورمز الدولة غير موجودين. يرجى التسجيل أولاً" , "", 2000)
      return;
    }
    
    const { data } = await useFetch(`resend-code?phone=${usersStore.mainusersStore.phone}&country_code=${usersStore.dataAuth.country_code}`, {
      responseType: "json",
      method: "get", // Ensure the API matches
      baseURL: baseURL,
    });


    // console.log(usersStore.value.phone)


    globalStore.showToast('success', data.value.msg , "", 2000)

  } catch (error) {
    console.error("Error while resending code:", error);
    globalStore.showToast('error', data.value.msg , "", 2000)
  }
}

// activate 
const otpvalid = ref("");

const tokenCookie = useCookie("token")
function blurotp() {
  if(!otpValue.value == "") {
    otpvalid.value = "";
  } else {
    otpvalid.value = "الكود مطلوب";
  }
}
async function activate() {
  try {
    looding.value = true;
    if (!otpValue.value || otpValue.value.length !== 6) {
      looding.value = false;
      otpvalid.value = "الكود مطلوب";
      return;
    }

    if (!otpValue.value || !usersStore.mainusersStore.phone || !usersStore.mainusersStore.country_code) {
      globalStore.showToast('error', "يرجى إدخال الكود ورقم الهاتف ورمز الدولة." , "", 2000)
      return;
    }
    const { data } = await useFetch("activate", {
      responseType: "json",
      method: "post", // Ensure the API matches
      baseURL: baseURL,
      body: {
        code: otpValue.value,
        phone: usersStore.mainusersStore.phone,
        device_id: 1,
        device_type: "android",
        country_code: usersStore.mainusersStore.country_code,
        mac_address: "123456789",
      },
    })

    usersStore.dataAuth = data.value.data
    tokenCookie.value = usersStore.dataAuth.token
    
    if(data.value.key == "success") {
      globalStore.showToast('success', data.value.msg , "", 2000)
      looding.value = false;
    } else {
      globalStore.showToast('error', data.value.msg , "", 2000)
      looding.value = false;
    }



    router.push("/");

  } catch (error) {
    console.error("Error while activating:", error);
    globalStore.showToast('success', "حدث خطأ أثناء التفعيل.", "", 2000)

  }
}
</script>
