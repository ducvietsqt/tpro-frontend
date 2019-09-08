<template>
  <div id="app">
    <div class="events">
        <div class="event-item">
        <button @click="actionToDo('Start Game','start_game')">Start Game</button>
      </div>
      <div class="event-item">
        <button type="button" @click="actionToDo('Play Game','play_game')">Play Game</button>
      </div>
      <div class="event-item">
        <button type="button" @click="getResultRound">Result Round</button>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "../../db";
import api from '../../api/led';


let eventsRef = db.ref('events');
let keys = [];
export default {
  name: "Events",
  data() {
    return {
      events: []
    };
  },
  firebase: {
    events: eventsRef
  },
  methods: {
    actionToDo(name,key) {
      this.$firebaseRefs.events.push({
        name: name,
        key: key,
        status: true
      });
    },
    async getResultRound(){      
      let obj = await api.getListGroupGrade();
      let list = obj.data.arrUserChoices;
      eventsRef.remove();
      this.$firebaseRefs.events.push({
        name: "Result Round",
        key: "result_round",
        arrayNextRound: list
      });

    }
  }
};
</script>
<style scoped>
.events {
  display: flex;
  align-items: center;
}
.event-item{
  margin:10px;
  padding: 20px;
  width: 220px;
  cursor: pointer;  
}
.event-item button{
    display: block;
    margin: 0 15px;
    background: #ffffff;
    color: #000;
    border: none;
    outline: none;
    font-size: 18px;
    padding: 0px 20px;
    height: 60px;
    line-height: 40px;
    border-radius: 5px;
    cursor: pointer;
  }
</style>
