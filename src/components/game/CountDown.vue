<template>
  <div>
    <p class="title_timer" v-show="!isStopTime">
      <strong> {{processTimer}}</strong>S
    </p>
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
      <!--<span slot="finish">Done!</span>-->
      <span slot="finish" v-show="isStopTime">Hết giờ!</span>
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
        SECONDS,
        isStopTime:false
      }
    },
    computed: {
      ...mapGetters("game", ["processTimer", "timer", "startTimer","process"]),

    },
    methods: {
      ...mapActions("game", ["tickTimer", "stopTimer", "finishTimer","stopTimerGame"]),
      handleStartTimer() {
        this.$refs.vac.startCountdown(true);
        this.isStopTime = false;
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
        if(this.process > 0 && this.process < 3){
          this.stopTimer();
        }        
        else{
          this.stopTimerGame();
          this.isStopTime = true;
        }
        return this.handleStopTimer();
      },
      onProcess(vm) { // eslint-disable-linne
        if (!this.startTimer) return this.handleStopTimer();
        let processTimer = vm.$data.timeObj.ceil.s;
        this.tickTimer(processTimer);
      },
    },
    // watch
    watch: {
      startTimer(next, prev) { // eslint-disable-line      
        if (next === true && next !== prev) {          
          this.handleStartTimer();
        }
      },
      endProcess(next, prev) {
        console.log(next, prev);
        if (next === true && prev === false) {
          this.handleStopTimer();
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .title_timer {
    color: #000;
    font-size: 18px;
    text-transform: uppercase;
    strong {
      font-size: 25px;
    }
  }
</style>
