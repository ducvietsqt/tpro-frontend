<template>
  <div class="main_layout_led">
    <div class="container_led">
      <div class="topbar-led">
        <img class="led_left" src="../../assets/Vuot-Troi-Moi-Ngay_white.png" alt=""/>
        <img class="led_right" src="../../assets/logo_techcombak_white-01.png" alt=""/>
      </div>
      <div class="content_center" style="height: 75vh">
       <p class="text-highlight">
              Cảm ơn bạn<br/>
              đã tham gia<br/>
              <strong>T-Pro Confetti</strong>
            </p>
            </div>
    </div>
  </div>

  
</template>

<script>  
  import {db} from "../../db";
 import {getSESSION, SESSION} from "../../utils";

  let eventsRef = db.ref('events');
  export default {
    name: "GameOver",
    metaInfo: {
           title: "T-Pro | Game over"
   },
    data() {
      return {

      }
    },
    firebase: {
      events: eventsRef
    },
    created() {
      this.stopEvent();
    },
    methods: {
      stopEvent() {
        // let is_next = getSESSION(SESSION.NEXT_ROUND);
        // alert(is_next)
        setSESSION(SESSION.GAMEOVER, true);
        eventsRef.off('value');    
      }
    }
  }
</script>

<style scoped>

</style>
