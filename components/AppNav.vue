<template>
  <header>
    <div class="header-content">
      <div class="container">
        <div class="header-inner">
          <ul class="head-sohial">
            <li class="item-sohial" v-for="social in arraySocials" :key="social.id">
              <NuxtLink :to="social.link"
                >
                <img class="img-sohial" :src="social.icon" alt="" />
              </NuxtLink>
            </li>
          </ul>
          <ul class="head-hint">
            <li class="basket-list">
              <NuxtLink class="position-relative flex-global" :to="localePath('/basket')">
                <p class="item-text-head">السله</p>
                <span class="count-cart" v-if="count">{{ count }}</span>
                <font-awesome-icon class="basket-icon" icon="fa-solid fa-suitcase-rolling"
              /></NuxtLink>
            </li>
            <li>
              <div class="dropdown">
                <button
                  @click="handleClick"
                  class="btn btn-secondary dropdown-toggle flex-global"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <p class="item-text-head">الاشعارات</p>
                  <!-- <span class="messge-bell">1</span> -->
                  <font-awesome-icon class="basket-icon" icon="fa-solid fa-bell" />
                </button>
                <ul
                  v-if="notification_token"
                  @click="console.log(1)"
                  class="dropdown-menu"
                  aria-labelledby="dropdownMenuButton1"
                >

                <li v-if="notifications">
                  <div class="not-favourites w-100">
                    <img class="img-not-favourites" src="../assets/images/no-notifications.svg">
                    <h5 class="mt-4">لا توجد اشعارات</h5>
                  </div>
                </li>
                  <!-- <li v-for="item in dropdownArray" :key="item.id">
                    <div class="d-flex align-items-center">
                      <font-awesome-icon
                        class="bell-drop"
                        icon="fa-solid fa-bell"
                      />
                      <span>{{ item.name }}</span>
                    </div>
                    <font-awesome-icon
                      @click="deleteDrop(item)"
                      class="delete-drop"
                      icon="fa-solid fa-trash-can"
                    />
                  </li> -->
                </ul>
              </div>
            </li>
            <li v-if="tokenCookie">
              <div class="dropdown">
                <button
                  class="btn btn-secondary dropdown-toggle flex-global"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <p class="item-text-head show">{{ usersStore.dataAuth.name }}</p>
                </button>
                <ul
                  @click.stop="console.log(1)"
                  class="dropdown-menu dropdown-user"
                  aria-labelledby="dropdownMenuButton1"
                >
                  <li>
                    <NuxtLink :to="localePath('/user/profile')"
                      >الملف الشخصي</NuxtLink
                    >
                  </li>
                  <li>
                    <NuxtLink :to="localePath('/user/bills')">فواتيري</NuxtLink>
                  </li>
                  <li>
                    <NuxtLink :to="localePath('/user/addresses')"
                      >عناويني</NuxtLink
                    >
                  </li>
                  <li>
                    <NuxtLink :to="localePath('/user/wallet')"
                      >المحفظه</NuxtLink
                    >
                  </li>
                  <li>
                    <NuxtLink :to="localePath('/user/seating')"
                      >الاعدادات</NuxtLink
                    >
                  </li>
                  <li>
                    <button class="color-red" @click.prevent="signOut()">تسجيل خروج</button>
                  </li>
                </ul>
              </div>
            </li>
            <li v-if="!tokenCookie">
              <NuxtLink class="" :to="localePath('/login')">
                <p class="item-text-head">تسجيل / دخول</p>
                <font-awesome-icon class="login-icon" icon="fa-solid fa-right-to-bracket" />
              </NuxtLink>
            </li>
            <li>
              <LangSwitchar />
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="header-inks">
      <div class="container">
        <nav class="nav-links">
          <div class="logo-hint">
            <NuxtLink to="" class="content-logo"
              ><img
                class="img-logo"
                src="../assets/images/raw rentals 1.png"
                alt=""
              />
              <h6>راو رنتلز</h6>
            </NuxtLink>
          </div>
          <button
            :class="{ btnexit_links: buttonShowlinks }"
            @click="buttonShowlinks = true"
            class="btn-show-links"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          <div
            @click="buttonShowlinks = false"
            :class="{ 'popup-header-show': buttonShowlinks }"
            class="popup-header"
          >
            <ul
              @click="stopprop"
              class="links"
              :class="{ 'links-show': buttonShowlinks }"
            >
              <li>
                <NuxtLink @click.native="handleNavigation" :to="localePath('/')">{{ $t("home") }}</NuxtLink>
              </li>
              <div class="dropdown">
                <button
                  class="btn btn-secondary dropdown-toggle"
                  href="#"
                  role="button"
                  id="dropdownMenuLink"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {{ $t("list") }}
                </button>

                <ul
                  class="dropdown-menu list-item"
                  aria-labelledby="dropdownMenuLink"
                >
                <li v-for="categor in categories" :key="categor.id">
                  <nuxt-link @click.native="handleNavigation" :to="localePath(`/shoping/${categor.id}`)">
                    {{ categor.name }}
                  </nuxt-link>
                </li>
                  <!-- <li>
                    <NuxtLink :to="localePath('/shoping')">{{
                      $t("children")
                    }}</NuxtLink>
                  </li>
                  <li>
                    <NuxtLink :to="localePath('/shoping')">{{
                      $t("Accessories")
                    }}</NuxtLink>
                  </li>
                  <li>
                    <NuxtLink :to="localePath('/shoping')">{{
                      $t("bags")
                    }}</NuxtLink>
                  </li>
                  <li>
                    <NuxtLink :to="localePath('/shoping')">{{
                      $t("Shoes")
                    }}</NuxtLink>
                  </li>
                  <li>
                    <NuxtLink :to="localePath('/shoping')">{{
                      $t("PartyPreparation")
                    }}</NuxtLink>
                  </li> -->
                </ul>
              </div>
              <li>
                <nuxt-link :to="localePath('/orders')" @click.native="clickRequest">{{
                  $t("requests")
                }}</nuxt-link>
              </li>
              <!-- <li>
                <button @click="clickRequest()">{{
                  $t("requests")
                }}</button>
              </li> -->
              <li class="list-logo-hide">
                <a href="" class="content-logo"
                  ><img
                    class="img-logo"
                    src="../assets/images/raw rentals 1.png"
                    alt=""
                  />
                  <h3>راو رنتلز</h3>
              </a>
              </li>
              <li>
                <NuxtLink @click.native="handleNavigation" :to="localePath('/servicees')">{{
                  $t("Services")
                }}</NuxtLink>
              </li>
              <li>
                <NuxtLink @click.native="handleNavigation" :to="localePath('/favorite')">{{
                  $t("Favorite")
                }}</NuxtLink>
              </li>
              <li>
                <NuxtLink @click.native="handleNavigation" :to="localePath('/contact')"
                  >{{ $t("contact") }}
                </NuxtLink>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  </header>
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
        <h4 class="mt-4">يجب عليك تسجيل الدخول اولا</h4>
        <nuxt-link class="button-all mt-4" to="/login">تسجيل الدخول</nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup >
const localePath = useLocalePath();

const popup = ref(false)
const tokenCookie = useCookie("token")
function clickRequest(e) {
  if(!tokenCookie.value) {
    popup.value = true;
    e.preventDefault();
  }
  buttonShowlinks.value = false;
}
const notification_token = ref(true);
const handleClick = () => {
  if (!tokenCookie.value) {
    notification_token.value = false
    // If no token, navigate to login page
    router.push("/login");
  } else {
    // Handle dropdown toggle (if necessary)
    console.log("User has token, dropdown toggled.");
  }
};

function handleNavigation() {
  // Close the dropdown menu after navigating
  buttonShowlinks.value = false;
}



const buttonShowlinks = ref(false);
// dropdown array
// const dropdownArray = ref([
//   {
//     id: 1,
//     name: "تم اتمام عمليه التسجيل",
//   },
//   {
//     id: 2,
//     name: "تم قبول الطلب من الاداره والتوجه للدفع",
//   },
//   {
//     id: 3,
//     name: "تم تاكيد عمليه الدفع",
//   },
//   {
//     id: 4,
//     name: "تم الغاء الطلب رقم #123",
//   },
//   {
//     id: 5,
//     name: "تم تعديل البيانات الشخصيه",
//   },
//   {
//     id: 6,
//     name: "تم تغيير حاله الطلب رقم #123 من جاري التنفيذ الي تم الشحن",
//   },
// ]);
// function deleteDrop(item) {
//   dropdownArray.value = dropdownArray.value.filter(
//     (dropdownItem) => dropdownItem.id !== item.id
//   );
// }

function stopprop(e) {
  e.stopPropagation();
}








///// auth /////

// 
console.log(tokenCookie.value);
import { useUsersStoreauth } from '~/stores/useAuth';
const usersStore = useUsersStoreauth();
// console.log(usersStore.dataAuth.token);
// import { useUsersPruduct } from '#build/imports';
// const usePruduct = useUsersPruduct()
const router = useRouter();
const globalStore = useGlobalStore();
const { baseURL } = useAPI();
const cockie = useCookie("mac_addressGlobal");

async function signOut() {

  try {
    const { data } = await useFetch("sign-out", {
      responseType: "json",
      method: "delete", // Ensure the API matches
      baseURL: baseURL,
      headers: {
        Authorization: `Bearer ${tokenCookie.value}`, // Ensure correct token format
      },
      body: {
        device_id: 1,
      },
    });

    
    if (data.value.key === "success") {
      globalStore.showToast('success', data.value.msg , "", 2000)
      router.push("/login");
      usersStore.dataAuth = null;
      tokenCookie.value = null;
    } else {
      globalStore.showToast('error', data.value.msg , "", 2000)
    }
  } catch (error) {
    console.log(error)
  }
}


////// 

const {dataAuth} = storeToRefs(usersStore)
const token = dataAuth.value?.token;



// const globalHome = useUsersStore();
// console.log(globalHome.adressglobal)
const count = ref("");
try {
   const { data } = await useFetch("count-cart-items", {
       responseType: "json",
       method: "post",
       baseURL: baseURL,
       headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
        },
       body: {
        "mac_address": cockie.value,
      }
   })
   if (data.value.key === "success") {
    count.value = data.value.data.count
    // console.log(data.value)
   }
   
 }catch(error) {
  console.log(error)
}


const arraySocials = ref([])
const categories = ref([]);
const globalHome = useUsersStore();


onMounted(async () => {
  const cockie = useCookie("mac_addressGlobal");

  if (!cockie.value) {
    // Regenerate MAC address and fetch data
    await globalHome.functionMacaddress();
  }
  // Fetch data directly if MAC address exists
  await globalHome.fetchUsers();

  // Update the state with fetched data
  if (globalHome.dataHome?.data) {
    const homeData = globalHome.dataHome.data;
    categories.value = homeData.categories;
    arraySocials.value = homeData.socials;
  }
});

const notifications = ref([]);

try {
  const { data } = await useFetch('notifications', {
    responseType: "json",
    method: "get",
    baseURL: baseURL,
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
  notifications.value = data.value?.data

} catch (error) {
  console.log(error);
}


const { useFetchAPI } = useAPI();
  const { data } = await useFetchAPI("notifications");
  if (data.value.key === 'success') {
    notifications.value = data.value.data.data
    console.log(notifications.value)
  }
</script>
