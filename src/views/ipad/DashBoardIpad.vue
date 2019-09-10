<template>
  <div id="app">
    <div>
      <p class="text-highlight">
        Chào mừng bạn <br/> đến với <br/>
        <strong>T-Pro Confetti</strong>
      </p>
      <h2>Màn hình dành cho quản trị viên</h2>
    </div>
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
      <div class="event-item">
        <button type="button" @click="resetRound">Reset Round</button>
      </div>
      <div class="event-item">
        <button type="button" @click="updateRound">Update Round</button>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "../../db";
import api from '../../api/led';
import {sleep} from "../../api/base";


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

    },
    async resetRound(){
      await api.resetRound();
      this.$firebaseRefs.events.push({
        name: "Update Round",
        key: "update_round"        
      });
      await sleep(1000);
      eventsRef.remove();      
    },
    updateRound()
    {
      this.$firebaseRefs.events.push({
        name: "Update Round",
        key: "update_round"        
      });
    }
    
  }
};
</script>
<style scoped>
  h2{
    margin-top: 30px;
    text-align: center;
  }
.events {
  display: flex;
  align-items: center;
  width: 100%;
  flex: 0 0 100%;
}
.event-item{
  margin:10px;
  padding: 20px;
  width: 20%;
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
    padding: 0px 10px;
    height: 60px;
    width:170px;
    line-height: 40px;
    border-radius: 5px;
    cursor: pointer;
  }
</style>
