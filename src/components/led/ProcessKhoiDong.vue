<template>
  <div>
    <div class="process_box">      
      <NextProcess v-show="finishedCounDown"/>
      <BoxKetQua v-show="finishedCounDown"/>
      <div v-show="!endProcess">
        <p class="process_box--question">
          <transition name="bounce">
            <div v-if="show_question">
                {{question}}
            </div>                 
          </transition> 
        </p>
        <transition name="bounce">
          <div class="process_box--answers" v-if="show_answer">
            <button
              v-for="(answer, i) in answers"
              :class="['btn_answer', (answer.is_correct) == 1 ? 'active' : '']"
              v-show="answered === null || answered === i"
              :key="i">
                {{answer.answer}}
            </button>
          </div>
        </transition> 

      </div>
    </div>
  </div>  
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import NextProcess from "../../components/led/NextProcess";
import BoxKetQua from "../../components/led/BoxKetQua";

export default {
  name: "ProcessKhoiDongLed",
  components: { NextProcess, BoxKetQua},
  props: ["items"],
  data() {
    return {
      postion: 0,
      answered: null,
      show_question: false,
      show_answer:false,
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
      return this.items.questions[this.processQuestion].answers;
    }
  },
  created() {   
    this.tickQuestion();            
  },
  mounted() {
    let self = this;    
    window.addEventListener('keyup', function(event) {      
      if (event.keyCode === 13) {    
        if(!self.show_question){ 
          self.show_question = !self.show_question; 
        }   
        else{
          if(!self.show_answer)
          {         
            self.show_answer = !self.show_answer; 
          }   
          else{
              self.onFinishCounDown();
          }                 
        }
      }
    });
  },
  methods: {
    ...mapActions("game", ["tickQuestion", "answerQuestion","updateStateCounDown"]),
    async showAnswerCorrect() {                              
      this.answered = null;      
    },
    onFinishCounDown(){
        this.updateStateCounDown(true);
        alert(1);
        this.show_question = false;
        this.show_answer = false;
    }
  }
};
</script>


<style scoped lang="scss">
.btn_answer {
  &.correct {
    background: blue;
    color: #ffffff;
  }
  &.in-correct {
    background: red;
    color: #ffffff;
  }
}
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
.led_box {
    border: solid 1px red;
    position: fixed;
    right: 0px;
    top: 0px;
    padding: 20px;
  }
</style>
