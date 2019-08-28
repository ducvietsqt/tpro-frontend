<template>
  <MainLayout>
    <router-view v-if="loggedIn"></router-view>
  </MainLayout>
</template>

<script>
  import MainLayout from "../components/layouts/MainLayout";
  import {mapGetters} from 'vuex';

  export default {
    name: "LoggedIn",
    components: {
      MainLayout: MainLayout,
    },
    mounted() {
      if(this.$route.meta.layout !== "LoggedIn") {
        this.redr();
      }
    },
    computed: {
      ...mapGetters("auth", ["isLoggedIn", "authStatus"]),
      loggedIn() {
        return this.isLoggedIn && this.$route.meta.layout === "LoggedIn";
      }
    },
    methods: {
      redr() {
        this.$router.replace({name: "ledShow"});
      }
    },
    watch: {
      '$route'(to) {
        if (to.meta.layout !== "LoggedIn") {
          this.redr();
        }
      }
    }
  }


</script>
<style>
  .wrapper_block {
    display: block;
    float: left;
    width: 100%;
  }
</style>
