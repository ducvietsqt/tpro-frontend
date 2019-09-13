<template>
  <div class="wrapper_pingo">
    <div class="bg" :style="'background: url('+bg+')'">
      <!--<img src="../../assets/bg.jpg" alt=""/>-->
    </div>
    <div class="box_link_content">
      <div style="width: 40vw; margin: 0px auto 20px auto;">
        <img style="display: block; max-width: 100%;" src="../../assets/led_title.png" alt=""/>
      </div>
      <button @click="clickBtn"
              class="animated zoomIn btn_link link_first faster"
              :class="btn2 && 'zoomOut'">
        <img v-show="!btn2"  src="../../assets/btn1.png" alt=""/>
        <img v-show="btn2" class="link_second" src="../../assets/btn2.png" alt=""/>
      </button>
      <!--<button v-if="btn2" class="animated zoomIn btn_link link_second">
        <img src="../../assets/btn2.png" alt=""/>
      </button>-->
    </div>
  </div>
</template>

<script>
  import bg from '../../assets/bg.jpg';
  import {sleep} from "../../api/base";

  export default {
    name: "Pingo",
    data() {
      return {
        btn2: false,
        bg
      }

    },
    methods: {
      async clickBtn() {
        this.btn2 = true;
        await sleep(500);
        this.btn2 = false;
      }
    }
  }
</script>

<style scoped lang="scss">
  .wrapper_pingo {
    position: relative;
    height: 100vh;
    overflow: hidden;
    .bg {
      height: 100vh;
      overflow: hidden;
      /*background: url("../img/bg.jpg");*/
      background-position: center !important;
      background-size: cover !important;
      img {
        display: block;
        max-width: 100%;
      }
    }
    .btn_link {
      display: block;
      width: 250px;
      border: none;
      outline: none;
      background: none;
      margin: 0 auto;
      transition: all 0.25s linear;
      transform: scale(1);
      * {
        transition: all 0.25s linear;
      }
      &:active, &:focus, &.active {
        outline: none;
      }
      &.active {
        transform: scale(0.6);
      }
      img {
        display: block;
        max-width: 100%;
      }
      &.link_second {

      }
      .link_second {
        /*transform: scale(0.7);*/
      }
    }
    .box_link_content {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, - 50%);
    }
  }
</style>
