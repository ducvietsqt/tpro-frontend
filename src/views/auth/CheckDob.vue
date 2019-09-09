<template>
  <div class="auth_screen" v-if="isAuthCode">
    <div class="logo_form">
      <img src="../../assets/logo.png" alt="">
    </div>
    <form @submit.prevent="submit" class="form_signin" v-if="matchedDob === 0">
      <label class="label_form">Nhập Ngày Sinh</label>
      <input name="dob_code"
             type="text"
             class="input_form"
             v-model="dob"
             placeholder=""/>
      <p class="hint_text">
          VD: 01011990
      </p>
      <button :disabled="!dob.trim()" class="link_submit" @click="submit">Gửi</button>
    </form>
    <div class="form_signin" v-if="matchedDob === 1">
      <img class="icon_error" src="../../assets/icon_emotion.png" alt=""/>
      <label class="label_form">Vui lòng đăng nhập lại</label>
      <button class="link_submit" @click="rdrSignIn">Thử lại</button>
    </div>
    <div class="both_text">
      <img src="../../assets/Vuot-Troi-Moi-Ngay_color.png" alt="">
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapMutations, mapActions} from 'vuex';
  import {sleep} from "../../api/base";
  export default {
    name: "CheckDob",
    metaInfo: {
      title: "T-Pro | Đăng nhập"
    },
    data() {
      return {
        dob: '',
        matchedDob: 0
      }
    },
    created() {
      if(!this.isAuthCode) {
        this.rdrSignIn();
      }
    },
    computed: {
      ...mapGetters("auth", ["dataAuth", "isAuthCode"])
    },
    methods: {
      ...mapMutations("auth", ["authSuccess", "logout"]),
      ...mapActions("auth", ["updateLogin"]),
      rdrSignIn() {
        this.$router.push({name: 'signin'})
      },
      async submit(e) {
        e.preventDefault();
        if(this.dataAuth.dob === this.dob.trim()) {
          console.log(true);
          await this.updateLogin({code: this.dataAuth.code});
          await this.authSuccess();
          this.$router.push({path: '/dashboard'})
        }else {
          this.matchedDob = 1;
          await sleep(2000);
          await this.logout();
          this.rdrSignIn();
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
