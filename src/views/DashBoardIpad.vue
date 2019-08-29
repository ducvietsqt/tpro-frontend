<template>
  <div class="home">
    <img alt="Vue logo" src="@/assets/logo.png" id="vue-logo">
    <div class="title">What do I need to do today?</div>
    <input v-model="myTodo" /><button @click="addToDo">Add</button>
  </div>
</template>

<script>
import { db } from '@/main'

export default {
    name: "home",
    data: function () {
      return {
        myTodo: '',
        message: ''
      }
    },
    methods: {
      addToDo: function () {
        this.message = ''
      if (this.myTodo !== '') {
        db.collection('items').add({
          title: this.myTodo,
          created_at: Date.now()
        }).then((response) => {
          if (response) {
            this.myTodo = ''
          }
        }).catch((error) => {
          this.message = error
        })
      } else {
        this.message = 'Please enter some text'
      }
      }
    }
  }
</script>