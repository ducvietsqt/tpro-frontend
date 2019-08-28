<template>
  <div>
    <p>
      <strong>Chào mừng bạn đến với T-Pro Confetti</strong>
    </p>
    <div v-if="!isStarted">
      <p>
        Các thí sinh sẽ bắt đầu chơi vòng thi khởi động:
        <br />&nbsp;&nbsp;- mỗi câu sẽ có thơi gian trả lời là 10 giây,
        <br />&nbsp;&nbsp;- trả lời đúng thì câu trả lời sẽ sáng lên
        <br />&nbsp;&nbsp;- nếu không trả lời coi như sai
      </p>
      <p>
        <button @click.stop="startProcessGame">Bắt đầu vòng thi khởi động</button>
      </p>
    </div>

    <div class="process-step" v-show="isStarted">
      <div v-for="(item, index) in steps" :key="index">
        <button class="item_btn" :class="{active: index === process}">{{item.title}}</button>
    </div>
    </div>
    <component :is="layoutProcess"
               :items="questions[process]"></component>

    <button v-on:click="getWeatherData">Get Weather Data</button>

    <div v-for="weatherData in weatherDataList" :key="weatherData.id" class="weather-data">
      <div class="weather-stats">
        <div>
          <span>{{weatherData.name}}</span>
        </div>
        <div>
          <span class="location">{{weatherData.total_score}}</span>
        </div>
      </div>

      <div class="weather-temp">
        <span>{{weatherData.total_login}}</span>
      </div>
    </div>

    <div>
      <p>total login :</p>
      {{totalItem()}}
    </div>
  </div>
</template>


<script>
import {mapGetters, mapActions} from 'vuex';
import axios from "axios";
 import CountDown from "../components/game/CountDown";
import ProcessKhoiDong from "../components/game/ProcessKhoiDong";
import ProcessKienDinh from "../components/game/ProcessKienDinh";
import ProcessVuotTroi from "../components/game/ProcessVuotTroi";
import ProcessButPha from "../components/game/ProcessButPha";
import ProcessCauHoiPhu from "../components/game/ProcessCauHoiPhu";

export default {
  name: "Weather",
  components: {
    ProcessButPha,
    ProcessVuotTroi,
    ProcessKienDinh,
    ProcessKhoiDong,
    ProcessCauHoiPhu,
    CountDown
  },
  data() {
    return {
      totalLogin: 0,
      weatherDataList: [],
      steps: [
        {
          title: "Khoi dong",
          component: "ProcessKhoiDong"
        },
        {
          title: "Kien Dinh",
          component: "ProcessKienDinh"
        },
        {
          title: "Vuot troi",
          component: "ProcessVuotTroi"
        },
        {
          title: "But Pha",
          component: "ProcessButPha"
        },
        {
          title: "Cau hoi Phu",
          component: "ProcessCauHoiPhu"
        }
      ]
    };
  },
  computed: {
    ...mapGetters("game", ["questions", "process", "isStarted", "endProcess"]),
    layoutProcess() {
      try {
        return this.steps[this.process]["component"];
      } catch (e) {
        return false;
      }
    }
  },
  methods: {
    getWeatherData() {
      axios
        .get("http://sastudio.vn/t-pro/api/v1/led/group")
        .then(response => (this.weatherDataList = response.data.data));
    },
    totalItem() {
      let sum = 0;
      for (let i = 0; i < this.weatherDataList.length; i++) {
        sum += parseInt(this.weatherDataList[i].total_login);
      }

      return sum;
    },
    ...mapActions("game", ["startGame"]),
    startProcessGame() {
      // do something
      this.startGame();
    }
  }
};
</script>

<style scoped lang="scss">
.weather-data {
  display: flex;
  align-items: center;
  margin-top: 20px;
  margin-left: 20px;
  border-bottom: 2px solid #ccc;
  padding: 20px;
}
.weather-icon {
  flex-grow: 1;
}
.weather-stats {
  flex-grow: 8;
  text-align: left;
  padding-left: 20px;
}
.weather-stats .location {
  font-size: 30px;
}
.weather-temp {
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
</style>