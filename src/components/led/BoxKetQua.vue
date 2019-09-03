<template>
  <div>
    <div>
        <p class="process_box--question">
          <transition>
            <div>
                <p>Câu hỏi:</p>
            </div>                 
          </transition> 
        </p>
        <!--<transition>
          <div class="box-answers">
            <ul v-for="(answer, i) in answers"
              :class="['btn_answer', (answer.is_correct) == 1 ? 'active' : '']"
              v-show="answered === null || answered === i"
              :key="i">
              <li>{{answer.answer}}</li>
            </ul>
          </div>
        </transition>-->

      </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

  export default {
    name: "BoxKetQua",
    props: ["items"],
    data() {
      return {

      }
    },
    computed: {
    ...mapGetters("game", [
      "questions",
      "processQuestion",
      "finishedCounDown"
    ]),
    question() {   
      return this.items.questions[this.processQuestion].question;      
    },
    answers() {
      return this.items.questions[this.processQuestion].answers;      
    }
  },
    created() {   
      this.tickQuestion();            
    },
    methods: {
    ...mapActions("game", ["tickQuestion"])
    }
  }
</script>

<style scoped>
  .active{
    color:red;
  }

</style>
