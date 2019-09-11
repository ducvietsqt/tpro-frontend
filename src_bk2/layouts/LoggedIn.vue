<template>
  <MainLayout v-if="loggedIn">
    <router-view></router-view>
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
    data() {
      return {
        componentName: ''
      }
    },
    computed: {
      ...mapGetters("auth", ["isLoggedIn", "authStatus"]),
      loggedIn() {
        return this.isLoggedIn && this.$route.meta.layout !== "NotLoggedIn";
      }
    },
    methods: {
      redr(cName) {
        this.$router.push({name: cName});
      }
    },
    created() {
      if(!this.isLoggedIn) {

        this.redr('signin');
      }
    },
    watch: {
      '$route'(to) { // eslint-disable-line
        if (to.meta.layout !== "LoggedIn") {
          this.redr('dashboard');
        }
      },
      isLoggedIn(isLoggedIn) {
        if(!isLoggedIn) {
          this.redr('signin');
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
