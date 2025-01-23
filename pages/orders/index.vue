<template>
  <section class="section-all section-child mt-0">
    <div class="container">
      <Tabs :value="currentTab" @update:value="changeCurrentTab">
        <TabList>
          <Tab :value="0">طلبات حاليه</Tab>
          <Tab :value="1">طلبات منتهيه</Tab>
        </TabList>
        <TabPanels>
          <TabPanel :value="0">
            <div v-if="!currentOrders.length"  class="not-favourites">
              <img class="img-not-favourites" src="../../assets/images/no-products.svg" alt="">
              <h4 class="mt-3">لا توجد طلبات حاليه</h4>
              <h6 class="mt-3 active-white">عذرا لا توجد طلبات حاليه الأن قم بإضافة طلبات والعودة</h6>
            </div>
            <div class="row">
              <div class="col-lg-4" v-for="order in currentOrders" :key="order.id">
                <div class="oreder-box">
                  <div class="d-flex gap-2 align-items-center mb-3">
                   <h5>رقم الطلب:</h5>
                   <span class="active-white">{{ order.order_num }}</span>
                 </div>
                 <div class="d-flex gap-2 align-items-center mb-3">
                   <h5>تاريخ الطلب :</h5>
                   <span class="active-white">{{ order.day }} {{ order.month }} {{ order.year }}</span>
                   </div>
                   <div class="d-flex gap-2 align-items-center mb-3">
                     <h5>وقت الطلب :</h5>
                     <span class="active-white">{{ order.order_time }}</span>
                  </div>
                  <div class="d-flex gap-2 align-items-center mb-3">
                    <h5>حاله الطلب :</h5>
                    <span class="active-white">{{ order.status }}</span>
                 </div>
                 <!-- <nuxt-link class="button-all" :to="localePath(`orders/${order.id}`)">تفاصيل الطلب</nuxt-link> -->
                  <nuxt-link class="button-all" :to="localePath(`/orders/${order.id}`)">تفاصيل الطلب</nuxt-link>
                </div>
              </div>
            </div>
          </TabPanel>
          <TabPanel :value="1">
            <div v-if="!completedOrders.length"  class="not-favourites">
              <img class="img-not-favourites" src="../../assets/images/no-cart.svg" alt="">
              <h4 class="mt-3">لا توجد طلبات منتهيه</h4>
              <h6 class="mt-3 active-white">عذرا لا توجد طلبات منتهيه الأن قم بإضافة طلبات والعودة</h6>
            </div>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  </section>
  


</template>

<script setup>


const tokenCookie = useCookie("token")
if(!tokenCookie.value) {
  navigateTo("/")
}

const { baseURL } = useAPI();
const currentTab = ref(0);
const changeCurrentTab = (tab) => {
  currentTab.value = tab;
};

const localePath = useLocalePath();

import { useUsersStoreauth } from '~/stores/useAuth';
const usersStore = useUsersStoreauth();
const {dataAuth} = storeToRefs(usersStore)




// const tokenCookie = useCookie("token");
const currentOrders = ref([]);
const completedOrders = ref([]);


watch(
  () => dataAuth.value.token,
  async (newToken) => {
    if (newToken) {
      const { data } = await useFetch("current-orders", {
        responseType: "json",
        method: "get",
        baseURL: baseURL,
        headers: {
          Authorization: `Bearer ${newToken}`,
        },
      });
      currentOrders.value = data.value?.data?.data || [];
      console.log(currentOrders.value);
    }
  },
  { immediate: true }
)


try{
  const { data} = useFetch("completed-orders", {
    responseType: "json",
    method: "get",
    baseURL: baseURL,
    headers: {
      Authorization: `Bearer ${dataAuth.value.token}`,
    },
  });

  completedOrders.value = data.value.data.data
  console.log(completedOrders.value , "completedOrders")
}catch(error){
  console.log(error);
}


</script>
