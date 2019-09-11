<template>
  <div>
    <BoxKetQua/>
    <NextProcess/>
    <div v-show="!endProcess">
      <p class="process_box--question">
        <strong>
          {{question}}
        </strong>
      </p>
      <div class="process_box--answers">
        <button v-for="(answer, i) in answers"
                class="btn_answer"
                v-show="answered === null || answered === i"
                :key="i"
                @click="handleAnswer(i)">
          {{answer.answer}}
        </button>
      </div>
    </div>
    <slot>
      Hello question
    </slot>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import BoxKetQua from "./BoxKetQua";
  import NextProcess from "./NextProcess";

  export default {
    name: "WrapperProcess",
    components: {NextProcess, BoxKetQua},
    computed: {
      ...mapGetters("game", ["questions", "process", "processQuestion", "isStarted", "endProcess"]),
      question() {
        return this.items.questions[this.processQuestion].question
      },
      answers() {
        return this.items.questions[this.processQuestion].answers
      }
    },
  }
</script>

<style scoped>

</style>
