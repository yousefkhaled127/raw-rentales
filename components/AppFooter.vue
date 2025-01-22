<template>
  <footer>
    <div class="container">
      <ul class="links-footer">
        <li class="list-foot">
          <NuxtLink :to="localePath('/')">الرئسيه</NuxtLink>
          <NuxtLink :to="localePath('/orders')" @click="clickRequest()">طلباتي</NuxtLink>
        </li>
        <li class="list-foot">
          <NuxtLink :to="localePath('/')">المحفظه</NuxtLink>
          <NuxtLink :to="localePath('termsConditions')"
            >الشروط والاحكام</NuxtLink
          >
        </li>
        <li class="list-foot">
          <NuxtLink :to="localePath('weare')">من نحن</NuxtLink>
          <NuxtLink :to="localePath('/visionMission')"
            >الرؤيه والرسالة</NuxtLink
          >
        </li>
        <li class="list-logo-footer">
          <div class="content-logo content-logo-foot">
            <img
              class="img-logo-footer"
              src="../assets/images/group.png"
              alt=""
            />
            <ul class="head-sohial foot-sohial">
              <li class="item-sohial" v-for="social in arraySocials" :key="social.id">
              <NuxtLink :to="social.link"
                >
                <img class="img-sohial" :src="social.icon" alt="" />
              </NuxtLink>
            </li>
            </ul>
          </div>
        </li>
        <li class="list-foot">
          <NuxtLink :to="localePath('contact')">اتصل بنا</NuxtLink>
        </li>
        <li></li>
        <li class="list-foot">
          <button @click="complaints"
            >الشكاوي والمقترحات</button
          >
        </li>
      </ul>
    </div>
  </footer>
  <div class="popup" v-if="popup">
    <div class="popup-content">
      <div class="popup-box">
        <div class="popup-itemf-auts">
          <font-awesome-icon
          @click="popup = false"
          class="exit-popup"
          icon="fa-solid fa-x"
        />
        <img class="img-not-token" src="../assets/images/alert-warning.svg" alt="">
        <h5 class="mt-4">يجب عليك تسجيل الدخول اولا</h5>
        <nuxt-link class="button-all mt-4" to="/login">تسجيل الدخول</nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
// complaintsSuggestions
const localePath = useLocalePath();
const arraySocials = ref([]);
const globalHome = useUsersStore();
globalHome.fetchUsers();
const router = useRouter();
onMounted(() => {
  arraySocials.value = globalHome.dataHome.data.socials;
})


const popup = ref(false);
const tokenCookie = useCookie("token");
// const clickRequest = () => {
//   if (!tokenCookie.value) {
//     popup.value = true;
//   } else {
//     router.push(`${localePath("/orders")}`)
//   }
// };
function clickRequest(e) {
  if(!tokenCookie.value) {
    popup.value = true;
    e.preventDefault();
  }
}

const complaints = () => {
  if(!tokenCookie.value) {
    popup.value = true;
  } else {
    router.push(`${localePath("/complaintsSuggestions")}`)
  }
}

</script>
