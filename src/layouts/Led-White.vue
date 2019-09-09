<template>
  <div class="main_layout_led white">    
    <div class="container_led">
      <div class="topbar-led">
        <img class="led_left" src="../assets/Vuot-Troi-Moi-Ngay_white.png" alt=""/>
        <img class="led_right" src="../assets/logo_techcombak_white-01.png" alt=""/>
      </div>     
      <div class="title_led red">
        <strong>Vòng 3 - BỨT PHÁ</strong>
      </div> 
      <router-view></router-view>        
    </div>
  </div>
</template>

<script>
  export default {
    name: "Led"
  }
</script>
