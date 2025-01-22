<!-- <template>
  <div class="row">
    <div class="col-lg-4" v-for="order in orderArray" :key="order.id">
      <div class="oreder-box">
        <div class="d-flex gap-2 align-items-center mb-3">
          <h5>رقم الطلب:</h5>
          <span class="active-white">{{ order.number }}</span>
        </div>
        <div class="d-flex gap-2 align-items-center mb-3">
          <h5>تاريخ الطلب :</h5>
          <span class="active-white">{{ order.data }}</span>
        </div>
        <div class="d-flex gap-2 align-items-center mb-3">
          <h5>وقت الطلب :</h5>
          <span class="active-white">{{ order.time }}</span>
        </div>
        <div class="d-flex gap-2 align-items-center mb-3">
          <h5>حاله الطلب :</h5>
          <span class="active-white">{{ order.orderStatus }}</span>
        </div>
        <button
          class="button-all"
          @click="$router.push({ path: `/orders/${order.id}` })"
        >
          تفاصيل الطلب
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const orderArray = ref([
  {
    id: 0,
    number: "#123",
    data: "11 اكتوبر 2023",
    time: "منذ 6 ساعات",
    orderStatus: "حاليه",
  },
  {
    id: 1,
    number: "#456",
    data: "11 اكتوبر 2023",
    time: "منذ 6 ساعات",
    orderStatus: "حاليه",
  },
  {
    id: 2,
    number: "#789",
    data: "11 اكتوبر 2023",
    time: "منذ 6 ساعات",
    orderStatus: "حاليه",
  },
  {
    id: 3,
    number: "#123",
    data: "11 اكتوبر 2023",
    time: "منذ 6 ساعات",
    orderStatus: "حاليه",
  },
  {
    id: 4,
    number: "#123",
    data: "11 اكتوبر 2023",
    time: "منذ 6 ساعات",
    orderStatus: "حاليه",
  },
  {
    id: 5,
    number: "#123",
    data: "11 اكتوبر 2023",
    time: "منذ 6 ساعات",
    orderStatus: "حاليه",
  },
]);
</script> -->
