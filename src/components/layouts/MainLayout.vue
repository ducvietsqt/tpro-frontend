<template>
  <div style="height: 100%;" class="main_layout">
    <div class="main_screen">
      <ButtonSignOut/>
      <TopBar/>
      <slot/>
      <div class="both_text">
        <!--Vuợt trội-->
        <!--<img src="../../assets/Asset6.png" alt=""/>-->
        <!--mỗi ngày-->
        <img src="../../assets/Vuot-Troi-Moi-Ngay_white.png" alt=""/>
      </div>
    </div>
  </div>
</template>

<script>
  import ButtonSignOut from "../utils/ButtonSignOut";
  import TopBar from "../utils/TopBar";
  export default {
    name: "MainLayout",
    components: {TopBar, ButtonSignOut},
    data() {
      return {
      }
    }

  }
</script>

<style scoped>
  .main_layout {

  }
</style>
