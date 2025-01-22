<script setup lang="ts">
import { computed } from "vue";
const { locales, locale, setLocale, localeProperties } = useI18n();

let language = computed({
  get: () => locale.value,
  set: (value) => {
    setLocale(value);
  },
});

watch(
  () => localeProperties.value.dir,
  (newDir) => {
    useHead({
      htmlAttrs: {
        dir: newDir || "ltr", // Default to 'ltr' if no direction is provided
      },
    });
  },
  { immediate: true }
);
</script>

<template>
  <div class="position-relative">
    <label for="language-select" class="visually-hidden">Select Language</label>
    <select class="select-language" v-model="language">
      <option
        v-for="item in locales"
        :key="typeof item === 'object' ? item.code : item"
        :value="typeof item === 'object' ? item.code : item"
      >
        {{ typeof item === "object" ? item.name : item }}
      </option>
    </select>
    <font-awesome-icon
      class="chevron-language"
      icon="fa-solid fa-chevron-down"
    />
  </div>
</template>
