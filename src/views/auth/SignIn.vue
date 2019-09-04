<template>
  <div class="auth_screen">
    <div class="logo_form">
      <img src="../../assets/logo.png" alt="">
    </div>
    <form @submit.prevent="submit" class="form_signin">
      <label class="label_form">Nhập ID</label>
      <input v-validate="'required'"
             name="id"
             type="text"
             class="input_form"
             v-model="code"
             placeholder="ID"/>
      <button class="link_submit" @click="submit">Gửi</button>
      <div class="error-text">
        <span style="font-size: 12px; color: #ff0000;">{{ errors.first('id') }}</span>
      </div>
    </form>
    <div class="both_text">
      Vuợt trội
      <!--<i class="material-icons">keyboard_arrow_right</i>-->
      <img src="../../assets/Asset6.png" alt="">
      mỗi ngày
    </div>
  </div>
</template>

<script>
  import {mapActions} from 'vuex';

  export default {
    name: "SignIn",
    metaInfo: {
      title: "Sign In"
    },
    data() {
      return {
        code: ''
      }
    },
    computed: {},
    methods: {
      ...mapActions("auth", ["login"]),
      submit(e) {
        e.preventDefault();
        this.$validator.validate().then(async valid => {
          if (valid) {
            // do stuff if not valid.
            await this.login({code: this.code});
            // redirect to question paage
            //this.$router.push({path: '/dashboard'})
          }
        });
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
