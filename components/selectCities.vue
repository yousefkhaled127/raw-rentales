<template>
  <Select
    v-model="selectedCity"
    :options="cities"
    optionLabel="name"
    placeholder="حدد المدينه"
    class="w-full md:w-56 input-all select-city"
    name="selectedCity"
  />
</template>

<script setup>

// Props
const props = defineProps({
  userCitychild: {
    type: [String, Number, Object], // City ID passed from the parent
    required: null,
  },
});
const cities = ref([]);
const selectedCity = ref(null); // Selected city object
const { baseURL } = useAPI();


// async function fetchCities() {
  try {
    const { data } = await useFetch("cities", {
      responseType: "json",
      method: "get",
      baseURL: baseURL,
    });

    cities.value = data.value.data;
  } catch (error) {
    console.error("Error while fetching cities:", error);
  }


  watch(
  () => props.userCitychild,
  (newVal) => {
    const matchedCity = cities.value.find((city) => city.id === newVal);
    selectedCity.value = matchedCity
  },
  { immediate: true }
);


</script>