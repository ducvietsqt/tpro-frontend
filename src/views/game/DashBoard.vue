<template>
  <div class="content_center" :class="{no_center: isStarted && !endProcess}">
    <div>      
      <MessageGameOver v-show="!nextRound && endProcess && showResult"/>
      <MessageNextRound v-show="nextRound && endProcess && showResult" :title="processTitle"/>
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
      <!--<div v-if="!isStarted" class="box_nex_process">
        <p style="text-align: center">
          <button class="start-game" @click.stop="startProcessGame">Bắt đầu</button>
        </p>
      </div>-->
    </div>

    <component :is="layoutProcess"
               :items="questions[process]"></component>
  </div>
</template>

<script>
  import {mapGetters, mapActions, mapMutations} from 'vuex';
  import CountDown from "../../components/game/CountDown";
  import ProcessKhoiDong from "../../components/game/ProcessKhoiDong";
  import ProcessKienDinh from "../../components/game/ProcessKienDinh";
  import ProcessVuotTroi from "../../components/game/ProcessVuotTroi";
  import ProcessButPha from "../../components/game/ProcessButPha";
  import ProcessCauHoiPhu from "../../components/game/ProcessCauHoiPhu";
  import {steps} from "../../components/utils/steps";
  import MessageGameOver from "../../components/game/MessageGameOver";
  import MessageNextRound from "../../components/game/MessageNextRound";
  import {db} from "../../db";
  import NextProcess from "../../components/game/NextProcess";
  let eventsRef = db.ref('events');

  export default {
    name: "DashBoard",
    components: {// eslint-disable-line
      ProcessButPha, ProcessVuotTroi, ProcessKienDinh, 
      ProcessKhoiDong, ProcessCauHoiPhu, CountDown,
      MessageGameOver,MessageNextRound
    },
    data() {
      return {
        events: [],
        steps: steps,
        isShowWelcome: true,
        showResult: false    
      }
    },
    computed: {
      ...mapGetters("game", ["questions", "process", "isStarted", "endProcess","processQuestion","nextRound"]),
      ...mapGetters("auth", ["user"]),
      layoutProcess() {
        try {
          return this.steps[this.process]['component'];
        } catch (e) {
          return false
        }
      },
      processTitle(){
        try {
          return this.questions[this.process]['name'];
        } catch (e) {
          return false
        }        
      }
    },
    firebase: {
      events: eventsRef
    },
    mounted(){
      this.startProcessGame();
    },
    methods: {
      ...mapActions("game", ["startGame","tickQuestion","setNextRound"]),
      ...mapMutations("game", ["setNextRound"]),
      startProcessGame() {
        // do something
        //this.startGame();
        //this.isShowWelcome = false;
        let self = this;
        eventsRef.on('value', function(snapshot) {
          snapshot.forEach(function(childSnapshot) {
                let childData = childSnapshot.val();
                if(childData){
                  self.showResult = false;        
                  //Start Game
                    if(childData.key == "start_game"){
                        self.startGame();
                        self.isShowWelcome = false;
                    }
                    //Next Question
                    else if(childData.key == "next_question")
                    {
                      self.tickQuestion();
                    }
                    //Get List User Next Round
                    else if(childData.key == "result_round"){                      
                      var arrayNextRound = childData.arrayNextRound;
                      self.checkNextRound(arrayNextRound);
                    }
                }
            });
        });
      },
      checkNextRound(arrayNextRound){        
        let user_id = this.user.id;        
        let self = this;               
        this.showResult = true;        
        if(arrayNextRound.includes(user_id)){          
          self.setNextRound(true);
        }
        else{
          self.setNextRound(false); 
        }
      }
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
