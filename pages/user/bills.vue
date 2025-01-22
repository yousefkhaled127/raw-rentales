<template>
  <section class="section-all">
    <div class="container">
      <h5 class="text-center">فواتيري</h5>
          <div v-if="invoices.length === 0" class="not-favourites mt-5">
            <img class="img-not-favourites" src="../../assets/images/no-invoices.svg" alt="">
            <h4 class="mt-3">لا توجد فواتير</h4>
            <h6 class="mt-3 mb-4 active-white">لم يتم تأجير منتجات حتى الأن قم بإضافة طلبات والعودة</h6>
            <nuxt-link class="button-all" to="/">الرجوع للرئسيه</nuxt-link>
         </div>
      <!-- <div class="row mt-5">
        <div class="col-lg-4">
          <div class="bill-box">
            <h6 class="title-sidbar text-end">رقم الطلب : 123</h6>
            <div class="p-3">
              <div
                class="mt-3 d-flex gap-2"
                v-for="bill in billArray"
                :key="bill.id"
              >
                <h6>{{ bill.key }}</h6>
                <h6 class="active-white">{{ bill.value }}</h6>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="bill-box">
            <h6 class="title-sidbar text-end">رقم الطلب : 123</h6>
            <div class="p-3">
              <div
                class="mt-3 d-flex gap-2"
                v-for="bill in billArray"
                :key="bill.id"
              >
                <h6>{{ bill.key }}</h6>
                <h6 class="active-white">{{ bill.value }}</h6>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="bill-box">
            <h6 class="title-sidbar text-end">رقم الطلب : 123</h6>
            <div class="p-3">
              <div
                class="mt-3 d-flex gap-2"
                v-for="bill in billArray"
                :key="bill.id"
              >
                <h6>{{ bill.key }}</h6>
                <h6 class="active-white">{{ bill.value }}</h6>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="bill-box">
            <h6 class="title-sidbar text-end">رقم الطلب : 123</h6>
            <div class="p-3">
              <div
                class="mt-3 d-flex gap-2"
                v-for="bill in billArray"
                :key="bill.id"
              >
                <h6>{{ bill.key }}</h6>
                <h6 class="active-white">{{ bill.value }}</h6>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="bill-box">
            <h6 class="title-sidbar text-end">رقم الطلب : 123</h6>
            <div class="p-3">
              <div
                class="mt-3 d-flex gap-2"
                v-for="bill in billArray"
                :key="bill.id"
              >
                <h6>{{ bill.key }}</h6>
                <h6 class="active-white">{{ bill.value }}</h6>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="bill-box">
            <h6 class="title-sidbar text-end">رقم الطلب : 123</h6>
            <div class="p-3">
              <div
                class="mt-3 d-flex gap-2"
                v-for="bill in billArray"
                :key="bill.id"
              >
                <h6>{{ bill.key }}</h6>
                <h6 class="active-white">{{ bill.value }}</h6>
              </div>
            </div>
          </div>
        </div>
      </div> -->
    </div>
    <!-- <Paginator :rows="10" :totalRecords="120"></Paginator> -->
  </section>
  <h1 v-if="loadingddd">haroooon</h1>
</template>

<script setup>
// const billArray = ref([
//   {
//     key: "تاريخ  الطلب : ",
//     value: "من 12 أكتوبر إلى 14 أكتوبر",
//   },
//   {
//     key: "وقت  الطلب : ",
//     value: "منذ 6 ساعات",
//   },
//   {
//     key: "تاريخ  الطلب : ",
//     value: "3 أيام",
//   },
//   {
//     key: "طريقة الدفع :",
//     value: "المحفظة",
//   },
//   {
//     key: "قيمة التوصيل :",
//     value: "10 ر.س",
//   },
//   {
//     key: "قيمة الخصم :",
//     value: "100 ر.س",
//   },
//   {
//     key: "ضريبة التوصيل :",
//     value: "10 ر.س",
//   },
//   {
//     key: "الإجمالي :",
//     value: "2000  ر.س",
//   },
// ]);
const loadingddd = ref(false)
const { useFetchAPI } = useAPI();
const invoices = ref([])


const getMyInvoice = async () => {
  const { data } = await useFetchAPI("my_invoices");
  if (data.value.key === 'success') {
    invoices.value = data.value.data.data
    console.log('invoice ===> ', data.value)
  }
}
getMyInvoice()
  
</script>
