<template>
  <div>
    <div>
        <p class="process_box--question">
          <transition>
            <div>
                {{question}}
            </div>                 
          </transition> 
        </p>
        <transition>
          <div class="process_box--answers">
            <button
              v-for="(answer, i) in answers"
              :class="['btn_answer', (answer.is_correct) == 1 ? 'active' : '']"
              v-show="answered === null || answered === i"
              :key="i">
                {{answer.answer}}
            </button>
          </div>
        </transition> 

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
        "processQuestion"
      ]),
      question() {          
        return this.questions[this.processQuestion].question;
        //return this.items.questions[this.processQuestion].question;
      },
      answers() {
        //return this.items.questions[this.processQuestion].answers;
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

</style>
