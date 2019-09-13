<template>
  <div>    
    <div class="text-waiting" v-if="isBegin">
        <p class="title-center-box">Bắt đầu!</p>
      </div>
    <div v-if="!endProcess && !isShowResult">
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
      <ol class="list_upper_question show_correct"> 
        <li v-for="(answer, i) in answers"
          :class="['btn_answer', (answer.is_correct) == 1 ? 'active' : '']"
          v-if="answered === null || answered === i"
          :key="i">
          {{answer.answer}}
        </li>
      </ol>
    </transition>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from "vuex";  
  import BoxKetQua from "../../components/led/BoxKetQua";  
  import { db } from "../../db";

  let eventsRef = db.ref('events');

  export default {
    name: "ProcessVuotTroiLed",
    components: {BoxKetQua}, // eslint-disable-line
    props: ["items"],
    data() {
      return {
        answered: null,
        show_question: false,
        show_answer: false,
        start_timer: false,
        isShowResult: false,
        show_correct:false,
        events: [],
        isBegin: false,
        isStop: false,
        showTotalChoice: false
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
      //this.tickQuestion();
    },
    mounted() {
      let self = this;
      window.addEventListener('keyup', function (event) {
        if (!self.isStop) {       
          if (event.keyCode === 39) {             
            if (!self.show_question) {
              self.isBegin = false;                                      
              self.show_question = !self.show_question;
              self.show_answer = !self.show_answer;          
              self.start_timer = false;    
              self.tickQuestion();
            }            
            else{            
              self.show_question = false;
              self.show_answer = false;                    
              self.start_timer = false;      
            }       
          }

          //Event Key Enter => Start game, Next Question And Show result
          else if(event.keyCode === 13){ 
            //Show Count Down and Start Timer
            self.isBegin = true;
            self.updateStatusWelcome(false);
            self.start_timer = !self.start_timer;
            self.startTimerLed();
            eventsRef.remove();
            self.eventName = "Start Game";
            self.keyName = "start_game";
            self.$firebaseRefs.events.push({
              name: self.eventName,
              key: self.keyName,
            });
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
              //When Done Round=> Next Round
              if(self.endProcess){
                if(self.showTotalChoice){
                  self.startGame();
                  self.updateStatusWelcome(true);
                  self.updateGroupList(false);
                  self.isStop = true;
                }                
                self.showTotalChoice = true;
              }
            }, 1000); 
          }
        }        
      });      
    },
    methods: {
      ...mapActions("game", ["startGame","tickQuestion", "answerQuestion", "startTimerLed","updateStatusWelcome","updateGroupList"]),
    }
  };
</script>
