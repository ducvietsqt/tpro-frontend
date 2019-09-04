<template>
  <div>
    <div>
      <div class="led_box" v-show="isStarted && !endProcess">
        <CountDown/>
      </div>
      <div>
        <p class="text-highlight">
          Chào mừng bạn <br/> đến với <br/>
          <strong>T-Pro Confetti</strong>
        </p>
      </div>
      <div v-if="!isStarted">
        <p style="text-align: center">
          <button @click.stop="startProcessGame">Bắt đầu vòng thi khởi động</button>
        </p>
      </div>

    </div>
    <component :is="layoutProcess"
               :items="questions[process]"></component>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex';
  import CountDown from "../components/game/CountDown";
  import ProcessKhoiDong from "../components/game/ProcessKhoiDong";
  import ProcessKienDinh from "../components/game/ProcessKienDinh";
  import ProcessVuotTroi from "../components/game/ProcessVuotTroi";
  import ProcessButPha from "../components/game/ProcessButPha";
  import ProcessCauHoiPhu from "../components/game/ProcessCauHoiPhu";
  import TestSocket from "../components/led/HandlerSocket";
  import {steps} from "../components/utils/steps";

  export default {
    name: "DashBoard",
    components: {
      TestSocket,
      ProcessButPha, ProcessVuotTroi, ProcessKienDinh, ProcessKhoiDong, ProcessCauHoiPhu, CountDown // eslint-disable-line
    },
    data() {
      return {
        steps: steps
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

  .led_box {
    border: solid 1px red;
    position: fixed;
    right: 0px;
    top: 0px;
    padding: 20px;
  }
</style>
