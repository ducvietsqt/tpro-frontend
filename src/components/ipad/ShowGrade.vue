<template>
    <div>
      <p>
        <strong>Chào mừng bạn đến với T-Pro Confetti</strong>
      </p>
      <input type="text" name="search" placeholder="Tìm kiếm" />
      <button type="submit">Go</button> 
      <div class="grade" v-for="(grade, index) in gradeList" :key="index">
          <div v-if="gradeList.length > 0">
                <span>{{grade.id}}</span> 
                <span>{{ grade.name}}</span>
                <button :disabled="choices.indexOf(grade.id) !== -1" @click.stop="activeUser(grade.id, grade.name)" type="button">Active</button>
          </div>
          <div v-else> 
            <div>
              <p>Hiện tại hệ thống đang xử lý kết quả. Vui lòng chờ trong giây lát!</p>
            </div>           
          </div>
      </div>    
    </div>
</template>

<script>
import api from '../../api/led';
import { db } from "@/db";
let usersRef = db.ref('users');

export default {  
  name: "showGrade",  
  data() {
    return {
      gradeList : [],
      choices :[]
    };
  },
  firebase: {
    events: usersRef
  },
  computed: {},  
  mounted() {
    this.getList();
  },
  methods: {     
    async getList(){// eslint-disable-line
      let obj = await api.getListGroup();     
      this.gradeList = obj.data;       
    },  
    activeUser(id, name) {// eslint-disable-line
      // do something
      this.$firebaseRefs.events.push({
        name: name,
        id: id        
      });
      this.choices.push(id);
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
</style>
