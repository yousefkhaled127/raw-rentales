<template>
  <section>
    <div class="container">
      <div class="login-LangSwitchar">
        <LangSwitchar />
      </div>
      <div class="row align-items-center">
        <div class="col-lg-6">
          <div>
            <h4 class="text-center">تسجيل دخول</h4>
            <form @submit.prevent="submitSigin()">
              <div class="content-input">
                <label class="label-all" for="">رقم الجوال</label>
                <input
                  @input="blurphone"
                  placeholder="أدخل رقم الجوال"
                  class="input-all"
                  type="number"
                  v-model="phone"
                  valid="رقم الجوال مطلوب"
                />
                <p class="valid-eror">{{ phoneValed }}</p>
                <div class="select-number">
                  <SelectNumber  @update:model-value="getCountryCode" />
                </div>
              </div>
              <div class="content-input">
                <label class="label-all" for="">كلمه المرور</label>
                <Password
                  @input="blurpassword"
                  class="input-all"
                  placeholder="ادخل كلمه المرور"
                  v-model="password"
                  toggleMask
                  valid="كلمة المرور مطلوبة"
                  :feedback="false"
                />
                <p class="valid-eror">{{ passwordValed }}</p>
              </div>
              <div class="text-start mt-2">
                <NuxtLink class="link-forget-password" to="/login/phone"
                  >هل نسيت كلمة المرور؟</NuxtLink
                >
              </div>
              <div class="content-column mt-5">
                <button type="submit" class="button-all">
                  <p v-if="!looding">تسجيل الدخول</p>
                  <ProgressSpinner v-if="looding" class="spinner" strokeWidth="8" fill="transparent"
                  animationDuration=".5s" aria-label="Custom ProgressSpinner" />
                </button>
                <NuxtLink to="/login/newRegistration"
                  ><span class="active-white me-1">ليس لديك حساب؟</span>
                  <span class="active-color text-decoration-underline"
                    >تسجيل</span
                  ></NuxtLink
                >
                <NuxtLink to="/"
                  ><span class="active-white me-1">الدخول ك</span>
                  <span class="active-color text-decoration-underline"
                    >زائر</span
                  ></NuxtLink
                >
              </div>
            </form>
          </div>
          <div class="mt-5 content-center">
            <NuxtLink to=""
              ><span class="active-white me-1">هل تواجه مشاكل في التسجيل؟</span>
              <span class="active-color text-decoration-underline">
                تواصل معنا</span
              ></NuxtLink
            >
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
const globalStore = useGlobalStore();
const { baseURL } = useAPI();
const router = useRouter()
const phone = ref();
const password = ref();
const country_code = ref();
const looding = ref(false);
import { useUsersStoreauth } from '~/stores/useAuth';
const usersStore = useUsersStoreauth();
globalStore.functionMacaddress();
const tokenCookie = useCookie("token")
const localePath = useLocalePath();
const phoneValed = ref("")
const passwordValed = ref("");
function blurphone() {
  if(!phone.value == "") {
    phoneValed.value = "";
  }else {
    phoneValed.value = "رقم الجوال مطلوب";
  }
}
function blurpassword() {
  if(!password.value == "") {
    passwordValed.value = "";
  }else {
    passwordValed.value = "كلمة المرور مطلوبة";
  }
}
async function submitSigin() {
  if(!phone.value) {
    phoneValed.value = "رقم الجوال مطلوب";
  } else {
    phoneValed.value = "";
  }
   
  if(!password.value) {
    passwordValed.value = "كلمة المرور مطلوبة";
    return false
  }else {
    passwordValed.value = "";
  }

  try{
    looding.value = true;
    const { data , status } = await useFetch("sign-in", {
      responseType: "json",
      method: "post", // Ensure the API matches
      baseURL: baseURL,
      body: {
        phone: phone.value,
        password: password.value,
        country_code: country_code.value,
        device_id: 105,
        device_type: "android",
        mac_address: globalStore.mac_address,
      }
    })

    if(status.value === "success") {
      looding.value = false;
    }

    if (data.value.key === "success") {
      globalStore.showToast("success", data.value.msg, "", 2000);
      usersStore.dataAuth = data.value.data;
      tokenCookie.value = usersStore.dataAuth.token;
      router.push(`${localePath("/")}`);
    } else {
      looding.value = false;
      globalStore.showToast('error', data.value.msg , "", 2000)
    }
  } catch(error) {
    console.log(error)
  }
}

const getCountryCode = (code) => {
  country_code.value = code
}

</script>
