<template>
  <div>
      <strong>Cuộc thi T-Pro Confetti</strong>
      <p>Hướng dẫn đăng nhập</p>

    <div class="process-step" v-show="isStarted">
      <div v-for="(item, index) in steps" :key="index">
        <button class="item_btn" :class="{active: index === process}">{{item.title}}</button>
      </div>
    </div>

    <component :is="layoutProcess" :items="questions[process]"></component>
         

    <div v-for="group in groupList" :key="group.id" class="weather-data">
      <div class="weather-stats">
        <div>
          <span>{{group.name}}</span>
        </div>
        <div>
          <span class="location">{{group.total_score}}</span>
        </div>
      </div>

      <div class="group-temp">
        <span>{{group.total_login}}</span>
      </div>
    </div>

    <div>
      <p>total login :</p>
      {{totalItem()}}
    </div>
  </div>
</template>


<script>
import { mapGetters, mapActions } from "vuex";
import api from '../../api/led';
import ProcessKhoiDongLed from "../../components/led/ProcessKhoiDong";
import ProcessKienDinhLed from "../../components/led/ProcessKienDinh";
import ProcessVuotTroiLed from "../../components/led/ProcessVuotTroi";
import ProcessButPhaLed from "../../components/led/ProcessButPha";
import ProcessCauHoiPhuLed from "../../components/led/ProcessCauHoiPhu";
import { db } from "@/db";

let eventsRef = db.ref('events');
export default {
  name: "ShowQuestion",
  components: {
    ProcessKhoiDongLed,
    ProcessKienDinhLed,
    ProcessVuotTroiLed,
    ProcessButPhaLed,
    ProcessCauHoiPhuLed
  },
  data() {
    return {
      totalLogin: 0,
      groupList: [],
      events :[],
      steps: [
        {
          title: "Vòng Khởi Động",
          component: "ProcessKhoiDongLed"
        },
        {
          title: "Vòng Kiên Định",
          component: "ProcessKienDinhLed"
        },
        {
          title: "Vòng Vượt Trội",
          component: "ProcessVuotTroiLed"
        },
        {
          title: "Vòng Bứt Phá",
          component: "ProcessButPhaLed"
        },
        {
          title: "Vòng Phụ",
          component: "ProcessCauHoiPhuLed"
        }
      ]
    };
  },
  computed: {
    ...mapGetters("game", [
      "questions",
      "process",
      "processQuestion",
      "isStarted",
      "endProcess"
    ]),
    layoutProcess() {
      try {
        return this.steps[this.process]["component"];
      } catch (e) {
        return false;
      }
    }
  },
  mounted() {
    this.getList();  
    this.startProcessGame();  
  },
  firebase: {
    events: eventsRef
  },
  methods: {
    async getList(){// eslint-disable-line
      let obj = await api.getListGroup();
      this.groupList = obj.data;       
    }, 
    totalItem() {
      let sum = 0;
      for (let i = 0; i < this.groupList.length; i++) {
        sum += parseInt(this.groupList[i].total_login);
      }

      return sum;
    },  
    ...mapActions("game", ["startGame"]),  
    startProcessGame(){
      var self = this;
        eventsRef.on('value', function(snapshot) {       
          snapshot.forEach(function(childSnapshot) {              
                let childData = childSnapshot.val();
                if(childData){                     
                    self.startGame();                 
                }              
            });
        });       
    }
  }
};
</script>

<style scoped lang="scss">
.process-step {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  .item_btn {
    outline: none;
    opacity: 0.8;
    pointer-events: none;

    &.active {
      opacity: 1;
      background: blue;
      color: #ffffff;
    }
  }
}
.led_box {
  border: solid 1px red;
  position: fixed;
  right: 0px;
  top: 0px;
  padding: 20px;
}
.group-data {
  display: flex;
  align-items: center;
  margin-top: 20px;
  margin-left: 20px;
  border-bottom: 2px solid #ccc;
  padding: 20px;
}
.group-icon {
  flex-grow: 1;
}
.group-stats {
  flex-grow: 8;
  text-align: left;
  padding-left: 20px;
}
.group-stats .location {
  font-size: 30px;
}
.group-temp {
  flex-grow: 1;
  font-size: 35px;
}
img {
  width: 70px;
}
button {
  padding: 10px;
  background-color: #1aa832;
  color: white;
  border: 1px solid #ccc;
}
</style>