<template>
  <div class="main_layout_led">
    <div class="container_led">
      <div class="topbar-led">
        <img class="led_left" src="../assets/Vuot-Troi-Moi-Ngay_white.png" alt=""/>
        <img class="led_right" src="../assets/logo_techcombak_white-01.png" alt=""/>
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