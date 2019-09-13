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
    <div class="title_ping_game">
      <!--<img src="../../assets/led_title.png" alt=""/>-->
      <img style="width: 15vw" src="../../assets/let_screen_log.png" alt=""/>
      <img style="width: 30vw" src="../../assets/led_screen_text.png" alt=""/>
    </div>
    <table class="list_lq">
      <tr v-for="(item, idx) in 9" :key="idx">
        <td class="text_lq">
          Liên Quân {{idx + 1}}
        </td>
        <td class="box_item">
          <div class="animated fadeInDown">
            N.VĂN {{idx}}
            <br/>
            <strong style="font-size: 75%">MNV-48{{idx}}</strong>
          </div>
        </td>
        <td class="box_item">
          <div class="animated fadeInDown">
            N.VĂN 1
            <br/>
            <strong style="font-size: 65%">MNV-48{{idx}}</strong>
          </div>
        </td>
        <td class="box_item">
          <div class="animated fadeInDown">
            N.VĂN 1
            <br/>
            <strong style="font-size: 65%">MNV-48{{idx}}</strong>
          </div>
        </td>
        <td class="box_item">
          <div class="animated fadeInDown">
            N.VĂN 1
            <br/>
            <strong style="font-size: 65%">MNV-48{{idx}}</strong>
          </div>
        </td>
        <td class="box_item">
          <div class="animated fadeInDown">
            N.VĂN 1
            <br/>
            <strong style="font-size: 65%">MNV-48{{idx}}</strong>
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
  export default {
    name: "StaticLedScreen"
  }
</script>

<style scoped lang="scss">

  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }

  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
    display: block;
  }

  body {
    line-height: 1;
  }

  ol, ul {
    list-style: none;
  }

  blockquote, q {
    quotes: none;
  }

  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  .bg_led_1920 {
    /*border: solid 1px red;*/
    overflow: hidden;
    /*width: 100vw;*/
    width: 100%;
    height: 100vh;
    overflow-y: auto;
    /*background-image: url("../../assets/led_screen_bg.jpg");*/
    background-image: url("../../assets/bg_no_title.jpg");
    background-position: top center;
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
      width: 100%;
      margin: 20px auto 30px auto;
      border-collapse: separate;
      border-spacing: 20px;
      tr {
        td {
          /*padding-bottom: 60px;*/
          vertical-align: middle;
          width: 20%;
        }
      }
      td {
        padding: 5px;
      }
      .text_lq {
        font-size: 2.03125vw;
        white-space: nowrap;
        /*margin-right: 20px;*/
        width: 140px;
        padding-right: 20px;
      }
      .box_item {
        padding: 10px 20px;
        color: #000;
        background: #ffffff;
        /*box-shadow: inset 0px 1px 10px 4px rgba(0, 0, 0, 0.2);*/
        border-radius: 5px;
        font-size: 1.6vw;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        text-align: center;

      }
    }
    .title_ping_game {

    }
    .title_ping_game {
      /*border: solid 1px blue;*/
      margin: 5vh auto 0 auto;
      width: 69vw;
      /*margin: 0 auto;*/
      img {
        display: block;
        margin: 0 auto;
      }
    }
  }


</style>
