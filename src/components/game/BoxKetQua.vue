<template>
  <div>
    <p class="text-highlight">
      <strong>
        KẾT QUẢ <br/>
        {{processTitle}}
      </strong>
    </p>
    <div class="question-detail">
      <div class="process_box--answers">
        <ol class="list_questions none-style">
          <li class="item active">
            <span class="dot_item"></span>
            <span>Trả lời đúng</span>
            <span> &nbsp;&nbsp;{{resultCorrect}}</span>
          </li>
          <li class="item active">
            <span class="dot_item"></span>
            <span>Thời gian</span>
            <span>&nbsp;&nbsp;{{timeCorrect}}s</span>
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex';
  import {db} from "../../db";
  import api from '../../api/user';
  import {sleep} from "../../api/base";

  let eventsRef = db.ref('events');
  export default {
    name: "BoxKetQua",
    data() {
      return {

      }
    },
    computed: {
      ...mapGetters("game", ["endProcess", "currentSubmitted", "resultsProcess", "questions", "process","processQuestion", "totalTimeAnsweredProcess"]),
      ...mapGetters("auth", ["user"]),
      processTitle() {
        try {
          return this.questions[this.process]['name'];
        }catch {
          return ''
        }
      },
      resultCorrect() {
        if(this.currentSubmitted) {
          return  this.currentSubmitted.total_score + '/' + this.questions[this.process]["questions"].length
        }
        return this.resultsProcess.length + '/' + this.questions[this.process]["questions"].length
      },
      timeCorrect() {
        if(this.currentSubmitted) {
          return this.currentSubmitted.total_time
        } else {
          return Math.round(this.totalTimeAnsweredProcess * 1000)/1000
        }

      },
      submittedRound() {
        return this.process > 0 && this.currentSubmitted !== null && this.process + 1 === this.currentSubmitted ['round_id'];
      }
    },
    created() {
      this.endProcessGame();
      // get process on created by v-if
      this.getResultProcess();
      if(this.process > 0) {
        this.submitUserAnnswer();
      }
    },
    firebase: {
      events: eventsRef
    },
    methods: {
      ...mapActions("game", ["getResultProcess"]),
      endProcessGame(){
        let self = this;
        eventsRef.on('value', function(snapshot) {
          snapshot.forEach(function(childSnapshot) {
                let childData = childSnapshot.val();
                if(childData){
                    if(childData.key == "stop_user_game"){
                        self.getResultProcess();
                    }
                }
            });
        });
      },
      async submitUserAnnswer(){
            await sleep(1000);
            let user_id = this.user.id;
            let round_id = this.process + 1;
            let question_id = this.processQuestion + 1;
            let total_time = this.totalTimeAnsweredProcess;
            let total_correct = this.resultsProcess.length;
            let answer = "";
            await api.submitAnnswer({user_id,answer: answer, round_id, question_id, total_time,total_correct});
      },

    },
    watch: {
     /* endProcess(n, p) { // eslint-disable-line
        if (n && n !== p) {
          this.getResultProcess();
          this.submitUserAnnswer();
        }
      }*/
    }
  }
</script>

<style scoped>

</style>
