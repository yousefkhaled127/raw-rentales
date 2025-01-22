<template>
  <div class="login-LangSwitchar">
    <LangSwitchar />
  </div>
  <section>
    <div class="container">
      <div class="row align-items-center">
        <div class="col-lg-6">
          <h4 class="text-center">تغيير كلمه المرور</h4>
          <p class="mt-5 mb-5 text-center">
            برجاء إدخال رقم الجوال ليصلك كود تحقق
          </p>
          <form @submit.prevent="resetPassword()">
            <div class="content-input">
              <label class="label-all" for="">كلمه المرور الجديده</label>
              <Password
                class="input-all"
                placeholder="ادخل كلم المرور"
                v-model="newPassword"
                toggleMask
                :feedback="false"
              />
              <p v-if="errors.newPassword" class="valid-eror">
                {{ errors.newPassword }}
              </p>
            </div>

            <div class="content-input">
              <label class="label-all" for="">تاكي كلمه المرور الجديده</label>
              <Password
                class="input-all"
                placeholder="ادخل كلم المرور"
                v-model="oldPassword"
                toggleMask
                :feedback="false"
              />
              <p v-if="errors.oldPassword" class="valid-eror">
                {{ errors.oldPassword }}
              </p>
            </div>

            <div class="content-column mt-5">
              <button type="submit" class="button-all">
                <p v-if="!looding">تاكيد</p>
                <ProgressSpinner
                  v-if="looding"
                  class="spinner"
                  strokeWidth="8"
                  fill="transparent"
                  animationDuration=".5s"
                  aria-label="Custom ProgressSpinner"
                />
              </button>
            </div>
          </form>
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
const newPassword = ref("");
const oldPassword = ref("");
const errors = reactive({
  newPassword: "",
  oldPassword: "",
});
const looding = ref(false);
const router = useRouter();
import { useUsersStoreauth } from "~/stores/useAuth";
const usersStore = useUsersStoreauth();
const globalStore = useGlobalStore();

// Validation function
const validatePasswords = () => {
  errors.newPassword = !newPassword.value ? "يرجى إدخال كلمة المرور الجديدة." : "";

  errors.oldPassword = !oldPassword.value ? "يرجى تأكيد كلمة المرور." : "";
};

// Watch for changes to dynamically clear errors
watch(
  () => [newPassword.value, oldPassword.value],
  () => {
    validatePasswords();
  }
);

async function resetPassword() {
  // Validate before submitting
  validatePasswords();
  if (errors.newPassword || errors.oldPassword) {
    return; // Stop if validation fails
  }

  try {
    looding.value = true;
    const { data, status } = await useFetch("reset-password", {
      responseType: "json",
      method: "post",
      baseURL: baseURL,
      body: {
        code: 123456,
        country_code: usersStore.mainusersStore.country_code,
        phone: usersStore.mainusersStore.phone,
        password: newPassword.value,
      },
    });

    looding.value = false;

    if (data.value.key === "success") {
      globalStore.showToast("success", data.value.msg, "", 2000);
      router.push("/login");
    } else {
      globalStore.showToast("error", data.value.msg, "", 2000);
    }
  } catch (error) {
    console.error("Error while resetting password:", error);
    globalStore.showToast("error", "حدث خطأ أثناء تغيير كلمة المرور.", "", 2000);
    looding.value = false;
  }
}
</script>