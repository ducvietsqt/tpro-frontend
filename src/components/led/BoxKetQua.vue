<template>
  <div>
    <div>
            <div class="progress-bar-container">
              <div class="item">
                <div class="progress-bar stripes">
                  <span class="progress-bar-inner" style="animation-delay: 1.5s;">
                    <strong>25%</strong>
                  </span>
                </div>
                <p class="index_qs">A</p>
              </div>
              <div class="item">
                <div class="progress-bar stripes animated reverse slower">
                  <span class="progress-bar-inner"  style="animation-delay: 1s;">
                    <strong>25%</strong>
                  </span>
                </div>
                <p class="index_qs">B</p>
              </div>
              <div class="item">
                <div class="progress-bar stripes">
                  <span class="progress-bar-inner" style="animation-delay: 2s;">
                    <strong>25%</strong>
                  </span>
                </div>
                <p class="index_qs">C</p>
              </div>
              <div class="item">
                <div class="progress-bar stripes animated reverse slower">
                  <span class="progress-bar-inner"  style="animation-delay: 3s;">
                    <strong>25%</strong>
                  </span>
                </div>
                <p class="index_qs">D</p>
              </div>

            </div>
          </div>
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
