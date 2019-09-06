<template>
  <div>
    <div v-show="!isFinish">
      <span>{{processTimer}}</span>S    
    </div>    
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
      <span slot="finish" v-show="isFinish">Hết giờ!</span>
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
        isFinish:false
      }
    },
    computed: {
      ...mapGetters("game", ["processTimer", "timer", "startTimerLed"]),

    },
    /*mounted(){
      let self = this;
        this.$eventHub.$on("startCountdown", function() {
          self.handleStartTimer();
        } );
    },*/
    methods: {
      ...mapActions("game", ["tickTimer", "stopTimer", "finishTimer", "updateStateCounDown"]),
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
        this.isFinish = true;
        this.updateStateCounDown(true);

      },
      onProcess(vm) { // eslint-disable-linne
        if (!this.startTimerLed) return this.$refs.vac.stopCountdown();
        let processTimer = vm.$data.timeObj.ceil.s;
        this.tickTimer(processTimer);
      },
    },
    // watch
    watch: {
      startTimerLed(next, prev) { // eslint-disable-line
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
