<template>
  <div>
      <!--<NextProcess v-show="isShowResult"/>-->
    <BoxKetQua v-show="isShowResult"/>
    <div v-show="!endProcess && !isShowResult">
      <transition name="bounce">
        <div v-if="show_question">
          <p class="title-s20">
            CÂU HỎI:
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
        show_correct:false
      };
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
        if (event.keyCode === 39) {
          if (!self.show_question) {
            self.show_question = !self.show_question;
          }
          else if (!self.show_answer) {
              self.show_answer = !self.show_answer;
            }          
        }
        else if(event.keyCode === 13){ 
          if (!self.start_timer) {
            //self.$eventHub.$emit("startCountdown");
            self.start_timer = !self.start_timer;
            self.startTimerLed();
          }
          else if (!self.isShowResult){
            if(self.finishedCounDown){  
              self.show_question = false;
              self.show_answer = false;
              setTimeout(function(){
                  self.isShowResult = true;  
              }, 1000); 
            }              
          }         
          else if (!self.show_correct){
            self.show_answer = true;
            self.show_correct = true;            
          }
        }
        else if(event.keyCode === 78){ 
          self.show_question = false;
          self.show_answer = false;
          self.show_correct = false;  
          self.isShowResult = false;  
          self.start_timer = false;             
          setTimeout(function(){
            self.tickQuestion();
          }, 1000); 
        }
      });
    },
    methods: {
      ...mapActions("game", ["tickQuestion", "answerQuestion", "startTimerLed"]),
      async showAnswerCorrect() {
        this.answered = null;
      }
    }
  };
</script>


<style scoped lang="scss">  
  .bounce-enter-active {
    animation: bounce-in .8s;
  }

  .bounce-leave-active {
    animation: bounce-in .8s reverse;
  }

  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.5);
    }
    100% {
      transform: scale(1);
    }
  }
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

</style>
