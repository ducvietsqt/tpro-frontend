<template>
  <div>
    <p class="text-highlight">
      Chúc mừng<br/>
      bạn đã vào vòng<br/>
      <strong>{{processTitle}}</strong>
    </p>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';

  export default {
    name: "MessageNextRound",
    data() {
      return {

      }
    },
    computed: {
      ...mapGetters("game", ["endProcess", "resultsProcess", "questions", "process", "totalTimeAnsweredProcess"]),
      processTitle() {
        return this.questions[this.process + 1]['name'];
      },
    },
    methods: {
    }
  }
</script>

<style scoped>

</style>
