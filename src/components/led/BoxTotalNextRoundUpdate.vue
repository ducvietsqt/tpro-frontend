<template>
  <div class="right_contain">
    <table class="table_view">
      <tr>
        <th>Đội</th>
        <th>Số lượng</th>
        <th>Điểm</th>
      </tr>
      <tr v-for="(data, i) in groupList" :key="i">
        <td>{{data.name}}</td>
        <td>{{checkDataUpdate(data.id).length != 0 ? checkDataUpdate(data.id).total :0}}</td>
        <td>
          <div class="box_point">
            <td>{{checkDataUpdate(data.id).length != 0 ? checkDataUpdate(data.id).total_score :0}}</td>
          </div>
        </td>
      </tr>      

      <tr>
        <td colspan="3">
          <div class="sum_title">
            Số người đang chơi: <strong>{{totalItem()}}</strong>
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";
  import api from '../../api/led';
  import _ from 'lodash';
  import {db} from "../../db";

  let eventsRef = db.ref('events');

  export default {
    name: "TotalNextRound",    
    data() {
      return {
        choiceList: [],
        groupList: []
      }
    },
    computed: {
      ...mapGetters("game", [
        "process","endProcess"
      ])
    },
     mounted() {
      this.listenEventUpdateGroup();
    },
    firebase: {
      events: eventsRef
    },
    methods: {
      async getList() {// eslint-disable-line
        let obj = await api.getListGroup();
        this.groupList = obj.data;
      },
      async getListGroupGrade() {        
        let obj = await api.getListGroupGrade();
        let list = obj.data.list;        
        let temp = _.groupBy(list, 'group_id');              
        for (let i in temp) {
          this.choiceList.push({
            name: temp[i][0].group[0].name,
            id: temp[i][0].group_id,
            total: temp[i].length,
            total_score: temp[i][0].total_score,
          });
        }        
      },
      checkDataUpdate(gradeId){
        let result = [];
        const newArray = this.choiceList.filter((data, index) => {
          if(data.id == gradeId)
            {
              result = data;              
            }               
        });
        return result;        
      },
      totalItem() {
        if(this.endProcess){
            let sum = 0;          
            for (let i = 0; i < this.choiceList.length; i++) {
              sum += parseInt(this.choiceList[i].total);
            }

            return sum; 
        }      
      },
      listenEventUpdateGroup(){
        let self = this;
        eventsRef.on('value', function(snapshot) {
          snapshot.forEach(function(childSnapshot) {
              let childData = childSnapshot.val();
              if(childData){
                  if(childData.key == "update_round"){                    
                    self.choiceList = [];
                    self.getList();
                    self.getListGroupGrade();
                  }
              }
            });
        });
      }
    },    
    watch: {
      endProcess: function (t, n) { // eslint-disable-line    
        this.choiceList = [];
        this.getList();
        this.getListGroupGrade();
      }
    }
  }
</script>
<style scoped lang="scss">
  .hidden{
    opacity: 0.5;
  }
</style>
