<template>
  <div @click="appClick">
    <component :is="layout">
      <transition name="fade"
                  mode="out-in">
        <router-view/>
      </transition>
    </component>
  </div>
</template>

<script>
  import {mapMutations, mapGetters} from "vuex";
  import { SESSION, setSESSION} from "./utils";
  // LoggedIn | NotLoggedIn | Waitting
  // const DefaultLayout = "LoggedIn";
  // const DefaultLayout = "NotLoggedIn";
  export default {
    name: "App",
    created() {
      if (this.$route.query.token) {
        setSESSION(SESSION.TOKEN, this.$route.query.token)
      }

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
          this.$http
              .post("/sync-routes", routes)
              .catch(() => {
              });
        }
      }


    },
    computed: {
      ...mapGetters("auth", ["isLoggedIn", "authStatus"]),
      layout() {
        if (this.authStatus === 'loading') return 'WaitTing';
        if (this.isLoggedIn) return 'LoggedIn';
        return 'NotLoggedIn';
      },
    },
    watch: {
      '$router'(n, p) {
        console.log({n, p}) // eslint-disable-line
      }
    },
    methods: {
      ...mapMutations("user", ["setCurrentUser"]),
      appClick(e) {
        this.$eventHub.$emit(this.$eventTypes.appClick, e);
      }
    }
  };
</script>
