<template>
  <div>
      <div class="led_box" v-if="show_count_down">
        <CountDown/>        
      </div>
    <div class="process_box">      
      <NextProcess />    
      <div v-show="!endProcess">
        <p class="process_box--question">
          <transition name="bounce">
            <div class="alert alert-success" v-if="show_question">
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
import { sleep } from "../../api/base";
import NextProcess from "../../components/led/NextProcess";
import CountDown from "../../components/led/CountDown";

export default {
  name: "ProcessKhoiDongLed",
  components: { NextProcess,  CountDown },
  props: ["items"],
  mixins: [CountDown],
  data() {
    return {
      postion: 0,
      answered: null,
      show_question: false,
      show_answer:false,
      show_count_down:false
    };
  },
  computed: {
    ...mapGetters("game", [
      "questions",
      "process",
      "processQuestion",
      "isStarted",
      "endProcess"
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
    var self = this;
    window.addEventListener('keyup', function(event) {      
      if (event.keyCode === 13) {         
        if(!this.show_question){
          self.showQuestion(); 
          this.show_question = !this.show_question; 
        }   
        else{
          if(!this.show_answer)
          {
            self.showAnswer();  
            this.show_answer = !this.show_answer; 
          }          
          else{
              self.showCountDown();       
              this.show_question = false; 
              this.show_answer = false;        
              this.show_count_down = !this.show_count_down; 
              this.endProcess = false; 
          }
        }
      }
    });
  },
  methods: {
    ...mapActions("game", ["tickQuestion", "answerQuestion"]),
    async showAnswerCorrect() {      
      var self = this;                          
      this.answered = null;      
    },
    showQuestion(){
      this.show_question = !this.show_question;
    },
    showAnswer(){
      this.show_answer = !this.show_answer;
    },
    showCountDown(){
      this.show_count_down = !this.show_count_down;  
      this.show_question = false; 
      this.show_answer = false;  
      this.tickQuestion();                
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
