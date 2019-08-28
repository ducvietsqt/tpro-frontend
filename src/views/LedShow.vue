<template>
  <div>
    <p>
      <strong>Chào mừng bạn đến với T-Pro Confetti</strong>
    </p>
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

    <div><p>total login : </p>{{totalItem()}}</div>
  </div>
</template>


<script>
import axios from "axios";

export default {
  name: "Weather",
  data() {
    return {
      totalLogin: 0,
      weatherDataList: []
    };
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
    }
  }
};
</script>

<style scoped>
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
</style>