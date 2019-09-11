<template>
  <div class="content_center" :class="{no_center: isStarted && !endProcess}">
    <div>
      <MessageGameOver v-if="!nextRound && endProcess && showResult"/>
      <MessageNextRound v-if="nextRound && endProcess && showResult" :title="processTitle"/>
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
  import {getSESSION, SESSION} from "../../utils";
  import {sleep} from "../../api/base";

  let eventsRef = db.ref('events');

  export default {
    name: "DashBoard",
    components: {// eslint-disable-line
      ProcessButPha, ProcessVuotTroi, ProcessKienDinh,
      ProcessKhoiDong, ProcessCauHoiPhu, CountDown,
      MessageGameOver, MessageNextRound
    },
    data() {
      return {
        events: [],
        steps: steps,
        isShowWelcome: true,
        showResult: false,
      }
    },
    computed: {
      ...mapGetters("game", ["questions", "process", "isStarted", "endProcess", "processQuestion", "nextRound", "userStopGame"]),
      ...mapGetters("auth", ["user"]),
      layoutProcess() {
        try {
          return this.steps[this.process]['component'];
        } catch (e) {
          return false
        }
      },
      processTitle() {
        try {
          return this.questions[this.process + 1]['name'];
        } catch (e) {
          return false
        }
      },
      getIsNext() {
        try {
          // refresh
          let is_next = getSESSION(SESSION.IS_NEXT);
          if (is_next) return is_next;
          // loggedIn
          return getSESSION(SESSION.USER)['is_next'];
        } catch (e) {
          console.log(e.message);
          return null
        }
      }
    },
    firebase: {
      events: eventsRef
    },
    async mounted() {      
      if (this.getIsNext) { // null, false, true
        //let dataCurrentProcess = await this.fetchCurrentProcess();
        // console.log('dataCurrentProcess', dataCurrentProcess);
        // return await this.logout();
        this.startProcessGame();
      }else if(this.getIsNext === false){
        this.handleUserStopGame();
      }            
    },
    methods: {
      ...mapActions("game", ["startGame", "tickQuestion", "fetchCurrentProcess", "handleUserStopGame"]),
      ...mapMutations("game", ["setNextRound"]),
      ...mapActions("auth", ["logout"]),
      startProcessGame() {
        // do something
        //this.startGame();
        //this.isShowWelcome = false;

        //Nếu như F5 thì kiểm tra userStopgame
        if(this.userStopGame) 
        {
          eventsRef.off('value'); 
          return;
        }
        let self = this;
          eventsRef.on('value', function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
              let childData = childSnapshot.val();
              if (childData) {
                self.showResult = false;
                //Start Game
                if (childData.key == "start_game") {
                  self.startGame();
                  self.isShowWelcome = false;
                }
                //Next Question
                else if (childData.key == "next_question") {
                  self.tickQuestion();
                }
                //Get List User Next Round
                else if (childData.key == "result_round") {
                  var arrayNextRound = childData.arrayNextRound;
                  self.checkNextRound(arrayNextRound);
                }
              }
            });
          });      
      },
      async checkNextRound(arrayNextRound) {
        let user_id = this.user.id;
        this.showResult = true;        
        if(arrayNextRound  != undefined){
            if (arrayNextRound.includes(user_id)) {
              this.setNextRound(true);
            }
            else {
              //Bị Loại, redirect về dashboard
              this.setNextRound(false);
              this.handleUserStopGame(); 
              eventsRef.off('value'); 
            }
        } 
        else{
            //Bị Loại, redirect về dashboard
            this.handleUserStopGame();
            this.setNextRound(false);
            eventsRef.off('value'); 
        }       
      }
    },
    watch: {
      user(next, prev) {
        console.log('USER', next);
        try {
          if (next.is_next === false) {
            return alert(9)
          }
        } catch (e) {

        }
      }
    }

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
