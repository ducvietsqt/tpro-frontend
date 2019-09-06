<template>
  <div class="title_led">
    <!--Cuộc thi <strong>T-Pro Confetti</strong>-->
    <strong>Khởi động</strong>
    <p class="timer_title" v-show="isStarted && !endProcess">
      <CountDown ref="count_down"/>      
    </p>
  </div>  
</template>


<script>
import {mapGetters, mapActions} from "vuex";
import CountDown from "../../components/led/CountDown";

export default {
  name: "Welcome",
  components: {
    CountDown
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters("game", [
        "isStarted",
        "questions",
        "process",
        "endProcess"
      ]),
  },
  mounted() {},
  methods: {}
};
</script>

<style scoped>
</style>
