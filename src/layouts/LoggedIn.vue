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
      if (!this.isLoggedIn) {
        this.$store.dispatch("auth/logout").then(() => {
          this.$router.push({
            path: "/signin",
            query: {redirect: this.$route.fullPath}
          });
        });
      }
    },
    computed: {
      ...mapGetters("auth", ["isLoggedIn", "authStatus"]),
      loggedIn() {
        return this.isLoggedIn && this.$route.meta.layout !== "NotLoggedIn";
      }
    },
    methods: {
      redr() {
        this.$router.replace({name: "dashboard"});
      }
    },
    watch: {
      '$route'(to) {
        if (to.meta.layout === "NotLoggedIn") {
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
