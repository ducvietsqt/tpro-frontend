<template>
  <div style="height: 100%;" class="main_layout">
    <div class="main_screen">
      <ButtonSignOut/>
      <TopBar/>
      <slot/>
      <div class="both_text">
        Vuợt trội
        <img src="../../assets/Asset6.png" alt=""/>
        mỗi ngày
      </div>
    </div>
  </div>
</template>

<script>
  import ButtonSignOut from "../utils/ButtonSignOut";
  import TopBar from "../utils/TopBar";

  export default {
    name: "MainLayout",
    components: {TopBar, ButtonSignOut}
  }
</script>

<style scoped>

</style>
