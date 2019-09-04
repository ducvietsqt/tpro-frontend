<template>
  <div class="hello">
    <ul>
        <li v-for="(item,key) in events" :key="key">
                <p>Name:{{ item.name }}</p>
                <p>Key:{{ item.key }}</p>
                <p>Status:{{ item.status }}</p>
        </li>
    </ul>
  </div>
</template>

<script>
import { db } from "@/db";
export default {
  name: "IpadShowEvent",
  data() {
    return {
      events: []
    };
  },
  firebase: {
    events: db.ref("events")
  }
};
</script>