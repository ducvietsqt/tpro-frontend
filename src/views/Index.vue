<template>
  <SignIn v-if="!isLoggedIn"/>
</template>

<script>
  import {mapGetters} from 'vuex';
  import SignIn from "./auth/SignIn";
  export default {
    name: "Index",
    components: {SignIn},
    computed: {
      ...mapGetters("auth", ["isLoggedIn", "authStatus"]),
    }
  };
</script>
