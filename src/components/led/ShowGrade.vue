<template>
    <div>
      <p>
        <strong>Chào mừng bạn đến với T-Pro Confetti</strong>
      </p>
      <div v-if="gradeList.length> 0">
          <div v-for="(grade, index) in gradeList" :key="index" :class="['grade ', (choices.indexOf(grade.id) !== -1 ? 'active' : '')]">
              <span>{{grade.id}}</span>
              <span>{{ grade.name}}</span>
          </div>
      </div>
      <div v-else>
          <p>Hiện tại hệ thống đang xử lý kết quả. Vui lòng chờ trong giây lát!</p>
      </div>
    </div>
</template>

<script>
import api from '../../api/led';
import { db } from "../../db";

let userChoices = db.ref("users");
let choicesRef = [];

export default {
  name: "ledShowGrade",
  props: ["items"],
  data() {
    return {
      events: [],
      gradeList : [],
      choices: [] ,
      userChoiced: '',
      is_status:null
    };
  },
  computed: {
  },
  mounted() {
    this.getList();
    this.getUserChoices();
  },
  firebase: {
    events: userChoices
  },
  methods: {
    async getList(){// eslint-disable-line
      let obj = await api.getListGroup();
      this.gradeList = obj.data;
    },
    getUserChoices(){// eslint-disable-line
      userChoices.on('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
              let childData = childSnapshot.val();
              if(childData){
                  choicesRef.push(childData.id);
              }
          });
      });
      this.choices = choicesRef;
    }
  }
};
</script>
<style scoped lang="scss">
  .grade{
    margin-top: 20px;
  }
  .grade span{
    margin-right: 20px;
  }
  .active{
    color:green;
  }
</style>
