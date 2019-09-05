<template>
  <div>
    <div class="process_box">
      <NextProcess v-show="isShowResult"/>
      <BoxKetQua v-show="isShowResult"/>
      <div v-show="!endProcess && !isShowResult">
        <div class="process_box--question">
          <transition name="bounce">
            <div v-if="show_question">
              <p>Câu hỏi: {{question}}</p>
            </div>
          </transition>
        </div>
      </div>
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
        isShowResult: false
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
        if (event.keyCode === 13) {
          if (!self.show_question) {
            self.show_question = !self.show_question;
          }
          else {
            if (!self.show_answer) {
              self.show_answer = !self.show_answer;
            }
            else if (!self.start_timer) {
              //self.show_question = false;
              //self.show_answer = false;
              //self.$eventHub.$emit("startCountdown");
              self.start_timer = !self.start_timer;
              self.startTimerLed();
            }
            else {
              self.isShowResult = true;
              self.show_answer = true;
              self.start_timer = true;
              self.show_question = true;
            }
          }
        }
      });
    },
    methods: {
      ...mapActions("game", ["tickQuestion", "answerQuestion", "startTimerLed"]),
      async showAnswerCorrect() {
        this.answered = null;
      },
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
