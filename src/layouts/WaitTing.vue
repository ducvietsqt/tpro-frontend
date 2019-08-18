<template>
  <v-layout
    align-content-center
    justify-center
    fill-height
    wrap style="height: 100vh;">
    <!--<p class="flex xs12 subheading text-xs-center">
      Getting starter
    </p>-->
    <v-flex xs6>
      <v-progress-linear
        color="deep-purple accent-4"
        indeterminate
        rounded
        height="6"
      ></v-progress-linear>
    </v-flex>
  </v-layout>
</template>

<script>
    export default {
        name: "WaitTing"
    }
</script>

<style scoped>

</style>
