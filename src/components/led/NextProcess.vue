<template>
  <!--<div v-show="endProcess">-->
  <div>
    <p>
      vòng tiếp theo: <strong>{{questions[process + 1]['name']}}</strong> &nbsp;
      <button @click.stop="startProcess">Bắt đầu</button>
    </p>

  </div>
</template>
<script>
  import {mapGetters, mapActions, mapMutations} from 'vuex';

  export default {
    name: "NextProcess",
    computed: {
      ...mapGetters("game", ["endProcess",  "questions", "process"]),

    },
    methods: {
      ...mapActions("game", ["startGame", "startTimerLed"]),
      ...mapMutations("game", ["START_TIMER_LED"]),
      async startProcess() {
        await this.START_TIMER_LED();
        await this.startGame();
        console.log('startTimerLed', this.startTimerLed)
      }
    }
  }
</script>

<style scoped>

</style>
