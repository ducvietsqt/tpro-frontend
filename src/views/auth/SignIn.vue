<template>
  <div class="auth_screen">
    <div class="logo_form">
      <img src="../../assets/logo.png" alt="">
    </div>
    <form @submit.prevent="submit" class="form_signin">
      <label class="label_form">Nhập ID</label>
      <input class="input_form" v-model="code" type="text"/>
      <button :disabled="!code" class="link_submit" @click="submit">Gửi</button>
      <p class="err_text">
        <template v-if="errorLogin && authStatus !== 'loading'">
          <sup>*</sup>{{errorLogin}}
        </template>
      </p>
    </form>
    <div class="both_text">
      <!--Vuợt trội-->
      <!--<img src="../../assets/Asset6.png" alt="">-->
      <!--mỗi ngày-->
      <img src="../../assets/Vuot-Troi-Moi-Ngay_color.png" alt=""/>
    </div>
  </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex';

  export default {
    name: "SignIn",
    metaInfo: {
      title: "Sign In"
    },
    data() {
      return {
        code: '',
        code1: 'MNV01',
      }
    },
    computed: {
      ...mapGetters("snackbar", ["messages"]),
      ...mapGetters("auth", ["authStatus"]),
      // state.status = "loading";
      errorLogin() {
        try {
          return this.messages.message
        } catch (e) {
          return false
        }
      }
    },
    methods: {
      ...mapActions("auth", ["login"]),
      async submit(e) {
        e.preventDefault();
        let loggedIn = await this.login({code: this.code});
        // redirect to question paage
        if (loggedIn) {
          this.$router.push({path: '/dashboard'})
        }
        return false;

      }
    }
  }
</script>

<style lang="scss">
  .flex_label {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
