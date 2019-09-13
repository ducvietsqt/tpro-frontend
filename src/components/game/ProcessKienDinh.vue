<template>
  <div class="process_box" v-show="!showResult">
    <BoxKetQua v-if="endProcess || submittedKienDinh"/>
    <div v-if="!endProcess && !submittedKienDinh" class="question-detail">
      <div class="process_box--question">
        <p class="text-center title-qs">
          Câu hỏi {{processQuestion +1}}:
        </p>
        <p class="drs-qs">
          {{question}}
        </p>
      </div>
      <div class="process_box--answers">
        <ol class="list_questions">
          <li v-for="(answer, i) in answers"
              class="item"
              :class="{active: answered === i, correct: answered === i && answer['is_correct'] === '1', disable: answered !== null, 'in-correct': answered === i && answer['is_correct'] === '0'}"
              :key="i"
              @click.stop="handleAnswer(i)">
            <span class="dot_item"></span>
            {{answer.answer}}
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex';
  import {sleep} from "../../api/base";
  import BoxKetQua from "./BoxKetQua";

  export default {
    name: "ProcessKienDinh",
    components: {BoxKetQua},
    props: ["items"],
    data() {
      return {
        answered: null,
        showResult: false,
        isSubmitted: false
      }
    },
    computed: {
      ...mapGetters("game", ["questions", "currentSubmitted", "process", "processQuestion", "isStarted", "endProcess", "startTimer", "nextRound"]),
      ...mapGetters("auth", ["user"]),
      question() {
        return this.items.questions[this.processQuestion].question
      },
      answers() {
        return this.questions[this.process].questions[this.processQuestion].answerInfos
      },
      titleQuestion() {
        return this.items.questions[this.processQuestion].id
      },
      submittedKienDinh() {
        return this.currentSubmitted !== null && this.currentSubmitted ['round_id'] === 2;
      }
    },
    created() {
      if(this.currentSubmitted && this.currentSubmitted ['round_id']) {
        return;
      }
      this.tickQuestion();
    },
    methods: {
      ...mapActions("game", ["tickQuestion", "answerQuestion"]),
      async handleAnswer(index) {
        // return false
        let is_correct = (this.answers[index]['is_correct'] == 1);
        this.answered = index;
        await this.answerQuestion({index, is_correct});
        await sleep(1000);
        //todo: nex question
        this.answered = null;
        this.tickQuestion();
      },
    },

    watch: {
      nextRound: function (t, n) { // eslint-disable-line
        this.showResult = true;
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
