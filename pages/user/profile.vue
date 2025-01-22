<template>
  <section class="section-all mt-0">
    <div class="container">
      <h5 class="text-center">البيانات الشخصيه</h5>
      <div class="contact-box contact-profile">
        <form>
          <div class="content-input">
            <label class="label-all" for="">الاسم</label>
            <input
              placeholder="أدخل اسمك"
              class="input-all"
              type="text"
              disabled
              v-model="name"
            />
          </div>
          <div class="content-input">
            <label class="label-all" for="">رقم الجوال</label>
            <input
              placeholder="أدخل رقم الجوال"
              class="input-all"
              type="number"
              disabled
              v-model="phone"
            />
            <div class="select-number">
              <SelectNumber disabled @update:model-value="getCountryCode" />
            </div>
          </div>
          <div class="content-input">
            <label class="label-all" for=""> البريد الالكتروني</label>
            <input
              placeholder="أدخل موضوع الرساله"
              class="input-all"
              type="text"
              disabled
              v-model="email"
            />
          </div>
          <div class="content-input">
            <label class="label-all" for="">المدينه</label>
            <SelectCities disabled :userCitychild="userCity" />
          </div>
        </form> 
      </div>
    </div>
  </section>
</template>

<script setup>



import { useUsersStoreauth } from '~/stores/useAuth';
const usersStore = useUsersStoreauth();
const name = ref();
const phone = ref();
const email = ref();
const userCity = ref();


//////  country_code ////// 
const country_code = ref('');

// Update City Callback
const getCountryCode = (code) => {
  country_code.value = code;
}
onMounted(async () => {
  name.value = usersStore.dataAuth.name;
  email.value = usersStore.dataAuth.email;
  phone.value = usersStore.dataAuth.phone;
  userCity.value = usersStore.dataAuth.city_id;

});



</script>
