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
        isConnected: false
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
      ...mapActions("game", ["fetchQuestion"]),
      appClick(e) {
        this.$eventHub.$emit(this.$eventTypes.appClick, e);
      },

    }
  };
</script>
<style lang="scss">
  .app_tp {
    height: 100vh;

  }

  * {
    box-sizing: border-box;
    margin: 0px;
    &:focus, &:active {
      outline: none;
    }
  }
  .link_signout {
    display: block;
    border: none;
    box-shadow: none;
    outline: none;
    position: absolute;
    left: 20px;
    top: 20px;
    z-index: 999;
    background: none;
    cursor: pointer;
  }
  .logo_form {
    top: 0px;
    left: 0px;
    width: 100%;
    img {
      display: block;
      margin: 0 auto;
      width: 200px;
      max-width: 100%;
    }
  }
  .auth_screen {
    padding: 20px 0px 0px 0px;
    max-width: 1024px;
    margin: 0 auto;
    position: relative;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;


    .form_signin {
      text-align: center;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      max-width: 300px;
      width: 100%;
      .label_form {
        display: inline-block;
        margin-bottom: 10px;
      }
      .input_form {
        display: block;

        border: none;
        outline: none;
        margin-bottom: 10px;
        background: #AAA9AD;
        padding: 0px 10px;
        height: 34px;
        border-radius: 17px;
        text-align: center;
        font-weight: bold;
        font-size: 20px;
      }
      .link_submit {
        display: block;
        margin: 0 auto;
        border: none;
        background: #E30613;
        color: #ffffff;
        padding: 5px 10px;
        font-size: 16px;
        border-radius: 15px;
        width: 100px;

      }
    }


  }
  .both_text {
    /*border: solid 1px red;*/
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    bottom: 20px;
    left: 0px;
    width: 100%;
    font-size: 16px;
    text-transform: uppercase;
    img {
      display: block;
      width: 20px;
      margin: 0px 10px;
    }
  }
  .s25 {
    font-size: 14px;
    color: #AAA9AD;
  }
  .text-highlight {
    font-size: 40px;
    font-weight: 100;
    text-align: center;

  }
  .text-center {
    text-align: center;
  }
  .question-detail {
    /*border: solid 1px red;*/
    padding: 20px;
  }
  .title-qs {
    margin-bottom: 10px;
    font-size: 20px;
  }
  .drs-qs {
    margin-bottom: 10px;
  }
  .list_questions {
    list-style-type:upper-alpha;
    .item {
      /*border: solid 1px blue;*/
      margin-bottom: 10px;
      position: relative;
      &.active {
        opacity: 1 !important;
        .dot_item {
          &:before {
            background: #ffffff;
          }
        }
      }
      &.correct {
        background: blue;
        color: #ffffff;
      }
      &.in-correct {
        background: red;
        color: #ffffff;
      }
      &.disable {
        pointer-events: none;
        opacity: 0.5;

      }
      .dot_item {
        width: 15px;
        height: 15px;
        border: solid 1px #fff;
        display: block;
        position: absolute;
        border-radius: 100%;
        top: 3px;
        left: -48px;
        padding: 1px;
        overflow: hidden;
        &:before {
          content: '';
          width: 100%;
          height: 100%;
          display: block;
          border-radius: 100%;

        }
      }
    }
  }
</style>
