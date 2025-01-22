<template>
  <section class="section-all mt-0">
    <div class="container">
      <h5 class="text-center">الاعدادات</h5>
      <div class="contact-box">
        <ul class="list-seating">
          <li>
            <NuxtLink to="seating/editProfile">تعديل الملف الشخصي</NuxtLink>
          </li>
          <li><NuxtLink to="seating/editPhone"> تغيير رقم الجوال</NuxtLink></li>
          <li>
            <NuxtLink to="seating/editPassword"> تغيير كلمة المرور</NuxtLink>
          </li>
          <li><button @click="popup = true">حذف الحساب</button></li>
        </ul>
      </div>
    </div>
  </section>
  <div class="popup" v-if="popup">
    <div class="popup-content" @click="popup = false">
      <div class="popup-box" @click.stop="console.log(1)">
        <h5>حذف الحساب</h5>
        <p class="mt-4 actvie-white">هل انت متأكد من حذف الحساب؟</p>
        <div class="btons-popup">
          <button class="button-all" @click="deleteAcount">حذف</button>
          <button class="button-all button-bord" @click="popup = false">
            رجوع
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const popup = ref(false);

import { useUsersStoreauth } from '~/stores/useAuth';
const usersStore = useUsersStoreauth();
const router = useRouter();
const token = ref();
const globalStore = useGlobalStore();

onMounted(async () => {
  token.value = usersStore.dataAuth.token;
})
const { baseURL } = useAPI();

async function deleteAcount() {
  try {
    const { data } = await useFetch("delete-account", {
      responseType: "json",
      method: "post",
      baseURL: baseURL,
      headers: {
        Authorization: `Bearer ${token.value}`, // Include the token in the Authorization header
      },
    })
    if(data.value.key === "success") {
      console.log(data.value.data);
      globalStore.showToast('success', data.value.msg , "", 2000)
      usersStore.dataAuth = null;
      router.push("/login")
    } else {
      console.log(data.value)
    }
  } catch(error) {
    console.log(error)
  }
}

</script>
