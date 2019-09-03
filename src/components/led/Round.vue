<template>
  <div>  
    <div v-show="!isReady">
      <strong>Cuộc thi T-Pro Confetti</strong>
      <p>Hướng dẫn đăng nhập</p>
    </div>
    <div v-show="isReady && !isStarted">
        <div class="process-step">
          <div v-for="(item, index) in steps" :key="index">
            <h1 v-if="index == 0">{{item.title}}</h1>        
          </div>
        </div>
        <div>
            <h1>Các bạn hãy sẵn sàng</h1>
        </div>    
    </div>    
  </div>
</template>


<script>
import { mapGetters, mapActions } from "vuex";
import api from '../../api/led';

export default {
  name: "Round",
  props: ["steps"],
  data() {
    return {};
  },
  computed: {
    ...mapGetters("game", [
      "isReady",
      "process",
      "isStarted"
    ])
  },
  mounted() {},
  methods: {}
};
</script>

<style scoped lang="scss">
</style>