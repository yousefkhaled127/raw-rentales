<template>
  <section class="section-all mt-0">
    <div class="container">
      <h5 class="text-center">تعديل رقم الجوال</h5>
      <div class="contact-box contact-profile">
        <h5 class="mb-3 active-white text-center">
          أدخل رقم الجوال الحالي ليصلك كود تفعيل
        </h5>
        <form @submit.prevent="sendCode">
          <div class="content-input content-center mt-5">
            <InputOtp v-model="code" integerOnly :length="6" />
          </div>
          <p v-if="errors.code" class="valid-eror text-center mt-0">{{ errors.code }}</p>
          <div class="mt-3 content-center">
            <button type="submit" class="button-all"
            >
            <p v-if="!looding">ارسال</p>
            <ProgressSpinner v-if="looding" class="spinner" strokeWidth="8" fill="transparent"
            animationDuration=".5s" aria-label="Custom ProgressSpinner" />
            </button
          >
          </div>
        </form>
      </div>
   
    </div>
  </section>
  <div class="popup" v-if="popup">
    <div class="popup-content" @click="popup = false">
      <div class="popup-box" @click.stop="console.log(1)">
        <img class="img-sucess" src="../../../assets/images/sucess.png" />
        <h5 class="mb-4">تم تغيير رقم الجوال بنجاح</h5>
        <nuxt-link :to="localePath('/user/seating')" class="button-all"
          >رجوع</nuxt-link
        >
      </div>
    </div>
  </div>
</template>

<script setup>

import { useUsersStoreauth } from "~/stores/useAuth";
const usersStore = useUsersStoreauth();
const localePath = useLocalePath();
const router = useRouter();

const code = ref(""); // OTP code
const popup = ref(false);
const token = ref();
const phone = ref();
const country_code = ref();
const looding = ref(false);
const globalStore = useGlobalStore();
const { baseURL } = useAPI();

// Reactive errors object
const errors = reactive({
  code: "",
});

// Validation rules
const validationRules = {
  code: (value) => {
    if (!value) return "يرجى إدخال كود التفعيل.";
    if (value.length !== 6 || isNaN(value)) return "يرجى إدخال كود صحيح مكون من 6 أرقام.";
    return "";
  },
};

// On mounted, set user data
onMounted(async () => {
  token.value = usersStore.dataAuth.token;
  country_code.value = usersStore.dataAuth.country_code;
  phone.value = usersStore.dataAuth.phone;
  console.log(token.value, country_code.value);
});

// Watch for real-time validation on OTP code
watch(
  () => code.value,
  (newValue) => {
    errors.code = validationRules.code(newValue);
  }
);

async function sendCode() {
  // Validate before submission
  errors.code = validationRules.code(code.value);

  if (errors.code) {
    return; // Stop submission if validation fails
  }

  try {
    looding.value = true;

    const { data, status } = await useFetch("change-phone-check-code", {
      responseType: "json",
      method: "POST",
      baseURL: baseURL,
      headers: {
        Authorization: `Bearer ${token.value}`, // Include the token in Authorization header
      },
      body: {
        code: code.value,
        country_code: country_code.value,
        phone: phone.value,
      },
    });

    looding.value = false;

    if (data.value.key === "success") {
      globalStore.showToast("success", data.value.msg, "", 2000);
      router.push("/user/profile");
    } else {
      globalStore.showToast("error", data.value.msg, "", 2000);
    }
  } catch (error) {
    console.log(error);
    looding.value = false;
  }
}
</script>
