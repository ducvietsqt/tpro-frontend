<template>
  <div>
      <div>
        <p class="text-highlight">
          Chào mừng bạn <br/> đến với <br/>
          <strong>T-Pro Confetti</strong>
        </p>
      </div>
      <input type="text" class="input-search-user" v-model="search" placeholder="Tìm kiếm" />
      <!-- <button type="submit">Go</button>  -->
      <div class="grade" v-for="(grade, index) in filterGradeList" :key="index">
          <div class="grade-item" v-if="gradeList.length > 0">
                <div class="grade-code"><p>{{grade.code}}</p></div>
                <div class="grade-name">{{ grade.name}} - {{grade.group[0].name}}</div>
                <div class="grade-button"><button :class="(choices.indexOf(grade.code) !== -1)?'hidden':''" :disabled="choices.indexOf(grade.code) !== -1" @click.stop="activeUser(grade.code, grade.name)" type="button">Xác nhận</button></div>                
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
import { db } from "../../db";
let usersRef = db.ref('users');

export default {
  name: "showGrade",
  data() {
    return {
      gradeList : [],
      choices :[],
      search:''
    };
  },
  firebase: {
    events: usersRef
  },
  computed: {
    filterGradeList:function(){
      /*return this.gradeList.filter((grade) =>{
          return grade.code.match(this.search);
      });*/
      let result = this.gradeList
      if (this.search){
        result = result.filter(event =>
          event.name.toLowerCase().includes(this.search.toLowerCase()) ||
          event.code.toLowerCase().includes(this.search.toLowerCase())
        )
      }
      return result;
    }
  },
  mounted() {
    this.getList();
  },
  methods: {
    async getList(){// eslint-disable-line
      let obj = await api.getListGroupGrade();
      this.gradeList = obj.data.list;
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
