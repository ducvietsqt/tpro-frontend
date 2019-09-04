<template>
  <div class="main_layout">
    <BoxKetQua/>
    <!--<NextProcess/>-->
    <div class="main_screen">
        <div v-if="!endProcess" class="question-detail">
          <div class="process_box--question">
            <p class="text-center title-qs">
              Câu hỏi:
              {{processQuestion +1}}
              <!--{{titleQuestion}}-->
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
      titleQuestion() {
        return this.items.questions[this.processQuestion].id
      }
    },
    created() {
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
