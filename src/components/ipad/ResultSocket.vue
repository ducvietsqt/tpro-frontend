<template>
  <div>
    <ul>
      <li v-for="(message, i) in messages" :key="`mss-${i}-${message.message}`">
        {{message.message}}
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "ResultSocket",
    data() {
      return {
        messages: []
      }
    },
    sockets: {
      messages: function (data) {
        console.log('all message', data);
        this.messages = data;
      },
      onmessage: function (data) {
        console.log('chat message', data);
        this.messages.unshift(data);
      },
    }
  }
</script>

<style scoped>

</style>
