<template>
  <section class="section-all">
    <h5 class="text-center">الشروط والاحكام</h5>
    <div class="container">
      <div class="contact-box">
        <div class="line-height active-white" v-html="trems"></div>
      </div>
    </div>
  </section>
</template>

<script setup>
const { useFetchAPI } = useAPI();
const { data } = await useFetchAPI("terms");
const trems = data.value.data;

</script>