<template>
  <div>
    <p>
      <strong>
        {{question}}
      </strong>
    </p>
    <div>
      <button v-for="(answer, i) in answers"
              class="btn_answer"
              :key="i"
              @click="handleAnswer(i)">
        {{answer.answer}}
      </button>
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex';
  import {sleep} from "../../api/base";

  export default {
    name: "ProcessKhoiDong",
    props: ["items"],
    data() {
      return {}
    },
    computed: {
      ...mapGetters("game", ["questions", "process", "processQuestion", "isStarted"]),
      question() {
        return this.items.questions[this.processQuestion].question
      },
      answers() {
        return this.items.questions[this.processQuestion].answers
      }
    },
    created() {
      this.tickQuestion();
    },
    methods: {
      ...mapActions("game", ["tickQuestion", "answerQuestion"]),
      async handleAnswer(index) {
        let is_correct = this.answers[index]['is_correct'] === '1';
        await this.answerQuestion({index, is_correct});
        await sleep(2000)
        await console.log(is_correct ? 'dung' : 'sai');
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
  }
</style>
