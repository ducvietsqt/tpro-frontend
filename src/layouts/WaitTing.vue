<template>
  <div>
    <div class="loader"></div>
  </div>
</template>

<script>
    export default {
        name: "WaitTing"
    }
</script>

<style scoped>
  .loader {
    border: 16px solid #f3f3f3; /* Light grey */
    border-top: 16px solid red; /* Blue */
    border-radius: 50%;
    width: 120px;
    height: 120px;
    animation: spin 2s linear infinite;
    top: 35%;
    left: 35%;
    display: block;
    position: relative;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
</style>
