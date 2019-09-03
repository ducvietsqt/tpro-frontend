<template>
  <div>
    <p>Count Down: <strong> {{processTimer}}</strong></p>
    <!--<button type="button" @click="handleStartTimer">Start</button>-->
    <!--<button type="button" @click="handleStopTimer">Stop</button>-->
    <!--<button type="button" @click="handleFinishTimer">Finish</button>-->
    <vac :left-time="timer * SECONDS"
         :auto-start="false"
         @start="onStart"
         @stop="onStop"
         @finish="onFinnish"
         @process="onProcess"
         ref="vac">
      <!--<span slot="process"
            slot-scope="{ timeObj }">
        {{ timeObj.ceil.s }}
      </span>-->
      <span slot="finish">Done!</span>
    </vac>
  </div>
</template>

<script>
  import {SECONDS} from "../../utils/constant";
  import {mapGetters, mapActions} from 'vuex';

  export default {
    name: "CountDown",
    data() {
      return {
        SECONDS
      }
    },
    computed: {
      ...mapGetters("game", ["processTimer", "timer", "startTimer"]),

    },
    methods: {
      ...mapActions("game", ["tickTimer", "stopTimer", "finishTimer","updateStateCounDown"]),
      handleStartTimer() {
        this.$refs.vac.startCountdown(true);
      },
      handleStopTimer() {
        this.$refs.vac.stopCountdown();
      },
      handleFinishTimer() {
        this.$refs.vac.finishCountdown();
      },

      // callback
      onStart(vm) { // eslint-disable-line

      },
      onStop(vm) { // eslint-disable-line
      },
      onFinnish(vm) { // eslint-disable-line
        //this.stopTimer();
        this.updateStateCounDown(true);

      },
      onProcess(vm) { // eslint-disable-linne
        if (!this.startTimer) return this.$refs.vac.stopCountdown();
        let processTimer = vm.$data.timeObj.ceil.s;
        this.tickTimer(processTimer);
      },
    },
    // watch
    watch: {
      startTimer(next, prev) { // eslint-disable-line
        console.log(next, prev);
        if (next === true && next !== prev) {
          this.handleStartTimer();
        }
      }
    }
  }
</script>

<style scoped>

</style>
