<template>
  <div>
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
import api from '../../api/led';

export default {
  name: "Group",
  data() {
    return {
      totalLogin: 0,
      groupList: []
    };
  },
  computed: {},
  mounted() {
    this.getList();
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
