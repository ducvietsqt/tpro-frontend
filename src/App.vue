<template>
  <div @click="appClick" class="app_tp">
    <component :is="layout" style="height: 100%;">
      <transition name="fade" mode="out-in">
        <router-view/>
      </transition>
    </component>
  </div>
</template>
<script>
  import {mapMutations, mapGetters, mapActions} from "vuex";

  export default {
    name: "App",
    data() {
      return {
        socketMessage: '',
        isConnected: false,
        layoutName: false
      }
    },
    created() {
      // todo fetch question
      this.fetchQuestion();
      if (process.env.NODE_ENV !== "production" && process.env.VUE_APP_SYNC_ROUTES) {
        let routes = [];
        let parseRoute = (parent, routes, result) => {
          routes.forEach(route => {
            let {path, name, children} = route;
            if (path !== "*") {
              if (!name) {
                console.error(`Route ${path} must have a name`);
                name = path.replace(/[:/]/g, '');
              }
              path = `${parent}/${path}`.replace(/[/]+/g, '/');
              result.push({path, name});
              if (children) {
                parseRoute(path, route.children, result);
              }
            }
          });
        };
        parseRoute("", this.$router.options.routes, routes);
        if (routes.length) {
          this.$http.post("/sync-routes", routes)
            .catch(() => {

            });
        }
      }
    },
    computed: {
      ...mapGetters("auth", ["isLoggedIn", "authStatus"]),
      ...mapGetters("socket", ["message"]),
      layout() {
        // if (this.authStatus === 'loading') return 'WaitTing';
        // if (this.authStatus === 'loading') return false;
        // if (this.isLoggedIn) return 'LoggedIn';
        // return this.$route.meta.layout || 'NotLoggedIn';
        return this.layoutName;
      },
    },
    methods: {
      ...mapMutations("user", ["setCurrentUser"]),
      ...mapActions("game", ["fetchQuestion"]),
      appClick(e) {
        this.$eventHub.$emit(this.$eventTypes.appClick, e);
      },
    },
    watch: {
      '$route'(to) {
        this.layoutName = to.meta.layout
      }
    }
  };
</script>
<style lang="scss">

</style>
