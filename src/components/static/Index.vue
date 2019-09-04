<template>
  <div class="box-static" style="overflow-x: auto; width: 100%">
    <Welcome/>
    <StaticQuestion/>
    <StaticLogin/>
    <StaticKhoiDong/>
    <StaticManHinhCho/>
  </div>
</template>

<script>
  import Welcome from "./Welcome";
  import StaticQuestion from "./StaticQuestion";
  import StaticLogin from "./StaticLogin";
  import StaticKhoiDong from "./StaticKhoiDong";
  import StaticManHinhCho from "./StaticManHinhCho";

  export default {
    name: "Static",
    components: {StaticManHinhCho, StaticKhoiDong, StaticLogin, StaticQuestion, Welcome}
  }
</script>

<style scoped lang="scss">
  .box-static {
    border: solid 1px #fff;
    overflow-x: auto;
    display: flex;
    & > * {
      margin-right: 10px;
      min-width: 400px;
      max-width: 400px;
    }
  }
</style>
