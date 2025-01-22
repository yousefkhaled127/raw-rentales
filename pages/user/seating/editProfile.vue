<template>
  <section class="section-all mt-0">
    <div class="container">
      <h5 class="text-center">تعديل الملف الشخصي</h5>
      <div class="contact-box contact-profile">
        <h5 class="mb-3 active-white">البيانات الشخصيه</h5>
        <form @submit.prevent="editProfile()">
          <div class="content-input">
            <label class="label-all" for="">الاسم</label>
            <input
              placeholder="أدخل اسمك"
              class="input-all"
              type="text"
              v-model="name"
            />
            <span v-if="errors.name" class="valid-eror">{{ errors.name }}</span>
          </div>
          <div class="content-input">
            <label class="label-all" for=""> البريد الالكتروني</label>
            <input
              placeholder="أدخل البريد الالكتروني"
              class="input-all"
              type="text"
              v-model="email"
            />
            <span v-if="errors.email" class="valid-eror">{{ errors.email }}</span>
          </div>
          <div class="content-input">
            <label class="label-all" for="">المدينه</label>
            <SelectCities v-model="selectedCity" :userCitychild="userCity" />
            <span v-if="errors.city" class="valid-eror">{{ errors.city }}</span>
          </div>
          <div class="mt-5 content-center">
            <button type="submit" class="button-all">
              <p v-if="!looding">حفظ التعديلات</p>
              <ProgressSpinner v-if="looding" class="spinner" strokeWidth="8" fill="transparent"
              animationDuration=".5s" aria-label="Custom ProgressSpinner" />
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useUsersStoreauth } from "~/stores/useAuth";
const usersStore = useUsersStoreauth();
const router = useRouter();
const token = ref();
const name = ref("");
const email = ref("");
const selectedCity = ref();
const userCity = ref();
const looding = ref(false);
const globalStore = useGlobalStore();
const { baseURL } = useAPI();

// Reactive errors object
const errors = reactive({
  name: "",
  email: "",
  city: "",
});

// Validation rules
const validationRules = {
  name: (value) => (value ? "" : "يرجى إدخال الاسم."),
  email: (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) return "يرجى إدخال البريد الإلكتروني.";
    if (!emailRegex.test(value)) return "يرجى إدخال بريد إلكتروني صالح.";
    return "";
  },
  city: (value) => (value ? "" : "يرجى اختيار المدينة."),
};

// On mounted, prefill user data
onMounted(async () => {
  token.value = usersStore.dataAuth.token;
  name.value = usersStore.dataAuth.name;
  email.value = usersStore.dataAuth.email;
  userCity.value = usersStore.dataAuth.city_id;
});

// Watchers for real-time validation
watch(
  () => name.value,
  (newValue) => {
    errors.name = validationRules.name(newValue);
  }
);

watch(
  () => email.value,
  (newValue) => {
    errors.email = validationRules.email(newValue);
  }
);

watch(
  () => selectedCity.value,
  (newValue) => {
    errors.city = validationRules.city(newValue?.id);
  }
);

async function editProfile() {
  // Trigger validations before submission
  errors.name = validationRules.name(name.value);
  errors.email = validationRules.email(email.value);
  errors.city = validationRules.city(selectedCity.value?.id);

  // Check if there are any errors
  if (Object.values(errors).some((error) => error)) {
    return; // Stop submission if validation fails
  }

  try {
    looding.value = true;
    const { data, status } = await useFetch("update-profile", {
      responseType: "json",
      method: "put",
      baseURL: baseURL,
      headers: {
        Authorization: `Bearer ${token.value}`, // Include token in Authorization header
      },
      body: {
        name: name.value,
        email: email.value,
        city_id: selectedCity.value?.id, // Include selected city ID
      },
    });

    looding.value = false;

    if (data.value.key === "success") {
      globalStore.showToast("success", data.value.msg, "", 2000);
      usersStore.dataAuth = data.value.data;
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
