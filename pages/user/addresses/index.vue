<template>
  <section class="section-all">
    <div class="container">
      <h5 class="text-center">تعديل الملف الشخصي</h5>
      <div
        class="contact-box contact-addres"
        v-for="addres in addresArray"
        :key="addres.id"
      >
        <div class="d-flex gap-2">
          <h5>{{ addres.title }}</h5>
          <h5 class="active-white">
            {{ addres.name }}
          </h5>
        </div>
        <div class="btons-addres">
          <button>تعديل</button>
          <button @click="deleteDrop(addres.id)" class="color-red">حذف</button>
        </div>
      </div>
      <div class="mt-5 content-center">
        <NuxtLink to="addresses/map" class="button-all"
          >اضف عنوان جديد</NuxtLink
        >
      </div>
    </div>
  </section>
  <div class="popup" v-if="popup">
    <div class="popup-content">
      <div class="popup-box">
        <div class="popup-item" v-if="!doneReport">
          <h5>حذف الحساب</h5>
          <p class="mt-4 actvie-white">هل انت متأكد من حذف الحساب؟</p>
          <div class="btons-popup">
            <button class="button-all" @click="popup = false">رجوع</button>
            <button class="button-all button-bord" @click="confirmDelete">
              حذف
            </button>
          </div>
        </div>
        <div class="popup-item" v-if="doneReport">
          <img class="img-sucess" src="../../../assets/images/sucess.png" />
          <h4 class="mb-5">تم حذف العنوان بنجاح</h4>
          <button
            @click="(popup = false)((doneReport = !doneReport))"
            class="button-all"
          >
            رجوع
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const popup = ref(false);
const doneReport = ref(false);
const deleteId = ref(null);
const addresArray = ref([
  {
    id: 1,
    title: "عنوان 1 :",
    name: "13 شارع الملك عبد العزيز, حي العمل , الرياض",
  },
  {
    id: 2,
    title: "عنوان 1 :",
    name: "13 شارع الملك عبد العزيز, حي العمل , الرياض",
  },
  {
    id: 3,
    title: "عنوان 1 :",
    name: "13 شارع الملك عبد العزيز, حي العمل , الرياض",
  },
]);
function deleteDrop(id) {
  // Find the index of the address to remove
  popup.value = true;
  deleteId.value = id; // Store the ID of the address to delete
  console.log(id);
}

function confirmDelete() {
  const index = addresArray.value.findIndex(
    (addres) => addres.id === deleteId.value
  );
  console.log("index ==> ", index);
  if (index !== -1) {
    addresArray.value.splice(index, 1); // Remove the item from the array
  }
  deleteId.value = null; // Clear the stored ID
  doneReport.value = true;
}
</script>
