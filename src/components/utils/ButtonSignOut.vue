<template>
  <div v-show="process == 0">
    <button @click.stop="logout(NvId)" class="link_signout s25">Đăng xuất</button>
  </div>  
</template>

<script>
  import {mapGetters, mapActions} from 'vuex';
  import {getSESSION, SESSION} from "../../utils";

  export default {
    name: "ButtonSignOut",
    computed: {
      ...mapGetters("game", ["process"]),
      NvId() {
        return getSESSION(SESSION.TOKEN)
      }
    },
    methods: {
      ...mapActions("auth", ["logout"])
    }
  }
</script>

<style scoped>

</style>
