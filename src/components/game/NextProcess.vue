<template>
  <div v-show="endProcess">
  <!--<div>-->
    <p>
      vòng tiếp theo: <strong>{{questions[process + 1]['name']}}</strong> &nbsp;
      <button @click.stop="startProcess">Bắt đầu</button>
    </p>
  </div>
</template>
<script>
  import {mapGetters, mapActions} from 'vuex';

  export default {
    name: "NextProcess",
    computed: {
      ...mapGetters("game", ["endProcess",  "questions", "process"]),

    },
    created() {
    },
    methods: {
      ...mapActions("game", ["startGame"]),
      async startProcess() {
        await this.startGame();
      }
    }
  }
</script>

<style scoped>

</style>
