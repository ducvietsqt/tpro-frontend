<template>
  <div class="content_center" :class="{no_center: isStarted && !endProcess}">
    <div>
      <div class="led_box" v-show="isStarted && !endProcess">
        <CountDown/>
      </div>
      <div v-if="isShowWelcome">
        <div>
          <p class="text-highlight">
            Chào mừng bạn <br/> đến với <br/>
            <strong>T-Pro Confetti</strong>
          </p>
        </div>
      </div>
      <div v-if="!isStarted" class="box_nex_process">
        <p style="text-align: center">
          <button class="start-game" @click.stop="startProcessGame">Bắt đầu</button>
        </p>
      </div>
    </div>

    <component :is="layoutProcess"
               :items="questions[process]"></component>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex';
  import CountDown from "../../components/game/CountDown";
  import ProcessKhoiDong from "../../components/game/ProcessKhoiDong";
  import ProcessKienDinh from "../../components/game/ProcessKienDinh";
  import ProcessVuotTroi from "../../components/game/ProcessVuotTroi";
  import ProcessButPha from "../../components/game/ProcessButPha";
  import ProcessCauHoiPhu from "../../components/game/ProcessCauHoiPhu";
  import {steps} from "../../components/utils/steps";

  export default {
    name: "DashBoard",
    components: {
      ProcessButPha, ProcessVuotTroi, ProcessKienDinh, ProcessKhoiDong, ProcessCauHoiPhu, CountDown // eslint-disable-line
    },
    data() {
      return {
        steps: steps,
        isShowWelcome: true
      }
    },
    computed: {
      ...mapGetters("game", ["questions", "process", "isStarted", "endProcess"]),
      layoutProcess() {
        try {
          return this.steps[this.process]['component'];
        } catch (e) {
          return false
        }
      }
    },
    created() {

    },
    methods: {
      ...mapActions("game", ["startGame"]),
      startProcessGame() {
        // do something
        this.startGame();
        this.isShowWelcome = false;
      },
    },

  }
</script>

<style scoped lang="scss">
  .process-step {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    .item_btn {
      outline: none;
      opacity: 0.8;
      pointer-events: none;

      &.active {
        opacity: 1;
        background: blue;
        color: #ffffff;
      }
    }
  }
</style>
