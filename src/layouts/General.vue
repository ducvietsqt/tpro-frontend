<template>
  <div style="height: 100%;" class="main_layout">
    <div class="main_screen">
      <router-view></router-view>
      <div class="both_text">
        <img src="../assets/Vuot-Troi-Moi-Ngay_white.png" alt=""/>
      </div>
    </div>
  </div>
    
</template>

<script>
  import {mapGetters} from 'vuex';

  export default {
    name: "General",
    components: {},
    data() {
      return {        
      }
    },
    computed: {},
    methods: {}
  }


</script>
<style>
  .wrapper_block {
    display: block;
    float: left;
    width: 100%;
  }
</style>
