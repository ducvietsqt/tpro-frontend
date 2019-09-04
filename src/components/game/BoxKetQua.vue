<template>
  <div class="main_layout">
    <div class="main_screen" v-show="endProcess">
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
