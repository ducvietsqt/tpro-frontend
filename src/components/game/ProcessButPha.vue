<template>
  <div class="process_box">
    <BoxKetQua v-if="stopGame"/>
    <div v-if="!stopGame" class="question-detail">
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
  import api from '../../api/user';
  import {db} from "../../db";

  let eventsRef = db.ref('events');

  export default {
    name: "ProcessButPha",
    components: {BoxKetQua},
    props: ["items"],
    data() {
      return {
        answered: null,
        stopGame: false
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
        return this.questions[this.process].questions[this.processQuestion];
      }
    },
    created() {
      this.tickQuestion();
      this.endProcessGame();
    },
    firebase: {
      events: eventsRef
    },
    methods: {
      ...mapActions("game", ["tickQuestion", "answerQuestion","submitAnswer","setNextRound"]),
      async handleAnswer(index) {
        if(this.startTimer){
            // return false
            let is_correct = (this.answers[index]['is_correct'] == 1);
            this.answered = index;
            await this.answerQuestion({index, is_correct});
            await sleep(1000);
            //todo: nex question
            var user_id = this.user.id;
            var round_id = this.process + 1;
            let question_id = this.processQuestion + 1;
            var total_time = this.userAnswer.answered.time;
            var total_correct = 0;
            if (is_correct) {
                total_correct = 1;
            }
            this.submitAnswer(true);
            await api.submitAnnswer({user_id, answer: index, round_id, question_id, total_time,total_correct});
            await sleep(1000);
            if(question_id == 1){
              //Loại nếu như người chơi đó không trả lời được câu 1
              /*if(total_correct == 0){
                self.setNextRound(false);
                self.checkGroupNextRound();
              }*/
              this.checkGroupNextRound();
            }
            else{
              if(question_id == 10){
                if(total_correct == 0){
                  this.gameOver();
                }
                else{
                  this.setNextRound(false);
                  eventsRef.off('value');
                  this.$router.push({name: 'game-winner'})
                }
              }else{
                if(total_correct == 0)
                {
                  this.gameOver();
                }
              }
            }
        }
        //this.tickQuestion();
      },
      endProcessGame(){
        let self = this;
        eventsRef.on('value', function(snapshot) {
          snapshot.forEach(function(childSnapshot) {
                let childData = childSnapshot.val();
                if(childData){
                    if(childData.key == "stop_user_game"){
                        self.stopGame = true;
                    }
                }
            });
        });
      },
      async checkGroupNextRound(){
        let obj = await api.getListGroupNext();
        this.groupList = obj.data;
        let userGroup = this.user.group_id;
        let nextQuestion = false;
        for(let i=0; i < this.groupList.length; i++){
            if(this.groupList[i].id == userGroup){
              nextQuestion = true;
            }
        }
        if(!nextQuestion){
          this.gameOver();
        }
      },
      gameOver()
      {
          this.setNextRound(false);
          eventsRef.off('value');
          this.$router.push({name: 'end-game'})
      }
    },
    watch: {
      startTimer(n, p) { // eslint-disable-line
        if (n && n !== p) {
          this.answered = null;
        }
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
