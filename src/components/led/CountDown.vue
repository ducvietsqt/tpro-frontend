<template>
  <div>
    <div v-show="!isStopTimerLed">
      <span>{{processTimer}}</span>S
    </div>
    <div v-if="timerTotal">
      <vac :left-time="timerTotal"
           :auto-start="false"
           @start="onStart"
           @stop="onStop"
           @finish="onFinnish"
           @process="onProcess"
           ref="vacLed">
        <!--<span slot="process"
              slot-scope="{ timeObj }">
          {{ timeObj.ceil.s }}
        </span>-->
        <span slot="finish" v-show="isStopTimerLed">Hết giờ!</span>
      </vac>
    </div>
  </div>
</template>

<script>
  import {SECONDS, COUNT_DOWN_ALL_QUESTION, COUNT_DOWN_QUESTION} from "../../utils/constant";
  import {mapGetters, mapActions} from 'vuex';
  import {getQuestionsCount} from "../../store/modules/game";
  import api from "../../api/led";
  export default {
    name: "CountDown",
    data() {
      return {
        SECONDS
      }
    },
    computed: {
      ...mapGetters("game", ["processTimer", "timer","process", "processQuestion", "startTimerLed", "isStopTimerLed"]),
      timerTotal() {
        try {          
          if(this.process > 0 && this.process <3) return COUNT_DOWN_ALL_QUESTION * SECONDS;
          return COUNT_DOWN_QUESTION * SECONDS;
          // return getQuestionsCount(this.process) * COUNT_DOWN_ALL_QUESTION * SECONDS;
        }catch (e) {
          return false
        }
      }
    },
    /*mounted(){
      let self = this;
        this.$eventHub.$on("startCountdown", function() {
          self.handleStartTimer();
        } );
    },*/
    methods: {
      ...mapActions("game", ["tickTimer", "stopTimer", "finishTimer", "updateStateCounDown", "stopTimerLed"]),
      handleStartTimer() {
        this.$refs.vacLed.startCountdown(true);
      },
      handleStopTimer() {
        this.$refs.vacLed.stopCountdown();
      },
      handleFinishTimer() {
        this.$refs.vacLed.finishCountdown();
      },

      // callback
      onStart(vm) { // eslint-disable-line
        // alert(1);
        
        
      },
      onStop(vm) { // eslint-disable-line
      },
      onFinnish(vm) { // eslint-disable-line
        //this.stopTimer();
        this.stopTimerLed();
        this.updateStateCounDown(true);

      },
      onProcess(vm) { // eslint-disable-linne

        if (!this.startTimerLed) return this.$refs.vacLed.stopCountdown();
        let processTimer = vm.$data.timeObj.ceil.s;
        let is_countdown_all = this.process > 0 && this.process <3;
        this.tickTimer({processTimer, is_countdown_all});
      },
    },
    // watch
    watch: {
      startTimerLed: function (next, prev) { // eslint-disable-line        
        if (next === true && next !== prev) {
          this.handleStartTimer();
        }
      }
    }
  }
</script>

<style scoped>

</style>
