<template>
  <button @click.stop="logout" class="link_signout s25">Đăng xuất</button>
</template>

<script>
  import {mapActions} from 'vuex';

  export default {
    name: "ButtonSignOut",
    methods: {
      ...mapActions("auth", ["logout"])
    }
  }
</script>

<style scoped>

</style>
