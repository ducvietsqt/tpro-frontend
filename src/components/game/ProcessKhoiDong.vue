<template>
  <div class="process_box">
    <BoxKetQua/>
    <!--<NextProcess/>-->
    <div v-if="!endProcess" class="question-detail">
      <div class="process_box--question">
        <p class="text-center title-qs">
          Câu hỏi {{processQuestion +1}}:
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
</template>

<script>
  import {mapGetters, mapActions} from 'vuex';
  import {sleep} from "../../api/base";
  import BoxKetQua from "./BoxKetQua";
  import NextProcess from "./NextProcess";
  import api from '../../api/user';

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
      ...mapGetters("game", ["questions", "process", "processQuestion", "isStarted", "endProcess","startTimer"]),
      ...mapGetters("auth", ["user"]),
      question() {        
        return this.items.questions[this.processQuestion].question
      },
      answers() {
        return this.items.questions[this.processQuestion].answerInfos
      },
      titleQuestion() {
        return this.items.questions[this.processQuestion].id
      },
      userAnswer(){
        return this.items.questions[this.processQuestion];
      }
    },
    created() {
      this.tickQuestion();
    },
    methods: {
      ...mapActions("game", ["tickQuestion", "answerQuestion"]),
      async handleAnswer(index) {
        if(this.startTimer){          
            // return false
            let is_correct = (this.answers[index]['is_correct'] == 1);
            this.answered = index;
            await this.answerQuestion({index, is_correct});
            await sleep(1000);
            //todo: nex question
            this.answered = null;
            var user_id = this.user.id;
            var round_id = this.process + 1;
            var total_time = this.userAnswer.answered.time;
            var total_correct = 0;
            if (is_correct) {
                total_correct = 1;
            }
        }        
        //await api.submitAnnswer({user_id,answer: index, round_id, total_time,total_correct});
        //this.tickQuestion();
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
