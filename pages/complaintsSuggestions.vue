<template>
  <section class="section-all mt-0">
    <h5 class="text-center">الشكاوى والمقترحات</h5>
    <div class="container">
      <div class="line-height active-white mt-3 text-center" v-html="complaint_text"></div>
      <div class="contact-box">
        <form class="row" @submit.prevent="newComplaint" ref="formComplaint">
          <div class="col-lg-6">
            <div class="content-input">
              <label class="label-all" for="">الاسم</label>
              <input
                @input="nameblur"
                placeholder="أدخل اسمك"
                class="input-all"
                type="text"
                name="user_name"
                v-model="name"
              />
              <p class="valid-eror">{{ nameValid }}</p>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="content-input">
              <label class="label-all" for="">نوع الطلب</label>
              <Select
                @change="changeselect"
                v-model="selectedCity"
                :options="cities"
                optionLabel="name"
                placeholder=""
                class="w-full md:w-56 input-all select-city"
              />
              <p class="valid-eror">{{ selectValid }}</p>
            </div>
          </div>
          <div class="col">
            <div class="content-input">
              <label class="label-all" for="">نص كتابي</label>
              <textarea
                @input="blurmessge"
                placeholder="اكتب نص الطلب"
                v-model="messege"
                class="input-all textarea-contact"
                name="complaint"
                max="50"
              ></textarea>
              <p class="valid-eror">{{ messageValid }}</p>
            </div>
          </div>
          <div class="content-center">
            <button type="submit" class="button-all">
              <p v-if="!looding">موافق</p>
              <ProgressSpinner v-if="looding" class="spinner" strokeWidth="8" fill="transparent"
              animationDuration=".5s" aria-label="Custom ProgressSpinner" />
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
  <Toast />
 
</template>

<script setup>
const name = ref();
const messege = ref();
const selectedCity = ref();
const nameValid = ref("");
const selectValid = ref("");
const messageValid = ref("");
const cities = ref([
  { name: "اقتراح", subject: "suggestion" },
  { name: "شكاوي", subject: "complaint" },
]);

const { baseURL , useFetchAPI } = useAPI();
const formComplaint = ref(null);
const tokenCookie = useCookie("token");


const complaint_text = ref("")
const getMyInvoice = async () => {
  const { data } = await useFetchAPI("complaint-text");
  if (data.value.key === 'success') {
    complaint_text.value = data.value.data
    console.log('complaint-text ===> ', data.value)
  }
}
getMyInvoice()


const toast = useToast();
const looding = ref(false);
const globalStore = useGlobalStore();

function nameblur() {
  if(!name.value == "") {
    nameValid.value = ""
  } else {
    nameValid.value = "الاسم مطلوب";
  }
}
function blurmessge() {
  if(!messege.value == "") {
    messageValid.value = ""
  } else {
    messageValid.value = "نص الطلب مطلوب";
  }
}

function changeselect() {
  if(!selectedCity.value == "") {
    selectValid.value = "";
  } else {
    selectValid.value = "نوع الطلب مطلوب";
  }
}
async function newComplaint() {
const formData = new FormData(formComplaint.value);
try {

  if(!name.value) {
    nameValid.value = "الاسم مطلوب";
  }
  if(!selectedCity.value) {
    selectValid.value = "نوع الطلب مطلوب";
  }
  if(!messege.value) {
    messageValid.value = "نص الطلب مطلوب";
  }
  formData.append("subject", selectedCity.value.subject)
  
  looding.value = true;

  const { data , status} = await useFetch("new-complaint", {
    responseType: "json",
    method: "post",
    baseURL: baseURL,
    headers: {
      Authorization: `Bearer ${tokenCookie.value}`,
    },
    body: formData
  })

  if (status.value === "success") {
      looding.value = false;
    }

  if(data.value.key === "success") {
    globalStore.showToast('success', data.value.msg , "", 2000)

    navigateTo("/")
  }
  if(data.value.key === "fail") {
    globalStore.showToast('error', data.value.msg , "", 2000)
  }
  console.log(data.value)
} catch(error) {
  console.log(error)
}
}


</script>
