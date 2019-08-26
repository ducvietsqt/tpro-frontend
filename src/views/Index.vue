<template>
  <SignIn v-if="!isLoggedIn"/>
</template>

<script>
  import {mapGetters} from 'vuex';

  export default {
    name: "Index",
    computed: {
      ...mapGetters("auth", ["isLoggedIn", "authStatus"]),
    },
    created() {
      if (this.isLoggedIn) {
        this.$router.replace({name: "dashboard"});
      } else {
        this.$router.replace({name: "signin"});
      }
    }
  };
</script>
