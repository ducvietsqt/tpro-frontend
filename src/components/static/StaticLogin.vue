<template>
  <div class="auth_screen" style="margin: 0">
    <div class="logo_form">
      <img src="../../assets/logo.png" alt="">
    </div>
    <form @submit.prevent="submit" class="form_signin">
      <label class="label_form">Nhập ID</label>
      <input class="input_form" v-model="code" type="text"/>
      <button :disabled="true" class="link_submit">Gửi</button>
      <p class="err_text">
        <template>
          <sup>*</sup>This field required
        </template>
      </p>
    </form>
    <div class="both_text">
      Vuợt trội
      <img src="../../assets/Asset6.png" alt="">
      mỗi ngày
    </div>
  </div>
</template>

<script>
    export default {
        name: "StaticLogin"
    }
</script>

<style scoped>

</style>
