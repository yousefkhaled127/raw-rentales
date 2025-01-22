<template>
  <section class="section-all mt-0">
    <div class="container">
      <h5 class="text-center">تغيير كلمة المرور</h5>
      <div class="contact-box contact-profile">
        <form @submit.prevent="editPassword">
          <div class="content-input">
            <label class="label-all" for="">كلمة المرور الحالية</label>
            <Password
              class="input-all"
              placeholder="ادخل كلم المرور"
              v-model="oldPassword"
              toggleMask
              :feedback="false"
            />
            <span v-if="errors.oldPassword" class="valid-eror">{{ errors.oldPassword }}</span>
          </div>
          <div class="content-input">
            <label class="label-all" for="">كلمة المرور الجديدة</label>
            <Password
              class="input-all"
              placeholder="ادخل كلم المرور"
              v-model="newPassword"
              toggleMask
              :feedback="false"
            />
            <span v-if="errors.newPassword" class="valid-eror">{{ errors.newPassword }}</span>
          </div>
          <div class="content-input">
            <label class="label-all" for="">تكرار كلمة المرور الجديدة</label>
            <Password
              class="input-all"
              placeholder="ادخل كلم المرور"
              v-model="shurePassword"
              toggleMask
              :feedback="false"
            />
            <span v-if="errors.shurePassword" class="valid-eror">{{ errors.shurePassword }}</span>
          </div>
          <div class="mt-5 content-center">
           <button type="submit" class="button-all">حفظ</button>
          </div>
        </form>
      </div>
    
    </div>
  </section>
  <div class="popup" v-if="popup">
    <div class="popup-content" @click="popup = false">
      <div class="popup-box" @click.stop="console.log(1)">
        <img class="img-sucess" src="../../../assets/images/sucess.png" />
        <h5 class="mb-4">تم تغيير كلمة المرور بنجاح</h5>
        <nuxt-link :to="localePath('/user/seating')" class="button-all"
          >رجوع</nuxt-link
        >
      </div>
    </div>
  </div>
</template>

<script setup>

import { useUsersStoreauth } from '~/stores/useAuth';
const usersStore = useUsersStoreauth();

const localePath = useLocalePath();
const popup = ref(false);
const oldPassword = ref();
const newPassword = ref();
const shurePassword = ref();
const token = ref();
const globalStore = useGlobalStore();
const { baseURL } = useAPI();


const errors = reactive({
  oldPassword: "",
  newPassword: "",
  shurePassword: "",
});


const validationRules = {
  oldPassword: (value) => (value ? "" : "يرجى إدخال كلمة المرور الحالية."),
  newPassword: (value) => (value ? "" : "يرجى إدخال كلمة المرور الجديدة."),
  shurePassword: (value) =>
    value ? "" : "يرجى تأكيد كلمة المرور الجديدة.",
  matchPasswords: (newPassword, shurePassword) =>
    newPassword === shurePassword ? "" : "كلمة المرور الجديدة وتأكيدها غير متطابقين.",
};


// Watchers for real-time validation
watch(
  () => oldPassword.value,
  (newValue) => {
    errors.oldPassword = validationRules.oldPassword(newValue);
  }
);

watch(
  () => newPassword.value,
  (newValue) => {
    errors.newPassword = validationRules.newPassword(newValue);
    // Validate match between newPassword and shurePassword
    errors.shurePassword = validationRules.matchPasswords(newValue, shurePassword.value);
  }
);

watch(
  () => shurePassword.value,
  (newValue) => {
    errors.shurePassword = validationRules.matchPasswords(newPassword.value, newValue);
  }
);


onMounted(async () => {
  token.value = usersStore.dataAuth.token;
})


async function editPassword() {

  errors.oldPassword = validationRules.oldPassword(oldPassword.value);
  errors.newPassword = validationRules.newPassword(newPassword.value);
  errors.shurePassword = validationRules.matchPasswords(newPassword.value, shurePassword.value);

  // Check for any errors
  if (Object.values(errors).some((error) => error)) {
    return; // Stop submission if there are errors
  }


  if (!oldPassword.value || !newPassword.value || !shurePassword.value) {
    globalStore.showToast('success', "يرجى تعبئة جميع الحقول.", "", 2000)
    return;
  }

  if (newPassword.value !== shurePassword.value) {
    globalStore.showToast('success', "كلمة المرور الجديدة وتأكيدها غير متطابقين." , "", 2000)
    return;
  }

  // if (!token.value) {
  //   globalStore.showToast('success', "رمز الدخول مفقود. يرجى تسجيل الدخول مرة أخرى." , "", 2000)
  //   return;
  // }

  try {
    const { data } = await useFetch("update-passward", {
    responseType: "json",
      method: "PATCH",
      baseURL: baseURL,
      headers: {
        Authorization: `Bearer ${token.value}`, // Include the token in the Authorization header
      },
      body: {
        old_password: oldPassword.value,
        password: newPassword.value,
      }
  })

  if(data.value.key === "success") {
      console.log(data.value);
      popup.value = true
    } else {
      console.log(data.value)
      globalStore.showToast('error', data.value.msg , "", 2000)
    }
  } catch(error) {
    console.log(error)
  }
}
</script>
