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
  import {mapMutations, mapGetters, mapActions} from "vuex";
  import {SESSION, setSESSION} from "./utils";
  // LoggedIn | NotLoggedIn | Waitting
  // const DefaultLayout = "LoggedIn";
  // const DefaultLayout = "NotLoggedIn";
  export default {
    name: "App",
    data() {
      return {
        socketMessage: '',
        isConnected: false
      }
    },
    socket: {
      // Prefix for event names
      // prefix: "/counter/",
      // If you set `namespace`, it will create a new socket connection to the namespace instead of `/`
      // namespace: "/counter",
      events: {

        // Similar as this.$socket.on("changed", (msg) => { ... });
        // If you set `prefix` to `/counter/`, the event name will be `/counter/changed`
        //
        changed(msg) {
          console.log("Something changed: " + msg);
        },

        connect() {
          console.log("Websocket connected to " + this.$socket.nsp);
        },

        disconnect() {
          console.log("Websocket disconnected from " + this.$socket.nsp);
        },

        error(err) {
          console.error("Websocket error!", err);
        }

      }
    },
    created() {
      console.log(this.$socket);
      if (this.$route.query.token) {
        setSESSION(SESSION.TOKEN, this.$route.query.token);
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
      ...mapGetters("socket", ["message"]),
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
      ...mapActions("socket", ["SOCKET_MSS"]),
      appClick(e) {
        this.$eventHub.$emit(this.$eventTypes.appClick, e);
      },
      add() {
        // Emit the server side
        this.$socket.emit("add", { a: 5, b: 3 });
      },
      get() {
        this.$socket.emit("get", { id: 12 }, (response) => { // eslint-disable-line

        });
      }
    }
  };
</script>
