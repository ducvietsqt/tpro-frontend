<template>
  <button @click.stop="logout(NvId.code)" class="link_signout s25">Đăng xuất</button>
</template>

<script>
  import {mapActions} from 'vuex';
  import {getSESSION, SESSION} from "../../utils";

  export default {
    name: "ButtonSignOut",
    computed: {
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
