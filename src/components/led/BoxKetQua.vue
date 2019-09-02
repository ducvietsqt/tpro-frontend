<template>
  <div v-show="endProcess">
    Kết Quả <strong>{{processTitle}}</strong><br>
    Trả lời đúng: <strong>{{resultCorrect}}</strong> <br>
    Thời gian trả lời: <strong>{{totalTimeAnsweredProcess}}s</strong> <br>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex';

  export default {
    name: "BoxKetQua",
    data() {
      return {

      }
    },
    computed: {
      ...mapGetters("game", ["endProcess", "resultsProcess", "questions", "process", "totalTimeAnsweredProcess"]),
      processTitle() {
        return this.questions[this.process]['name'];
      },
      resultCorrect() {
        return this.resultsProcess.length + '/' + this.questions[this.process]["questions"].length
      },
    },
    methods: {
      ...mapActions("game", ["getResultProcess"])
    },
    watch: {
      endProcess(n, p) { // eslint-disable-line
        if (n && n !== p) {
          this.getResultProcess();
        }
      }
    }
  }
</script>

<style scoped>

</style>
