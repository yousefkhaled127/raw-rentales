<template>
  <section>
    <div class="login-LangSwitchar">
        <LangSwitchar />
      </div>
    <div class="container">
      <div class="row align-items-center">
        <div class="col-lg-6">
          <div>
            <h4 class="text-center">تسجيل دخول</h4>
              <form @submit.prevent="handleSubmit" ref="formRegister">
                <div class="content-input">
                  <label class="label-all" for="">اسم المستخدم</label>
                  <input
                    @input="nameblur"
                    name="name"
                    placeholder="أدخل اسم المستخدم"
                    class="input-all"
                    type="text"
                    v-model="name"
                  />
                  <p class="valid-eror">{{ nameValid }}</p>
                </div>
                <div class="content-input">
                  <label class="label-all" for="">رقم الجوال</label>
                  <input
                    @input="phoneblur"
                    name="phone"
                    placeholder="أدخل رقم الجوال"
                    class="input-all"
                    type="number"
                    v-model="phone"
                  />
                  <p class="valid-eror">{{ phoneValid }}</p>
                  <div class="select-number">
                    <SelectNumber @update:model-value="getCountryCode" />
                  </div>
                </div>
                <div class="content-input">
                  <label class="label-all" for="">البريد الالكتروني</label>
                  <input
                    @input="emailblur"
                    name="email"
                    placeholder="أدخل البريد الالكتروني"
                    class="input-all"
                    type="email"
                    v-model="email"
                  />
                  <p class="valid-eror">{{ emailValid }}</p>
                </div>

                <div class="content-input">
                  <label class="label-all" for="">المدينه</label>
                  <SelectCities v-model="selectedCity" />
                  <p class="valid-eror">{{ cityValid }}</p>
                </div>

                <div class="content-input">
                  <label class="label-all" for="">كلمه المرور </label>
                  <Password
                    @input="newpasblur"
                    class="input-all"
                    placeholder="ادخل كلم المرور"
                    v-model="newPassword"
                    toggleMask
                    name="password"
                    :feedback="false"
                  />
                  <p class="valid-eror">{{ newpasswordValid }}</p>
                </div>
                <div class="content-input">
                  <label class="label-all" for="">تاكيد كلمه المرور </label>
                  <Password
                    @input="oldpasblur"
                    class="input-all"
                    placeholder="ادخل كلم المرور"
                    v-model="oldPassword"
                    toggleMask
                    name="oldPassword"
                    :feedback="false"
                  />
                  <p class="valid-eror">{{ oldpasswordValid }}</p>
                </div>
                <label for="" class="w-100 mt-3">
                  <input
                    v-model="is_notify"
                    class="input-radio radio-chekd"
                    type="checkbox"
                    id="radio-checkd"
                    name="is_notify"
                  />
                  <label for="radio-checkd" class="label-check mb-0">
                    <div class="box-checkd">
                      <font-awesome-icon icon="fa-solid fa-check" />
                    </div>
                    <div class="d-flex align-items-center gap-1">
                      <p class="">الموافقه علي الشروط والاحكام</p>
                    </div>
                  </label>
                </label>
                <div class="content-column mt-5">
                  <button type="submit" to="code" class="button-all">
                    <p v-if="!looding">تسجيل</p>
                    <ProgressSpinner v-if="looding" class="spinner" strokeWidth="8" fill="transparent"
                    animationDuration=".5s" aria-label="Custom ProgressSpinner" />
                  </button>
                  <div class="content-center">
                    <nuxt-link class="font-small" to="/login">
                      <span class="active-white me-1">ليس حساب بالفعل</span>
                      <span class="active-color text-decoration-underline">
                        تسجيل دخول</span
                      >
                    </nuxt-link>
                  </div>
                </div>
              </form>
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
  <Toast />
</template>

<script setup>
const router = useRouter();
definePageMeta({
  layout: false,
});



/// Auth

const { baseURL } = useAPI();
import { useUsersStoreauth } from '~/stores/useAuth';
const usersStore = useUsersStoreauth();

const formRegister = ref()
const name = ref('');
const email = ref('');
const phone = ref('');
const newPassword = ref('');
const oldPassword = ref('');
const selectedCity = ref('');
const country_code = ref('');
const is_notify = ref('');
const globalStore = useGlobalStore();
const looding = ref(false);

const nameValid = ref("");
const phoneValid = ref("");
const emailValid = ref("");
const cityValid = ref("");
const newpasswordValid = ref("");
const oldpasswordValid = ref("");

function nameblur() {
  nameValid.value = "";
  if(name.value == "") {
    nameValid.value = "اسم المستخدم مطلوب";
  }
}
function phoneblur() {
  phoneValid.value = "";
  if(phone.value == "") {
    phoneValid.value = "رقم الجوال مطلوب";
  }
}
function emailblur() {
  emailValid.value = "";
  if(phone.value == "") {
    emailValid.value = "رقم الجوال مطلوب";
  }
}
function newpasblur() {
  newpasswordValid.value = "";
  if(phone.value == "") {
    newpasswordValid.value = "رقم الجوال مطلوب";
  }
}
function oldpasblur() {
  oldpasswordValid.value = "";
  if(phone.value == "") {
    oldpasswordValid.value = "رقم الجوال مطلوب";
  }
}
async function handleSubmit() {
  const isValid = ref(true); // متغير لتحديد ما إذا كانت جميع الحقول صالحة

  if (newPassword.value !== oldPassword.value) {
    globalStore.showToast('error', "كلمة المرور وتأكيد كلمة المرور غير متطابقتين" , "", 2000)
    isValid.value = false;
  }
  if(!name.value) {
    nameValid.value = "اسم المستخدم مطلوب";
    isValid = false;
  }
  if(!phone.value) {
    phoneValid.value = "رقم الجوال مطلوب";
    isValid = false;
  }
  if(!email.value) {
    emailValid.value = "البريد الإلكترونى مطلوب";
    isValid = false;
  }
  if(!selectedCity.value) {
    cityValid.value = "المدينة مطلوبة";
    isValid = false;
  }
  if(!newPassword.value) {
    newpasswordValid.value = "كلمة المرور مطلوبة";
    isValid = false;
  }
  if(!oldPassword.value) {
    oldpasswordValid.value = "كلمة المرور غير متطابقة";
    isValid = false;
  }

  if (!isValid) {
    return;
  }

  try {
  
    looding.value = true;
        const formData = new FormData(formRegister.value);
        formData.append("password", newPassword.value);
        formData.append("city_id", selectedCity.value.id);
        formData.append("country_code", country_code.value);
        const { data } = await useFetch('sign-up', {
          responseType: "json",
          method: "post",
          baseURL: baseURL,
          body: formData,
        });


        if(data.value.key == "success") {
          globalStore.showToast('success', data.value.msg , "", 2000)
          usersStore.mainusersStore = data.value.data
          looding.value = false;
          router.push("/login/code")
        } else {
           globalStore.showToast('error', data.value.msg , "", 2000)
           looding.value = false;
         }

      } catch (error) {
        console.error("error", error);
      }
}


const getCountryCode = (code) => {
  country_code.value = code;
}


</script>