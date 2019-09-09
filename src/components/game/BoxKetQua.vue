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
            <span>{{resultCorrect}}</span>
          </li>
          <li class="item active">
            <span class="dot_item"></span>
            <span>Thời gian</span>
            <span>{{totalTimeAnsweredProcess}}s</span>
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
      ...mapGetters("game", ["endProcess", "resultsProcess", "questions", "process", "totalTimeAnsweredProcess"]),
      ...mapGetters("auth", ["user"]),
      processTitle() {
        return this.questions[this.process]['name'];
      },
      resultCorrect() {
        return this.resultsProcess.length + '/' + this.questions[this.process]["questions"].length
      },
    },
    created() {      
      this.endProcessGame();
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
        let total_time = this.totalTimeAnsweredProcess;
        let total_correct = this.resultsProcess.length + '/' + this.questions[this.process]["questions"].length;      
        var answer = "";
        console.log("Total Correct:" +total_correct);
        //await api.submitAnnswer({user_id,answer: index, round_id, total_time,total_correct});
      }
    },
    watch: {
      endProcess(n, p) { // eslint-disable-line        
        if (n && n !== p) {          
          this.getResultProcess();
          this.submitUserAnnswer();
        }
      }
    }
  }
</script>

<style scoped>

</style>
