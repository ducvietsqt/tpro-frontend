<template>
  <div>
    <p class="title_timer" v-show="!isStopTime">
      <strong> {{Math.ceil(processTimer)}}</strong>S
    </p>
    <vac :left-time="timer * SECONDS"
         :auto-start="false"
         @start="onStart"
         @stop="onStop"
         @finish="onFinnish"
         @process="onProcess"
         :speed="SPEED_COUNTDOWN"
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
  import {setSESSION, SESSION} from "../../utils";
  import {SECONDS, SPEED_COUNTDOWN} from "../../utils/constant";
  import {mapGetters, mapActions} from 'vuex';

  export default {
    name: "CountDown",
    data() {
      return {
        SECONDS, SPEED_COUNTDOWN,
        isStopTime:false
      }
    },
    computed: {
      ...mapGetters("game", ["questions","isSubmitAnswer","processQuestion","processTimer", "timer", "startTimer","process","resultsProcess","totalTimeAnsweredProcess"]),
      ...mapGetters("auth", ["user"]),
    },
    methods: {
      ...mapActions("game", ["tickTimer", "stopTimer", "finishTimer","stopTimerGame","answerQuestion","submitAnswer"]),
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
        console.log("Start");
        this.submitAnswer(false);
      },
      onStop(vm) { // eslint-disable-line

      },
      async onFinnish(vm) { // eslint-disable-line
        if(this.process > 0 && this.process < 3){
          this.stopTimer();
        }
        else{
          if(!this.isSubmitAnswer){
            let is_correct = false;
            await this.answerQuestion();
          }
          this.stopTimerGame();
          this.isStopTime = true;
        }
        return this.handleStopTimer();
      },
      onProcess(vm) { // eslint-disable-linne
        if (!this.startTimer) return this.handleStopTimer();
        // let processTimer = vm.$data.timeObj.ceil.s;
        let processTimer = vm.$data.timeObj.org.s;
        //processTimer = Math.round(processTimer * 1000)/1000;
        setSESSION(SESSION.PROCESS_TIMER, processTimer);
        //this.tickTimer(Math.ceil(processTimer));
        //this.tickTimer(processTimer);
        this.tickTimer(processTimer);

      }
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
          this.submitAnnswer();

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
