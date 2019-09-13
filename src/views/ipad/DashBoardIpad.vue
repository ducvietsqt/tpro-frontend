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
        <button type="button" @click="actionToDo('Play Game','play_game')">Vòng Phụ</button>
      </div>     
    </div>
    <div class="events">      
      <div class="event-item">
        <button type="button" @click="getResultRound">Result Round</button>
      </div>
      <div class="event-item">
        <button type="button" @click="resetRoundLed">Reset Round Led</button>
      </div>
      <div class="event-item">
        <button type="button" @click="resetRound">Reset Round</button>
      </div>
      <div class="event-item">
        <button type="button" @click="updateRound">Update Round</button>
      </div>
    </div>

    <div class="events">      
      <div class="event-item">
        <button type="button" @click="resetInfoGame">Reset Info game</button>
      </div>
      <div class="event-item">
        <button type="button" @click="resetTotalLogin">Reset Total Login</button>
      </div>
      <div class="event-item">
        <button type="button" @click="resetFireBase">Reset FireBase</button>
      </div>
      <div class="event-item">
        <button type="button" @click="resetAll">Reset All</button>
      </div>
    </div>

     <div class="events">      
      <div class="event-item">
        <button type="button" @click="checkListCorrect">Check List Correct</button>
      </div>
    </div>


  </div>
</template>

<script>
import { db } from "../../db";
import api from '../../api/led';
import {sleep} from "../../api/base";


let eventsRef = db.ref('events');
let resultRef = db.ref('result');
let keys = [];
export default {
  name: "Events",
  data() {
    return {
      events: []
    };
  },
  firebase: {
    events: eventsRef,
    results:resultRef
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
      if(confirm("Bạn có muốn lấy kết quả danh sách người chơi vào vòng sau hay không?")){    
        let obj = await api.getListGroupGrade();
        let list = obj.data.arrUserChoices;
        eventsRef.remove();
        this.$firebaseRefs.events.push({
          name: "Result Round",
          key: "result_round",
          arrayNextRound: list
        });
      }
    },
    async resetRoundLed(){      
      this.$firebaseRefs.events.push({
        name: "Update Round",
        key: "update_round"        
      });
      await sleep(1000);
      eventsRef.remove();      
    },
    async resetRound(){
      await api.resetRound();
    },
    updateRound()
    {
      this.$firebaseRefs.events.push({
        name: "Update Round",
        key: "update_round"        
      });
    },
    async resetInfoGame(){
      if(confirm("Bạn có muốn Reset thông tin game hay không?")){
        await api.resetInfoGame();
      }
    },
    async resetTotalLogin(){
      if(confirm("Bạn có muốn Reset Số người đăng nhập hay không?")){
        await api.resetTotalLogin();
      }
    },
    resetFireBase(){
      if(confirm("Bạn có muốn Reset Data FireBase hay không?")){
        eventsRef.remove();
      }      
    },
    resetAll(){
      if(confirm("Bạn có muốn Reset Toàn bộ hay không?")){
        this.resetFireBase();
        this.resetTotalLogin();
        this.resetInfoGame();
        this.resetFireBase();
        this.resetFireBase();
        this.resetRound();
        this.resetRoundLed();
        this.resetRound();
      }      
    },
    async checkListCorrect(){
      this.$firebaseRefs.results.push({
        name: "Check Result Answer",
        key: "check_result_answer"        
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
