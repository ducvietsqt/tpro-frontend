<template>
  <!--<SignIn v-if="!$store.getters['auth/isLoggedIn']"/>-->
  <div>
    dashboard
  </div>
</template>

<script>
  import {getSubdomain, isValidSubdomain} from "../utils/index";

  export default {
    name: "Index",
    created() {
      let subdomain = getSubdomain(location.hostname);
      if(isValidSubdomain(subdomain) && this.$store.getters["auth/isLoggedIn"]){
        this.$router.replace({name: "dashboard"});
      }else {
        this.$router.replace({name: "signin"});
      }
    }
  };
</script>
