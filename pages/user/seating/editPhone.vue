<template>
  <section class="section-all mt-0">
    <div class="container">
      <h5 class="text-center">تعديل رقم الجوال</h5>
      <div class="contact-box contact-profile">
        <h5 class="mb-3 active-white">
          أدخل رقم الجوال الحالي ليصلك كود تفعيل
        </h5>
        <form @submit.prevent="editPhone">
          <div class="content-input">
            <label class="label-all" for="">كلمه المرور</label>
            <Password
              class="input-all"
              placeholder="ادخل كلم المرور"
              v-model="password"
              toggleMask
              :feedback="false"
            />
            <span v-if="errors.password" class="valid-eror">{{ errors.password }}</span>
          </div>
          <div class="content-input">
            <label class="label-all" for="">رقم الجوال الجديد</label>
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
            <span v-if="errors.country_code" class="valid-eror">{{ errors.country_code }}</span>
          </div>
          <div class="mt-5 content-center">
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
</template>

<script setup>

import { useUsersStoreauth } from "~/stores/useAuth";
const usersStore = useUsersStoreauth();

const looding = ref(false);
const phone = ref("");
const password = ref("");
const token = ref("");
const router = useRouter();
const globalStore = useGlobalStore();
const country_code = ref("");
const { baseURL } = useAPI();

// Reactive errors object
const errors = reactive({
  phone: "",
  password: "",
  country_code: "",
});

// Validation rules
const validationRules = {
  phone: (value) => (value ? "" : "يرجى إدخال رقم الجوال."),
  password: (value) => (value ? "" : "يرجى إدخال كلمة المرور."),
  country_code: (value) => (value ? "" : "يرجى اختيار رمز الدولة."),
};

onMounted(async () => {
  token.value = usersStore.dataAuth.token;
});

// Watchers for real-time validation
watch(
  () => phone.value,
  (newValue) => {
    errors.phone = validationRules.phone(newValue);
  }
);

watch(
  () => password.value,
  (newValue) => {
    errors.password = validationRules.password(newValue);
  }
);

watch(
  () => country_code.value,
  (newValue) => {
    errors.country_code = validationRules.country_code(newValue);
  }
);

async function editPhone() {
  // Trigger validations before submission
  errors.phone = validationRules.phone(phone.value);
  errors.password = validationRules.password(password.value);
  errors.country_code = validationRules.country_code(country_code.value);

  // Check if there are any errors
  if (Object.values(errors).some((error) => error)) {
    return; // Stop form submission if errors exist
  }

  try {
    looding.value = true;
    const { data, status } = await useFetch("change-phone-send-code", {
      responseType: "json",
      method: "POST",
      baseURL: baseURL,
      headers: {
        Authorization: `Bearer ${token.value}`, // Include token in Authorization header
      },
      body: {
        password: password.value,
        phone: phone.value,
        country_code: country_code.value,
      },
    });

    looding.value = false;

    if (data.value.key === "success") {
      globalStore.showToast("success", data.value.msg, "", 2000);
      router.push("/user/seating/code");
      usersStore.dataAuth.phone = phone.value;
    } else {
      globalStore.showToast("error", data.value.msg, "", 2000);
    }
  } catch (error) {
    console.log(error);
  }
}

// Function to update the country code
const getCountryCode = (code) => {
  country_code.value = code;
};
</script>