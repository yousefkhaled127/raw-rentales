<template>
  <Select
    v-model="selectedCode"
    :options="countryCodes"
    optionLabel="key"
    optionValue="key"
    checkmark
    :highlightOnSelect="false"
    class="w-full md:w-56"
    autoOptionFocus
    :defaultValue="defaultCountry"
    @change="emit('update:modelValue', selectedCode)"
  />
</template>

<script setup>
import { ref, watch } from 'vue';

// استقبال الخصائص من المكون الأب
const props = defineProps({
  selectedCode: {
    type: String,
  },
});

const emit = defineEmits(["update:modelValue"]);

const countryCodes = ref([]);
const selectedCode = ref();
const { baseURL } = useAPI();

// Update parent when selectedCode changes
watch(selectedCode, (value) => {
  emit("update:modelValue", value);
});
// const defaultCountry = ref("")
try {
        const { data } = await useFetch('country-codes', {
          responseType: "json",
          method: "get",
          baseURL: baseURL,
        });

        console.log(data.value, selectedCode.value)
        countryCodes.value = data.value.data
      } catch (error) {
        console.error("error", error);
      }


watch(() => selectedCode.value, (newValue) => {
  emit('update:modelValue', newValue)
})

onMounted(() => {
  if (props.selectedCode) {
    selectedCode.value = props.selectedCode;
  }
  selectedCode.value = countryCodes.value[0].key
})

</script>
