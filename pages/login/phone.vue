<template>
  <section>
    <div class="login-LangSwitchar">
        <LangSwitchar />
      </div>
    <div class="container">
      <div class="row align-items-center">
        <div class="col-lg-6">
          <h4 class="text-center">تغيير كلمه المرور</h4>
          <p class="mt-5 mb-5 text-center">
            برجاء إدخال رقم الجوال ليصلك كود تحقق
          </p>
          <form>
            <div class="content-input">
              <label class="label-all" for="">رقم الجوال</label>
              <input
                placeholder="أدخل رقم الجوال"
                class="input-all"
                type="number"
                v-model="phone"
              />
              <span v-if="errors.phone" class="valid-eror">{{ errors.phone }}</span>
              <div class="select-number">
                <SelectNumber @update:model-value="getCountryCode" />
            </div>
            <span
                v-if="errors.country_code"
                class="error-message"
                >{{ errors.country_code }}</span
              >
            </div>
            <div class="content-column mt-5">
              <button @click.prevent="forget_password" type="submit" class="button-all" to="code">
                <p v-if="!looding">ارسال</p>
                <ProgressSpinner v-if="looding" class="spinner" strokeWidth="8" fill="transparent"
                animationDuration=".5s" aria-label="Custom ProgressSpinner" />
              </button>
            </div>
          </form>
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

const { baseURL } = useAPI();
const router = useRouter();
const phone = ref("");
const country_code = ref("");
const looding = ref(false);
const globalStore = useGlobalStore();

// Errors object for validation
const errors = reactive({
  phone: "",
  country_code: "",
});

import { useUsersStoreauth } from "~/stores/useAuth";
const usersStore = useUsersStoreauth();

// Validation rules
const validationRules = {
  phone: (value) => {
    if (!value) return "يرجى إدخال رقم الجوال.";
    // if (!/^[0-9]{8,15}$/.test(value)) return "يرجى إدخال رقم صحيح يتكون من 8-15 رقماً.";
    return "";
  },
  country_code: (value) => {
    if (!value) return "يرجى اختيار رمز الدولة.";
    return "";
  },
};
watch(
  () => phone.value,
  (newValue) => {
    errors.phone = validationRules.phone(newValue);
  }
);

async function forget_password() {
  // Validate inputs before sending the request
  errors.phone = validationRules.phone(phone.value);
  errors.country_code = validationRules.country_code(country_code.value);

  if (errors.phone || errors.country_code) {
    return; // Stop submission if validation errors exist
  }

  try {
    looding.value = true;
    const { data, status } = await useFetch("forget-password-send-code", {
      responseType: "json",
      method: "post",
      baseURL: baseURL,
      body: {
        phone: phone.value,
        country_code: country_code.value,
      },
    });

    looding.value = false;

    if (data.value.key === "success") {
      globalStore.showToast("success", data.value.msg, "", 2000);
      usersStore.mainusersStore = {
        phone: phone.value,
        country_code: country_code.value,
      };
      router.push("/login/verification-code");
    } else {
      globalStore.showToast("error", data.value.msg, "", 2000);
    }
  } catch (error) {
    console.log(error);
    looding.value = false;
  }
}

// Handle country code selection
const getCountryCode = (code) => {
  country_code.value = code;
  errors.country_code = validationRules.country_code(code); // Revalidate when a country code is selected
};

</script>
