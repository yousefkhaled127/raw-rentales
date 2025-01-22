<template>
  <section class="section-all mt-0">
    <div class="container">
      <h5 class="text-center">اتصل بنا</h5>
      <div class="contact-box">
        <form class="row" @submit.prevent="sendContact" ref="formContact">
          <div class="col-lg-6">
            <div class="content-input">
              <label class="label-all" for="">الاسم</label>
              <input
                placeholder="أدخل اسمك"
                class="input-all"
                type="text"
                v-model="name"
                name="name"
              />
              <span v-if="errors.name" class="valid-eror">{{ errors.name }}</span>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="content-input">
              <label class="label-all" for="">رقم الجوال</label>
              <input
                placeholder="أدخل رقم الجوال"
                class="input-all"
                type="number"
                v-model="phone"
                name="phone"
              />
              <div class="select-number">
                <SelectNumber @update:model-value="getCountryCode" />
              </div>
              <span v-if="errors.phone" class="valid-eror">{{ errors.phone }}</span>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="content-input">
              <label class="label-all" for="">موضوع الرساله</label>
              <input
                placeholder="أدخل موضوع الرساله"
                class="input-all"
                type="text"
                v-model="subject"
                name="subject"
              />
              <span v-if="errors.subject" class="valid-eror">{{ errors.subject }}</span>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="content-input">
              <label class="label-all" for="">موضوع الرساله</label>
              <textarea
                placeholder="اكتب رسالتك"
                v-model="message"
                class="input-all textarea-contact"
                name="message"
              ></textarea>
              <span v-if="errors.message" class="valid-eror">{{ errors.message }}</span>
            </div>
          </div>

          <div class="content-center mt-4 gap-3">
           <NuxtLink class="button-all" to="https://web.whatsapp.com/">
           <font-awesome-icon class="icon-whats" icon="fa-brands fa-whatsapp" />
            تواصل معنا
           </NuxtLink>
           <button type="submit" class="button-all">
              <p v-if="!looding">ارسال</p>
              <ProgressSpinner v-if="looding" class="spinner" strokeWidth="8" fill="transparent"
              animationDuration=".5s" aria-label="Custom ProgressSpinner" />
            </button>
         </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
const looding = ref(false);
const { baseURL } = useAPI();
const formContact = ref(null);
const globalStore = useGlobalStore();

const country_code = ref("");
const name = ref("");
const phone = ref("");
const subject = ref("");
const message = ref("");

// Reactive errors object
const errors = reactive({
  name: "",
  phone: "",
  subject: "",
  message: "",
  country_code: "",
});

// Get the selected country code from a child component
const getCountryCode = (code) => {
  country_code.value = code;
};

// Validation rules for each field
const validationRules = {
  name: (value) => (value ? "" : "يرجى إدخال الاسم"),
  phone: (value) => (value ? "" : "يرجى إدخال رقم الجوال"),
  subject: (value) => (value ? "" : "يرجى إدخال موضوع الرسالة"),
  message: (value) => (value ? "" : "يرجى إدخال الرسالة"),
  country_code: (value) => (value ? "" : "يرجى اختيار رمز الدولة"),
};

// Watchers to validate inputs dynamically
watch(
  () => name.value,
  (newValue) => {
    errors.name = validationRules.name(newValue);
  }
);
watch(
  () => phone.value,
  (newValue) => {
    errors.phone = validationRules.phone(newValue);
  }
);
watch(
  () => subject.value,
  (newValue) => {
    errors.subject = validationRules.subject(newValue);
  }
);
watch(
  () => message.value,
  (newValue) => {
    errors.message = validationRules.message(newValue);
  }
);
watch(
  () => country_code.value,
  (newValue) => {
    errors.country_code = validationRules.country_code(newValue);
  }
);

// Form submission
async function sendContact() {
  // Trigger all validations before submission
  errors.name = validationRules.name(name.value);
  errors.phone = validationRules.phone(phone.value);
  errors.subject = validationRules.subject(subject.value);
  errors.message = validationRules.message(message.value);
  errors.country_code = validationRules.country_code(country_code.value);

  // Check for errors
  if (Object.values(errors).some((error) => error)) {
    return; // Stop submission if there are errors
  }

  try {
    looding.value = true;

    const formData = new FormData(formContact.value);
    formData.append("country_code", country_code.value);

    const { data, status } = await useFetch("send-contact", {
      responseType: "json",
      method: "post",
      baseURL: baseURL,
      body: formData,
    });

    looding.value = false;

    if (data.value.key === "success") {
      globalStore.showToast("success", data.value.msg, "", 2000);
      navigateTo("/");
    } else if (data.value.key === "fail") {
      globalStore.showToast("error", data.value.msg, "", 2000);
    }
  } catch (error) {
    looding.value = false;
    console.error("Error during submission:", error);
  }
}

// Helper function to get field names in Arabic

</script>
