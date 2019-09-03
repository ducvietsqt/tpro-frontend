<template>
  <div class="process-step" v-show="isStarted">
    <div v-for="(item, index) in steps" :key="index">
      <button class="item_btn" :class="{active: index === process}">{{item.title}}</button>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  export default {
    name: "NavSteps",
    computed: {
      ...mapGetters("game", ["questions", "process", "isStarted", "endProcess"]),
    }
  }
</script>

<style scoped>

</style>
