<template>
  <div id="app">
    <div class="events">
        <div class="event-item">    
        <button @click="actionToDo('Start Game','start_game')">Start Game</button>
      </div>
      <div class="event-item">    
        <button type="button" @click="actionToDo('Play Game','play_game')">Play Game</button>
      </div>      
    </div>      
  </div>  
</template>

<script>
import { db } from "@/db";
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
      eventsRef.once('value', function(snapshot) {       
        snapshot.forEach(function(childSnapshot) {              
              let childData = childSnapshot.val();
              if(childData){
                  keys.push(childData.key);
              }              
          });
      });
      if(!keys.includes(key)){
          this.$firebaseRefs.events.push({
            name: name,
            key: key,
            status: true
          });
      }      
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
  width: 100px;  
  cursor: pointer;
}
</style>