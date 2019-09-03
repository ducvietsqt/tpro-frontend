<template>
  <div class="process_box">
    <BoxKetQua/>
    <NextProcess/>
    <div v-show="!endProcess">
      <p class="process_box--question">
        <strong>
          {{question}}
        </strong>
      </p>
      <div class="process_box--answers">
        <button v-for="(answer, i) in answers"
                class="btn_answer"
                :class="{correct: answered === i && answer['is_correct'] === '1', disable: answered !== null, 'in-correct': answered === i && answer['is_correct'] === '0'}"
                :key="i"
                @click="handleAnswer(i)">
          {{answer.answer}}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex';
  import {sleep} from "../../api/base";
  import BoxKetQua from "./BoxKetQua";
  import NextProcess from "./NextProcess";

  export default {
    name: "ProcessKhoiDong",
    components: {NextProcess, BoxKetQua},
    props: ["items"],
    data() {
      return {
        answered: null
      }
    },
    computed: {
      ...mapGetters("game", ["questions", "process", "processQuestion", "isStarted", "endProcess"]),
      question() {
        return this.items.questions[this.processQuestion].question
      },
      answers() {
        return this.items.questions[this.processQuestion].answers
      },
      correctQuestion() {
      // :class="{correct: answered === i && answer['is_correct'] === '1', disable: answered !== null, 'in-correct': answered !== null && answered !== i}"
        return 1;
      }
    },
    created() {
      this.tickQuestion();
    },
    methods: {
      ...mapActions("game", ["tickQuestion", "answerQuestion"]),
      async handleAnswer(index) {
        let is_correct = this.answers[index]['is_correct'] === '1';
        this.answered = index;
        await this.answerQuestion({index, is_correct});
        await sleep(1000);
        await console.log(is_correct ? 'dung' : 'sai');
        //todo: nex question
        this.answered = null;
        this.tickQuestion();
      }
    }
  }
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
    &.disable {
      pointer-events: none;
      opacity: 0.7;
    }
  }
</style>
