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
            <div v-if="show_question">
                {{question.question}} - {{question.id}}
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
import CountDown from "../../components/led/CountDown";

export default {
  name: "ProcessButPhaLed",
  components: { NextProcess,  CountDown },
  props: ["items"],
  mixins: [CountDown],
  data() {
    return {
      postion: 0,
      answered: null,
      show_question: false,
      show_answer:false,
      show_count_down:false,
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
      return this.items.questions[this.processQuestion];
    },
    answers() {
      return this.items.questions[this.processQuestion].answerInfos;
    }
  },
  created() {
    this.tickQuestion();
  },
  mounted() {
    var self = this;
    window.addEventListener('keyup', function(event) {
      if (event.keyCode === 13) {
        if(!self.show_question){
          self.showQuestion();
          self.show_question = !self.show_question;
        }
        else{
          if(!self.show_answer)
          {
            self.showAnswer();
            self.show_answer = !self.show_answer;
          }
          else{
              self.showCountDown();
              self.show_question = false;
              self.show_answer = false;
              self.show_count_down = !self.show_count_down;
          }
        }
      }
    });
  },
  methods: {
    ...mapActions("game", ["tickQuestion", "answerQuestion"]),
    async showAnswerCorrect() {
      this.answered = null;
    },
    showQuestion(){
      self.show_question = !self.show_question;
    },
    showAnswer(){
      self.show_answer = !self.show_answer;
    },
    showCountDown(){
      self.show_count_down = !self.show_count_down;
      self.show_question = false;
      self.show_answer = false;
      //this.tickQuestion();
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

</style>
