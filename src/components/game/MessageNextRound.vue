<template>
  <div>
    <p class="text-highlight">
      Chúc mừng<br/>
      bạn đã vào vòng<br/>
      <strong>{{title}}</strong>
    </p>
  </div>
</template>

<script>

  export default {
    name: "MessageNextRound",
    props:["title"],
    data() {
      return {

      }
    },
    computed: {
    },
    methods: {
    }
  }
</script>

<style scoped>

</style>
