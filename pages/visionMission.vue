<template>
  <section class="section-all mt-0">
    <div class="content-center">
      <h5 class="text-center">الرؤية والرسالة</h5>
    </div>
    <div class="container">
      <div class="row mt-5">
        <div class="col-lg-6">
          <h5>{{ VisionAndMission.vision.title }}</h5>
          <div class="contact-box vision-box">
            <div class="line-height active-white" v-html="VisionAndMission.vision.content"></div>
          </div>
        </div>
        <div class="col-lg-6">
          <h5>{{ VisionAndMission.mission.title }}</h5>
          <div class="contact-box vision-box">
            <div class="line-height active-white" v-html="VisionAndMission.mission.content"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const VisionAndMission = ref("")
const { useFetchAPI } = useAPI();
const { data } = await useFetchAPI("vision-and-mission");
VisionAndMission.value = data.value.data;
</script>