<template>
  <section>
    <div class="container">
      <div class="row">
        <div class="col-lg-9">
          <div v-if="!listGalleryitem.length"  class="not-favourites">
            <img class="img-not-favourites" src="../../assets/images/no-products.svg" alt="">
            <h4 class="mt-3">لا توجد منتجات</h4>
            <h6 class="mt-3 active-white">عذرا لا توجد منتجات في هذه الفئة</h6>
            <nuxt-link to="/" class="mt-4 button-all">الرجوع للرئسيه</nuxt-link>
         </div>
         <button @click="fillterPopup = true" class="button-all button-fillter">
             <font-awesome-icon
                icon="fa-solid fa-magnifying-glass"
              />
              <p>بحث</p>
         </button>
          <div class="row">
            <AppGallery :listGallery="listGalleryitem" :classCategories="categoriesCol" :is-loading="loading" />
          </div>
        </div>
        <div v-if="loading" class="col-lg-3">
          <Skeleton class="mb-2 img-services mb-3"></Skeleton>
        </div>
        <div class="col-lg-3" v-else>
          <div @click="fillterPopup = false" class="fillter-hide" :class="{'fillter-popup' : fillterPopup}">
            <form @submit.prevent="filterProducts" ref="datafillter">
            <div class="sidbar-choose" @click.stop="console.log(1)">
              <button @click="fillterPopup = false" class="exit-fillter">
                <font-awesome-icon icon="fa-solid fa-x" />
              </button>
              <h6 class="title-sidbar">تصنيف</h6>
              <div class="box-search">
              <font-awesome-icon
                class="icon-search"
                icon="fa-solid fa-magnifying-glass"
              />
              <input
                v-model="search"
                type="search"
                placeholder="البحث باسم المنتج"
                class="input-search input-all"
              />
            </div>
              <div class="content-sidbar">
                <div>
                  <h6>اللون:</h6>
                  <label v-for="color in colors" :key="color.id" for="" class="w-100 mt-3">
                    <input
                      v-model="selectedColors"
                      class="input-radio radio-chekd"
                      type="checkbox"
                      :id="color.id"
                      name="color"
                      :value="color.id"
                    />
                    <label :for="color.id" class="label-check mb-0">
                      <div class="box-checkd">
                        <font-awesome-icon icon="fa-solid fa-check" />
                      </div>
                      <div class="d-flex align-items-center gap-1">
                        <p class="">{{ color.color }}</p>
                        <span :style="{ background: color.code }" class="item-color"></span>
                      </div>
                    </label>
                  </label>
                </div>
                <div class="mt-4">
                  <h6>الماركات</h6>
                  <label v-for="brand in brands" :key="brand.id" class="w-100 mt-3">
                    <input
                      v-model="selectedBrands"
                      class="input-radio radio-chekd"
                      type="checkbox"
                      :id="'brand' + brand.id"
                      name="brand"
                      :value="brand.id"
                    />
                    <label :for="'brand' + brand.id" class="label-check mb-0">
                      <div class="box-checkd">
                        <font-awesome-icon icon="fa-solid fa-check" />
                      </div>
                      <p>{{ brand.name }}</p>
                    </label>
                  </label>
                </div>
                <div class="mt-4">
                  <h6>السعر:</h6>
                  <div>
                    <label class="mt-3 mb-2" for="">
                      <input
                        id="lowest-price"
                        class="input-radio radio-sidbar"
                        type="radio"
                        name="input-radio"
                        v-model="price"
                        :value="0"
                      />
                      <label for="lowest-price" class="label-radio-sidbar mb-0">
                        <div class="radio-box-item">
                          <div class="p-radiobutton-icon"></div>
                        </div>
                        <p>أقل سعر</p>
                      </label>
                    </label>
                  </div>
                  <div class="mt-3">
                    <label for="" class="">
                      <input
                        id="highest-price"
                        class="input-radio radio-sidbar"
                        type="radio"
                        name="input-radio"
                        v-model="price"
                        :value="1"
                      />
                      <label
                        for="highest-price"
                        class="label-radio-sidbar mb-0"
                      >
                        <div class="radio-box-item">
                          <div class="p-radiobutton-icon"></div>
                        </div>
                        <p>اعلي سعر</p>
                      </label>
                    </label>
                  </div>
                </div>
                <div class="mt-4">
                  <h6>المقاس :</h6>
                  <label v-for="size in sizes" :key="size.id" class="w-100 mt-3">
                    <input
                      v-model="selectedSizes"
                      class="input-radio radio-chekd"
                      type="checkbox"
                      :id="'size' + size.id"
                      name="size"
                      :value="size.id"
                    />
                    <label :for="'size' + size.id" class="label-check mb-0">
                      <div class="box-checkd">
                        <font-awesome-icon icon="fa-solid fa-check" />
                      </div>
                      <p>{{ size.size }}</p>
                    </label>
                  </label>
                </div>
                <div class="mt-5">
                  <h5>ظهور المنتجات حسب:</h5>
                  <label class="mt-3 mb-2" for="">
                    <input
                      id="most-requested"
                      class="input-radio radio-sidbar"
                      type="radio"
                      name="most-requested"
                    />
                    <label for="most-requested" class="label-radio-sidbar mb-0">
                      <div class="radio-box-item"></div>
                      <p>الاكثر طلبا</p>
                    </label>
                  </label>
                </div>
              </div>
              <div class="content-center">
                <button type="submit" class="button-all">تصنيف</button>
              </div>
            </div>
          </form>
          </div>
        </div>
        <!-- <Paginator class="mt-5" :rows="10" :totalRecords="120"></Paginator> -->
      </div>
    </div>
  </section>
</template>

<script setup>
const search = ref();
const listGalleryitem = ref([]);
const categoriesCol = ref(true);

const colors = ref([]);
const brands = ref([]);
const sizes = ref([]);
const selectedColors = ref([]); // لجمع معرفات الألوان المحددة
const selectedBrands = ref([]); // لجمع معرفات الماركات المحددة
const selectedSizes = ref([]); // لجمع معرفات المقاسات المحددة
const loading = ref(true);
const fillterPopup = ref(false);

import { useUsersStoreauth } from '~/stores/useAuth';
const usersStore = useUsersStoreauth();
const {dataAuth} = storeToRefs(usersStore)
const token = dataAuth.value?.token;


try {
  const { data, status } = await useFetch(`category-products/${useRoute().params.id}`, {
    responseType: "json",
    method: "get",
    baseURL: "https://backend.rawrentals.org/api/",
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
    },

  })

  
  loading.value = status.value == 'pending' ? true : false;

  listGalleryitem.value = data.value.data.data
 } catch(error) {
  console.log(error)
 }



 try {
  const { data } = await useFetch("filter-data", {
    responseType: "json",
    method: "get",
    baseURL: "https://backend.rawrentals.org/api/",
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  })
  colors.value = data.value.data.colors;
  brands.value = data.value.data.brands;
  sizes.value = data.value.data.sizes;
  // console.log(data.value.data)

 }catch(error) {
  console.log(error)
 }



const datafillter = ref(null);
const price = ref(null)
const { baseURL } = useAPI();

async function filterProducts() {
  const formData = new FormData(datafillter.value);

  try {
    const categoryId = useRoute().params.id;
    if (!categoryId) {
      console.error("Category ID is missing");
      return;
    }
    formData.append("category_id", categoryId); // Single value
    formData.append("type", "category");
    formData.append("sort", price.value == 0 ? "asc" : "desc");

    // Append multiple values as arrays
    selectedColors.value.forEach((id) => formData.append("color_id[]", id));
    selectedBrands.value.forEach((id) => formData.append("brand_id[]", id));
    selectedSizes.value.forEach((id) => formData.append("size_id[]", id));

    const { data } = await useFetch("filter-products", {
    responseType: "json",
    method: "post",
    baseURL: baseURL,
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: formData,
  })

  // console.log(data.value)
  listGalleryitem.value = data.value.data.data;
  console.log(price.value)
  } catch(error) {
    console.log(error)
  }
}
</script>
