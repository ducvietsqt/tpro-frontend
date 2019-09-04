<template>
  <div class="auth_screen" style="margin: 0">
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
      <img src="../../assets/Vuot-Troi-Moi-Ngay_color.png" alt="">
    </div>
  </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex';

  export default {
    name: "SignIn",
    metaInfo: {
      title: "T-Pro | Đăng nhập"
    },
    data() {
      return {
        code: '',
      }
    },
    computed: {
      ...mapGetters("snackbar", ["messages"]),
      ...mapGetters("auth", ["authStatus"]),
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
        // redirect to question page
        this.$router.push({path: '/validate-dob'})
        return false;

      }
    },
    watch: {

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
