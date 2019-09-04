<template>
  <div class="box_nex_process" v-show="endProcess">
  <!--<div>-->
    <p>
      Vòng tiếp theo: <strong>{{questions[process + 1]['name']}}</strong> &nbsp;
      <br/>
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
