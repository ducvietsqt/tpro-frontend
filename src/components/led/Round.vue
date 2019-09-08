<template>
  <div class="title_led">
    <strong>{{processTitle}}</strong>
    <p class="timer_title" v-show="isStarted && !endProcess">
      <CountDown ref="count_down"/>
    </p>
  </div>
</template>


<script>
import {mapGetters} from "vuex";
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
      "endProcess",
      "startTimerLed"
      ]),
    processTitle(){
      if(this.process == null)
        return "Khởi Động";
      else
        return this.questions[this.process]['name'];
    }
  },
  mounted() {},
  methods: {}
};
</script>

<style scoped>
</style>
