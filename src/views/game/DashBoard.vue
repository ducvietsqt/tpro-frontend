<template>
  <div class="content_center" :class="{no_center: isStarted && !endProcess}">
    <div>
      <MessageGameOver v-if="!nextRound && endProcess && showResult"/>
      <MessageNextRound v-if="nextRound && endProcess && showResult" :title="processTitle"/>
      <div class="led_box" v-show="isStarted && !endProcess">
        <CountDown/>
      </div>

      <div v-if="isShowWelcome || process === 'null'">
        <div>
          <p class="text-highlight">
            Chào mừng bạn <br/> đến với <br/>
            <strong>T-Pro Confetti</strong>
          </p>
        </div>
      </div>
    </div>
    <div v-if="isStartDashBoard">
      <div class="text-highlight" v-if="process && process >= 0">
        {{getQuestions[process]['name']}}
      </div>
      <component v-if="process === 0" is="ProcessKhoiDong"
                 :items="getQuestions[0]"></component>
      <component v-if="process === 1" is="ProcessKienDinh"
                 :items="getQuestions[1]"></component>
      <component v-if="process === 2" is="ProcessVuotTroi"
                 :items="getQuestions[2]"></component>

      <component v-if="process === 3" is="ProcessButPha"
                 :items="getQuestions[3]"></component>

      <component v-if="process === 4"
                 is="ProcessCauHoiPhu"
                 :items="getQuestions[4]"></component>
    </div>
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
  import {getSESSION, SESSION} from "../../utils";

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
        isStartDashBoard: null
      }
    },
    computed: {
      ...mapGetters("game", ["questions", "process", "isStarted", "endProcess", "processQuestion", "nextRound", "userStopGame"]),
      ...mapGetters("auth", ["user", "isLoggedInTemp"]),
      getQuestions() {
        return this.questions;
      },
      processTitle() {
        try {
          return this.questions[this.process + 1]['name'];
        } catch (e) {
          return false
        }
      },
      getIsNext() {
        let is_next = getSESSION(SESSION.NEXT_ROUND);
        if (is_next !== null) return is_next;
        // loggedIn
        return getSESSION(SESSION.USER)['is_next'] >= 0; // user['is_next'] : 0, 1, 2...
      },
      getIsLoggedInTemp() {
        return this.isLoggedInTemp;
      }
    },
    firebase: {
      events: eventsRef
    },
    async mounted() {

      // todo: game over
      if(getSESSION(SESSION.GAMEOVER))  {
        return  this.$router.push({name: 'end-game'});
      }

      // if (this.getIsNext) { // null, false, true
      console.log(this.getIsNext)
      if (this.getIsNext) { // null, false, true
        let dataCurrentProcess = await this.fetchCurrentProcess();
        console.log('dataCurrentProcess', dataCurrentProcess);
        if(dataCurrentProcess) {
          this.isStartDashBoard = true;
          this.startProcessGame();
        }

      }else if(this.getIsNext === false){
        this.handleUserStopGame();
        eventsRef.off('value');
      }

    },
    methods: {
      ...mapActions("game", ["startGame", "tickQuestion", "fetchCurrentProcess", "handleUserStopGame"]),
      ...mapMutations("game", ["setNextRound"]),
      ...mapActions("auth", ["logout"]),
      ...mapMutations("auth", ["setStatusLoggedInTemp"]),
      startProcessGame() {
        // do something
        //this.startGame();
        //this.isShowWelcome = false;

        // alert(this.getIsLoggedInTemp);
        //Nếu như F5 thì kiểm tra userStopgame
        if(this.userStopGame) return;
        let self = this;
        let isSubmitted = getSESSION(SESSION.SUBMITRESULTANSWER);         
          eventsRef.on('value', function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
              let childData = childSnapshot.val();
              if (childData) {
                self.showResult = false;
                //Start Game
                if (childData.key == "start_game") {
                  if(self.getIsLoggedInTemp || (self.process === null && self.processQuestion === null)) {
                    self.startGame();
                    self.isShowWelcome = false;
                    // alert(1)
                  }                  
                  self.setStatusLoggedInTemp(true);
                  // if(isSubmitted){
                  //   setSESSION(SESSION.SUBMITRESULTANSWER, false);    
                  // }                  
                }
                //Next Question
                else if (childData.key == "next_question") {
                 if(self.getIsLoggedInTemp) {
                   self.tickQuestion();
                 }else {
                  self.setStatusLoggedInTemp(true)
                 }

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
        if(arrayNextRound !== undefined){
          if (arrayNextRound.includes(user_id)) {
            this.setNextRound(true);
          }
          else {
            //Bị Loại
            this.gameOver();
          }
        }
        else{
          //Bị Loại
           this.gameOver();
        }
      },
      gameOver(){
        this.setNextRound(false);
        this.handleUserStopGame();
        eventsRef.off('value');
        this.$router.push({name: 'end-game'})
      }
    },
    watch: {
      user(next, prev) {
        console.log('USER', next);
        try {
          if (next.is_next === false) {
            // return alert(9)
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
