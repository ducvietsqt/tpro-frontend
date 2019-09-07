<template>
  <div>
    <div v-show="!isReady">
      <p class="title-userguide">
        HƯỚNG DẪN ĐĂNG NHẬP
      </p>
      <p class="drs">
        Lorem ipsumam nonummy nibh euismod tincidunt ut laoreet tminim veniam, quis nostrud
        exerci
        tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequa
      </p>
    </div>
    <div v-show="isReady && isStartWelcome">
        <!--<div class="process-step">
          <div v-for="(item, index) in steps" :key="index">
            <h1 v-if="index == 0">{{item.title}}</h1>
          </div>
        </div>-->
         <p class="title-center-box">
            Các bạn <br/>
            hãy sẵn sàng!
          </p>
    </div>
  </div>
</template>


<script>
import { mapGetters } from "vuex";

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
      "isStarted",
      "isStartWelcome"
    ])
  },
  mounted() {},
  methods: {}
};
</script>

<style scoped>

</style>
