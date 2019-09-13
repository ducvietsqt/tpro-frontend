<template>
  <div class="bg_led_1920">
    <!--<img src="../../assets/led_screen_bg.jpg" alt=""/>-->
    <!--<div class="logo">
      <img src="../../assets/let_screen_log.png" alt=""/>
    </div>
    <div class="text">
      <img src="../../assets/led_screen_text.png" alt=""/>
    </div>-->

    <!--<img src="../../assets/led_screen_box.png" alt=""/>-->
    <!--<img src="../../assets/led_screen_eff.png" alt=""/>-->
    <div class="list_lq">
      <div class="list_lq-row">
        <p class="item text_lq">
          Liên Quân 1
        </p>
        <p class="item text_lq">
          Liên Quân 2
        </p>
        <p class="item text_lq">
          Liên Quân 3
        </p>
      </div>
      <div class="list_lq-row">
        <div class="item">
          <div class="box_item">
            Nguyen van a
          </div>
        </div>
        <div class="item">
          <div class="box_item">
            Nguyen van a
          </div>
        </div>
        <div class="item">
          <div class="box_item">
            Nguyen van a
          </div>
        </div>
      </div>
      <div class="list_lq-row"></div>
      <div class="list_lq-row"></div>
      <div class="list_lq-row"></div>
      <div class="list_lq-row"></div>
      <div class="list_lq-row"></div>
      <div class="list_lq-row"></div>
      <div class="list_lq-row"></div>
      <div class="list_lq-row"></div>
      <div class="list_lq-row"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "StaticLedScreen"
  }
</script>

<style scoped lang="scss">
  .bg_led_1920 {
    border: solid 1px red;
    overflow: hidden;
    width: 100vw;
    height: 100vh;
    background-image: url("../../assets/led_screen_bg.jpg");
    background-position: center;
    background-size: 100%;
    background-repeat: no-repeat;
    color: #ffffff;
    .logo {
      img {
        display: block;
        margin: 0 auto;
      }
    }
    .text {
      display: block;
      margin: 0 auto;
    }
    .list_lq {
      display: flex;
      width: 87.5%;
      margin: 31vh auto 0px auto;
      .list_lq-row {
        border: solid 1px blue;
        width: calc(100%/11);
        .item {
          padding: 10px;
          border: 1px solid;
        }
      }
      .text_lq {
        font-size: 30px;
      }
      .box_item {
        /*background: url("../../assets/led_screen_box.png");*/
        /*background-size: cover;*/
        padding: 10px 20px;
        color: #000;
        background: #ffffff;
        box-shadow:  inset 0px 1px 10px 4px rgba(0,0,0,0.2)
        /*width: 236px;*/
        /*height: 69px;*/

      }
    }

  }
</style>
