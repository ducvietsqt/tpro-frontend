<template>
  <div class="contain_led_result contain_led_result--lienquan" v-if="gradeList.length> 0">
      <div class="item">
        <ul class="list_answred">   
          <li class="list_answred--item">
              <div class="drs">
                <!--<p class="mnv pos-relative">
                  <span class="arrow_box">2</span>
                  Liên Quân 1
                </p>-->
              </div>              
            </li>       
          <li class="list_answred--item" v-for="(grade, index) in gradeList" :key="index" :class="['grade ', (choices.indexOf(grade.code) !== -1 ? 'green' :'red')]">
            <div class="drs">
              <p class="name">
                <span>{{grade.name}}</span>
              </p>
            </div>
            <p class="both_text_item">
              {{grade.code}}
            </p>
          </li>
        </ul>

      </div>        
    </div>    
    <div v-else>
      <div class="drs">
          <p class="grade green" style="text-align:center; font-size:30px;line-height: 45px">Hiện tại hệ thống đang xử lý kết quả.<br/> Vui lòng cập nhật sau!</p>
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
      let obj = await api.getListGroupGrade();
      this.gradeList = obj.data.list;
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
