<template>
  <div class="right_contain">
    <table class="table_view">
      <tr>
        <th>Đội</th>
        <th>Số lượng</th>
        <th>Điểm</th>
      </tr>
      <tr v-for="(data, i) in choiceList" :key="i">
        <td>{{data.name}}</td>
        <td>{{data.total}}</td>
        <td>
          <div class="box_point">
            {{data.total_score}}
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

  export default {
    name: "TotalNextRound",    
    data() {
      return {
        choiceList: []
      }
    },
    computed: {
      ...mapGetters("game", [
        "process","endProcess"
      ])
    },
    methods: {
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
      totalItem() {
        if(this.endProcess){
            let sum = 0;          
            for (let i = 0; i < this.choiceList.length; i++) {
              sum += parseInt(this.choiceList[i].total);
            }

            return sum; 
        }            
      }
    },    
    watch: {
      endProcess: function (t, n) { // eslint-disable-line    
        this.choiceList = [];
        this.getListGroupGrade();
      }
    }
  }
</script>
