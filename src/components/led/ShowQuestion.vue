<template>
  <div>
    <Round/>
    <div class="contain_led_show">
      <div class="left_contain">        
        <TotalNextRound/>
        <Welcome/>
        <component :is="layoutProcess" :items="questions[process]"></component>
      </div>
      <div class="line_contain">
      </div>
      <Group v-show="!showTotalUpdate"/>
      <TotalNextRoundUpdate v-show="showTotalUpdate"/>
    </div>
  </div>
</template>


<script>
  import {mapGetters, mapActions} from "vuex";
  import ProcessKhoiDongLed from "../../components/led/ProcessKhoiDong";
  import ProcessKienDinhLed from "../../components/led/ProcessKienDinh";
  import ProcessVuotTroiLed from "../../components/led/ProcessVuotTroi";
  import ProcessButPhaLed from "../../components/led/ProcessButPha";
  import ProcessCauHoiPhuLed from "../../components/led/ProcessCauHoiPhu";
  import CountDown from "../../components/led/CountDown";
  import Round from "../../components/led/Round";
  import Group from "../../components/led/Group";
  import Welcome from "../../components/led/Welcome";
  import TotalNextRound from "../../components/led/BoxTotalNextRound";
  import TotalNextRoundUpdate from "../../components/led/BoxTotalNextRoundUpdate";  
  import {db} from "../../db";

  let eventsRef = db.ref('events');
  export default {
    name: "ShowQuestion",
    components: {
      ProcessKhoiDongLed,
      ProcessKienDinhLed,
      ProcessVuotTroiLed,
      ProcessButPhaLed,
      ProcessCauHoiPhuLed,
      CountDown,
      Round,
      Group,
      Welcome,
      TotalNextRound,
      TotalNextRoundUpdate
    },

    data() {
      return {
        events: [],
        show_question: false,
        isStop: false, 
        showTotalUpdate:false,       
        steps: [
          {
            title: "Vòng Khởi Động",
            component: "ProcessKhoiDongLed"
          },
          {
            title: "Vòng Kiên Định",
            component: "ProcessKienDinhLed"
          },
          {
            title: "Vòng Vượt Trội",
            component: "ProcessVuotTroiLed"
          },
          {
            title: "Vòng Bứt Phá",
            component: "ProcessButPhaLed"
          },
          {
            title: "Vòng Phụ",
            component: "ProcessCauHoiPhuLed"
          }
        ]
      };
    },
    computed: {
      ...mapGetters("game", [
        "questions",
        "process",
        "processQuestion",
        "isStarted",
        "isReady",
        "endProcess"
      ]),
      layoutProcess() {
        try {
          return this.steps[this.process]["component"];
        } catch (e) {
          return false;
        }
      }
    },
    mounted() {
      //this.startProcessGame();
      let self = this;
      window.addEventListener('keyup', function (event) {
        if (!self.isStop) {
          if (event.keyCode === 39) {
            self.setStateReady(true);
            self.updateStatusWelcome(true);
            if (self.isReady && self.show_question) {
              //eventsRef.remove();              
              self.startGame();
              self.stopTimerRound();
              self.updateStatusWelcome(false);
              self.isStop = true;              
            }
            self.show_question = true;
          }
        }
      });      
    },
    firebase: {
      events: eventsRef
    },
    methods: {
      ...mapActions("game", ["startGame", "stopTimerRound", "setStateReady", "updateStatusWelcome"]),
      /*startProcessGame(){
        let self = this;
        eventsRef.on('value', function(snapshot) {
          snapshot.forEach(function(childSnapshot) {
                let childData = childSnapshot.val();
                if(childData){
                    if(childData.key == "play_game"){
                      //self.startTimerRound();
                    }
                    else if(childData.key == "start_game"){
                        self.startGame();
                        self.stopTimerRound();
                    }
                }
            });
        });
      }*/      
    },
    watch: {
      endProcess(n, p) { // eslint-disable-line        
        if (n && n !== p) {      
          this.showTotalUpdate = true;
        }
      }
    }
  };
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

  .group-data {
    display: flex;
    align-items: center;
    margin-top: 20px;
    margin-left: 20px;
    border-bottom: 2px solid #ccc;
    padding: 20px;
  }

  .group-icon {
    flex-grow: 1;
  }

  .group-stats {
    flex-grow: 8;
    text-align: left;
    padding-left: 20px;
  }

  .group-stats .location {
    font-size: 30px;
  }

  .group-temp {
    flex-grow: 1;
    font-size: 35px;
  }

  img {
    width: 70px;
  }

  button {
    padding: 10px;
    background-color: #1aa832;
    color: white;
    border: 1px solid #ccc;
  }
</style>
