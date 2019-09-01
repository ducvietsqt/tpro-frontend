<template>
    <div>
      <p>
        <strong>Chào mừng bạn đến với T-Pro Confetti</strong>
      </p>
      <input type="text" name="search" placeholder="Tìm kiếm" />
      <button type="submit">Go</button> 
      <div class="grade" v-for="grade in gradeList">
          <div v-if="gradeList.length > 0">
                <span>{{grade.id}}</span> 
                <span>{{ grade.name}}</span>
                <button type="button">Active</button>
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
import { mapGetters, mapActions } from "vuex";
import { sleep } from "../../api/base";
import api from '../../api/led';

export default {
  name: "IpadShowGrade",  
  props: ["items"],
  data() {
    return {
      gradeList : []
    };
  },
  computed: {
  },
  mounted() {
    this.getList();
  },
  methods: { 
    async getList(){
      let obj = await api.getListGroup();     
      this.gradeList = obj.data;       
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
