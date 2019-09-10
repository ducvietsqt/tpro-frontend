<template>
  <div>    
    <div>
      <div class="progress-bar-container">
        <div class="item">
          <div class="progress-bar stripes">
            <span :class="{pause: pause, animate: !pause}"
                  :style="{height: pause ? choice1: ''}"
                  class="progress-bar-inner" style="animation-delay: 1.5s;">
              <strong v-if="pause">{{choice1}}%</strong>
            </span>
          </div>
          <p class="index_qs">A</p>
        </div>
        <div class="item">
          <div class="progress-bar stripes animated reverse slower">
            <span :class="{pause: pause, animate: !pause}"
                  :style="{height: pause ? choice2 : ''}"
                  class="progress-bar-inner" style="animation-delay: 1s;">
              <strong v-if="pause">{{choice2}}%</strong>
            </span>
          </div>
          <p class="index_qs">B</p>
        </div>
        <div class="item">
          <div class="progress-bar stripes">
            <span :class="{pause: pause, animate: !pause}"
                  :style="{height: pause ? choice3 : ''}"
                  class="progress-bar-inner" style="animation-delay: 2s;">
              <strong v-if="pause">{{choice3}}%</strong>
            </span>
          </div>
          <p class="index_qs">C</p>
        </div>
        <div class="item">
          <div class="progress-bar stripes animated reverse slower">
            <span :class="{pause: pause, animate: !pause}"
                  :style="{height: pause ? choice4 : ''}"
                  class="progress-bar-inner" style="animation-delay: 3s;">
              <strong v-if="pause">{{choice4}}%</strong>
            </span>
          </div>
          <p class="index_qs">D</p>
        </div>

      </div>
    </div>
    <div>

      </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import api from '../../api/led';
import {sleep} from "../../api/base";

  export default {
    name: "BoxKetQua",
    props: ["items"],
    data() {
      return {
        pause: false,
        listAnswer: [],
        choice1:"80%",
        choice2:"20%",
        choice3:"50%",
        choice4:"40%"
      }
    },
    computed: {
    ...mapGetters("game", [
      "questions",
      "processQuestion",
      "finishedCounDown"
    ])
  },
    created() {         
      this.getListGroupAnswer();
    },
    methods: {
    ...mapActions("game", ["tickQuestion"]),
      async getListGroupAnswer()
      {                  
          await sleep(1500);
          let obj= await api.getListGroupAnswer();  
          this.listAnswer = obj.data;     
          this.pause = true;    
          let total = parseInt(this.listAnswer[0].choice1 + this.listAnswer[0].choice2 + this.listAnswer[0].choice3 + this.listAnswer[0].choice4);
          this.choice1 = (this.listAnswer[0].choice1 / total)*100;   
          this.choice2 = (this.listAnswer[0].choice2 / total)*100;   
          this.choice3 = (this.listAnswer[0].choice3 / total)*100;   
          this.choice4 = (this.listAnswer[0].choice4 / total)*100;        
      }
    }
  }
</script>

<style scoped>
  .active{
    color:red;
  }

</style>
