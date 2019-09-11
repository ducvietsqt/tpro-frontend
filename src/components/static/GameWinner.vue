<template>
  <div class="main_layout_led">
    <div class="container_led">
      <div class="topbar-led">
        <img class="led_left" src="../../assets/Vuot-Troi-Moi-Ngay_white.png" alt=""/>
        <img class="led_right" src="../../assets/logo_techcombak_white-01.png" alt=""/>
      </div>
      <div class="content_center" style="height: 75vh">
       <p class="text-highlight">
              Chúc mừng bạn đã<br/>
              chiến thắng<br/>
              <strong>T-Pro Confetti</strong>
            </p>
            </div>
    </div>
  </div>

  
</template>

<script>  
  import {db} from "../../db";

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
        eventsRef.off('value');    
      }
    }
  }
</script>

<style scoped>

</style>
