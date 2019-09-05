<template>
  <div class="process_box">
    <BoxKetQua />
    <NextProcess />
    <div v-show="!endProcess">
      <p class="process_box--question">
        <strong>{{question.question}} - {{question.id}}</strong>
      </p>
      <div class="process_box--answers">
        <button
          v-for="(answer, i) in answers"
          class="btn_answer"
          v-show="answered === null || answered === i"
          :key="i"
          @click="handleAnswer(i)"
        >{{answer.answer}}</button>
      </div>

<button @click="handleAnswertest()">next</button>

    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { sleep } from "../../api/base";
import BoxKetQua from "./BoxKetQua";
import NextProcess from "./NextProcess";

export default {
  name: "ProcessButPha",
  components: { NextProcess, BoxKetQua },
  props: ["items"],
  data() {
    return {
      postion: 0,
      answered: null
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
  methods: {
    ...mapActions("game", ["tickQuestion", "answerQuestion"]),
    async handleAnswer(index) {
      let is_correct = (this.answers[index]["is_correct"] == 1);
      this.answered = index;
      await this.answerQuestion({ index, is_correct });
      await sleep(1000);
      await console.log(is_correct ? "dung" : "sai");
      //todo: nex question
      this.answered = null;
      this.tickQuestion();
    },
    async handleAnswertest() {
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
</style>
