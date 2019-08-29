<template>
  <div v-if="this.$store.getters.getItems && this.$store.getters.getItems.length > 0">
      <div class="title">Today, you've go to do...</div>

     <div v-for="item in this.$store.getters.getItems" :key="item.id">
       {{ item.title }}<br /><br /><small style="text-decoration:underline;" @click="deleteItem(item.id)">Delete</small>
       <hr />
     </div>
   </div>
 </template>