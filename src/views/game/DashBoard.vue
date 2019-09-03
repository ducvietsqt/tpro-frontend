<template>
  <div>
    <div class="led_box" v-show="isStarted && !endProcess">
      <CountDown/>
    </div>
    <p>
      <strong>Chào mừng bạn đến với T-Pro Confetti</strong>
    </p>
    <div v-if="!isStarted">
      <p>
        Các thí sinh sẽ bắt đầu chơi vòng thi khởi động: <br/>
        &nbsp;&nbsp;- mỗi câu sẽ có thơi gian trả lời là 10 giây, <br/>
        &nbsp;&nbsp;- trả lời đúng thì câu trả lời sẽ sáng lên <br/>
        &nbsp;&nbsp;- nếu không trả lời coi như sai
      </p>
      <p>
        <button @click.stop="startProcessGame">Bắt đầu vòng thi khởi động</button>
      </p>
    </div>
    <h1 v-if="finishedCounDown">CountDowned </h1>
    <h1 v-else>Not CountDown</h1>

    <div class="process-step" v-show="isStarted">
      <div v-for="(item, index) in steps" :key="index">
        <button class="item_btn" :class="{active: index === process}">{{item.title}}</button>
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

  export default {
    name: "DashBoard",
    components: {      
      ProcessButPha, ProcessVuotTroi, ProcessKienDinh, ProcessKhoiDong, ProcessCauHoiPhu, CountDown
    },
    data() {
      return {
        steps: [
          {
            title: 'Khoi dong',
            component: 'ProcessKhoiDong'
          },
          {
            title: 'Kien Dinh',
            component: 'ProcessKienDinh'
          },
          {
            title: 'Vuot troi',
            component: 'ProcessKhoiDong'
          },
          {
            title: 'But Pha',
            component: 'ProcessButPha'
          },
          {
            title: 'Cau hoi Phu',
            component: 'ProcessCauHoiPhu'
          },
        ],
      }
    },
    computed: {
      ...mapGetters("game", ["questions", "process", "isStarted", "endProcess","finishedCounDown"]),
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
    /*watch: {
      finishedCounDown(newValue, oldValue) { // eslint-disable-line
        console.log(`Updating from ${oldValue} to ${newValue}`);
      }
    }

    /*mounted() {      
    this.$store.watch(
        (state, getters) => getters.finishedCounDown,
        (newValue, oldValue) => {
          console.log(`Updating from ${oldValue} to ${newValue}`);

          // Do whatever makes sense now
          if (newValue) {
            this.complex = {
              deep: 'some deep object',
            };
          }
        },
      );
    },*/
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
