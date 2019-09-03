<template>
  <div class="auth_screen">
    <button class="link_signout">Đăng xuất</button>
    <div>
      <img src="../../assets/logo.png" alt="">
    </div>
    <form @submit.prevent="submit">
      <label>Id</label> &nbsp;
      <input v-validate="'required'"
             name="myinput"
             type="text"
             v-model="code"
             placeholder="User code"/>
      &nbsp;
      <button @click="submit">Submit</button>
      <div>
        <span style="font-size: 12px; color: #ff0000;">{{ errors.first('myinput') }}</span>
      </div>
    </form>

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
        code: 'MNV01'
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
            this.$router.push({path: '/dashboard'})
          }
        });
        return false;

      }
    }

  }
</script>

<style>
  .flex_label {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .flex_label ._title {
    flex: 1;
  }

  .flex_label ._icon {

  }

  .title-small {
  }

  .v-text-field__suffix {
    font-weight: bold !important;
  }

  .auth_screen {
    border: solid 1px red;
    max-width: 1024px;
    margin: 0 auto;
  }
</style>
