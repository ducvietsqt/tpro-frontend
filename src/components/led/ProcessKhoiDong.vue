<template>
  <div>    
    <BoxKetQua v-if="isShowResult"/>    
    <div v-show="!endProcess && !isShowResult">
      <transition name="bounce">
        <div v-if="show_question">
          <p class="title-s20">
            CÂU HỎI {{processQuestion +1}}:
          </p>
          <p class="drs-s20">
            {{question}}
          </p>
        </div>
      </transition>
    </div>
    <transition name="fade" v-if="show_answer">
      <ol class="list_upper_question" :class="(show_correct) ? 'show_correct' : ''">
        <li v-for="(answer, i) in answers"
          :class="['btn_answer', (answer.is_correct) == 1 ? 'active' : '']"
          v-show="answered === null || answered === i"
          :key="i">
          {{answer.answer}}
        </li>
      </ol>
    </transition>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from "vuex";
  import NextProcess from "../../components/led/NextProcess";
  import BoxKetQua from "../../components/led/BoxKetQua";
  import Round from "../../components/led/Round";
  import { db } from "../../db";

  let eventsRef = db.ref('events');

  export default {
    name: "ProcessKhoiDongLed",
    components: {NextProcess, BoxKetQua, Round}, // eslint-disable-line
    props: ["items"],
    data() {
      return {
        postion: 0,
        answered: null,
        show_question: false,
        show_answer: false,
        start_timer: false,
        isShowResult: false,
        show_correct:false,
        events: [],
        indexLoop :0,
        eventName : null,
        keyEvent: null,
        isStop: false
      };
    },
    firebase: {
      events: eventsRef
    },
    computed: {
      ...mapGetters("game", [
        "questions",
        "process",
        "processQuestion",
        "isStarted",
        "endProcess",
        "finishedCounDown"
      ]),
      question() {
        return this.items.questions[this.processQuestion].question;
      },
      answers() {
        return this.items.questions[this.processQuestion].answerInfos;
      }
    },
    created() {
      this.tickQuestion();
    },
    mounted() {
      let self = this;
      window.addEventListener('keyup', function (event) {
        if (!self.isStop) {
          //Event Key Next => Show Question And Answer
          if (event.keyCode === 39) {
            //Show Question
            if (!self.show_question) {
              self.show_question = !self.show_question;
            }
            //Show Answer
            else if (!self.show_answer) {
              self.show_answer = !self.show_answer;
            }
          }
          //Event Key Enter => Start game, Next Question And Show result
          else if(event.keyCode === 13){
            //Show Count Down and Start Timer
            if (!self.start_timer) {
              //self.$eventHub.$emit("startCountdown");
              self.start_timer = !self.start_timer;
              self.startTimerLed();
              if(self.indexLoop == 0){
                self.eventName = "Start Game";
                self.keyName = "start_game";
              }
              else{
                self.eventName = "Next Question";
                self.keyName = "next_question";
              }
              eventsRef.remove();
              self.$firebaseRefs.events.push({
                name: self.eventName,
                key: self.keyName,
                postion: self.indexLoop
              });
            }
            //Show Progress Bar
            else if (!self.isShowResult){
              if(self.finishedCounDown){
                self.show_question = false;
                self.show_answer = false;
                setTimeout(function(){
                    self.isShowResult = true;
                }, 1000);
              }
            }
            //Show Correct Answer
            else if (!self.show_correct){
              self.show_answer = true;
              self.show_correct = true;
              //Update Total Score Group List              
              self.updateGroupList(true);
            }
          }
          //Event key "N"=> next question
          else if(event.keyCode === 78){
            self.show_question = false;
            self.show_answer = false;
            self.show_correct = false;
            self.isShowResult = false;
            self.start_timer = false;
            setTimeout(function(){
              self.tickQuestion();
              self.indexLoop++;
              //When Done Round=> Next Round
              if(self.endProcess){
                //Start Game
                self.startGame();
                //Update Status Show Welcome
                self.updateStatusWelcome(true);
                self.isStop = true;
              }
            }, 1000);
          }

          //Event key "S"=> Stop User Game
          else if(event.keyCode === 83){
            self.show_question = false;
            self.show_answer = false;
            self.show_correct = false;
            self.isShowResult = false;
            self.start_timer = false;
            eventsRef.remove();
            self.$firebaseRefs.events.push({
              name: "Stop User Game",
              key: "stop_user_game"
            });
          }


        }
      });
    },
    methods: {
      ...mapActions("game", ["startGame","tickQuestion", "answerQuestion", "startTimerLed","updateStatusWelcome","updateGroupList"]),
      async showAnswerCorrect() {
        this.answered = null;
      }
    }
  };
</script>
