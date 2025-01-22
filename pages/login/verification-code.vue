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
                برجاء إدخال كود التحقق المرسل إليك عبر الجوال
            </p>
            <form @submit.prevent="forgetPasswordCode()">
              <div class="content-input content-center">
                <InputOtp @input="blurotp" v-model="otpValue" integerOnly :length="6" />
              </div>
              <p v-if="errors.otp" class="valid-eror text-center mt-0">{{ errors.otp }}</p>
              <div class="content-column mt-3">
                <button type="submit" class="button-all">
                  <p v-if="!looding">تاكيد</p>
                  <ProgressSpinner v-if="looding" class="spinner" strokeWidth="8" fill="transparent"
                  animationDuration=".5s" aria-label="Custom ProgressSpinner" />
                </button>
              </div>
            </form>
            <div class="mt-1 content-center">
              <button class="font-small">
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
const otpValue = ref("");
const looding = ref(false);
const errors = reactive({
  otp: "",
});

import InputOtp from "primevue/inputotp";
import { useUsersStoreauth } from "~/stores/useAuth";
const usersStore = useUsersStoreauth();
const globalStore = useGlobalStore();
const { baseURL } = useAPI();

// Validation function
const validateOtp = (value) => {
  if (!value) return "يرجى إدخال رمز التحقق.";
  // if (!/^\d{6}$/.test(value)) return "يجب أن يتكون رمز التحقق من 6 أرقام.";
  return "";
};

function blurotp() {
  if(!otpValue.value == "") {
    errors.otp = "";
  } else {
    errors.otp = "يرجى إدخال رمز التحقق."
  }
}

async function forgetPasswordCode() {
  // Validate the OTP code before sending the request
  errors.otp = validateOtp(otpValue.value);
  if (errors.otp) {
    return; // Stop the process if validation fails
  }

  try {
    looding.value = true;

    const { data, status } = await useFetch("forget-password-check-code", {
      responseType: "json",
      method: "post", // Ensure the API matches
      baseURL: baseURL,
      body: {
        code: otpValue.value,
        phone: usersStore.mainusersStore.phone,
        country_code: usersStore.mainusersStore.country_code,
      },
    });

    looding.value = false;

    if (data.value.key === "success") {
      globalStore.showToast("success", data.value.msg, "", 2000);
      router.push("/login/password");
    } else {
      globalStore.showToast("error", data.value.msg, "", 2000);
    }
  } catch (error) {
    console.error("Error:", error);
    globalStore.showToast("error", "حدث خطأ أثناء التفعيل.", "", 2000);
    looding.value = false;
  }
}
  </script>
  