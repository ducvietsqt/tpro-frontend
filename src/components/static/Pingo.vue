<template>
  <div class="wrapper_pingo">
    <div class="bg" :style="'background: url('+bg+')'">
      <!--<img src="../../assets/bg.jpg" alt=""/>-->
    </div>
    <div class="box_link_content">
      <button @click="btn2 = !btn2" v-if="!btn2" class="animated zoomInUp btn_link link_first">
        <img src="../../assets/btn1.png" alt=""/>
      </button>
      <!--<h1 class="animated infinite bounce delay-2s">Example</h1>-->

      <button v-if="btn2" class="animated zoomIn btn_link link_second">
        <img src="../../assets/btn2.png" alt=""/>
      </button>
    </div>
  </div>
</template>

<script>
  import bg from '../../assets/bg.jpg';

  export default {
    name: "Pingo",
    data() {
      return {
        btn2: false,
        bg
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
      img {
        display: block;
        max-width: 100%;
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
