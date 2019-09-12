<template>
  <div>    
    <div v-show="endProcess && process != 0">
      <div v-if="choiceList.length > 0">
        <p class="text-center drs-kq">
          Số người được chọn <br/>
          vào vòng {{process+1}} : <strong>{{totalItem()}}</strong>
        </p>
      </div> 
      <div v-else>
        <p class="text-center drs-kq">
          Hiện tại không có ai <br/>
          lọt vào vòng {{process+1}}
        </p>
      </div>       
    </div>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";
  import api from '../../api/led';
  import _ from 'lodash';

  export default {
    name: "TotalNextRound",
    props: ["items"],
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
        console.log(list);
        let temp = _.groupBy(list, 'group_id');        
        for (let i in temp) {
          this.choiceList.push({
            name: temp[i][0].group[0].name,
            id: temp[i][0].group_id,
            total: temp[i].length
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
