<template>
  <div>
    Index
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  export default {
    name: "Index",
    computed: {
      ...mapGetters("auth", ["isLoggedIn", "authStatus"]),
    }
  };
</script>
