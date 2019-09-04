<template>
  <div class="logo_form">
    <p style="margin: 0px; text-align: center">
      {{NvId.code}}
    </p>
  </div>
</template>

<script>
  import {getSESSION, SESSION} from "../../utils";

  export default {
    name: "TopBar",
    computed: {
      NvId() {
        return getSESSION(SESSION.TOKEN)
      }
    }
  }
</script>

<style scoped>
  .logo_form {
    margin-bottom: 20px;
  }
</style>
