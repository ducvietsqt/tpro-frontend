<template>
  <div>
    <p>example1: </p>
    <button class="btn_st_timer" type="button" @click="$refs.vacxin.startCountdown(true)">Start countdown</button> |
    <button class="btn_st_timer" type="button" @click="$refs.vacxin.stopCountdown()">Stop countdown</button>

    <vac :left-time="50000"
         :auto-start="false"
         :speed="1000"
         @process="onProcess"
         ref="vacxin">
  <span slot="process"
        slot-scope="{ timeObj }">
      {{ timeObj.ceil.s }} |
      {{ timeObj.org.s }}
    </span>
      <span slot="finish">Done!</span>
    </vac>
  </div>
</template>

<script>
  import {SPEED_COUNTDOWN} from "../../utils/constant";

  export default {
    name: "CountDownUi",
    data() {
      return {
        SPEED_COUNTDOWN
      }
    },
    methods: {
      onProcess(vm) {
        console.log(vm.$data.timeObj);
      }
    }
  }
</script>

<style scoped>
  .btn_st_timer {
    background: #fff;
    border: none;
    outline: none;
    padding: 5px 10px;
    color: #000000;
  }
</style>
