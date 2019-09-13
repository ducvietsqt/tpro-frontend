<template>
  <div class="main_layout_led white">
    <div class="container_led">
      <div class="topbar-led">
        <img class="led_left" src="../../assets/Vuot-Troi-Moi-Ngay_color.png" alt=""/>
        <img class="led_right" src="../../assets/logo_techcombak_color-01-01.png" alt=""/>
      </div>
      <div class="container_led">
      <div class="title_led red">
        <strong>Vòng 3 - BỨT PHÁ</strong>        
      </div>
      <div class="contain_led_result contain_led_result--lienquan">
        <div class="item" v-for="(user, index) in userList" :key="index" >
          <table class="table_view_legend">
            <tr>
              <th>
                <p class="lg-name">Liên Quân 2</p>
              </th>              
            </tr>            
            <tr :class="(user.status ? 'green' :'red')">
              <td>
                {{user.user_name}}
              </td>
              <td>
                {{user.user_code}}
              </td>
              <td>
                {{user.user_detail[0].total_time}}s
              </td>
            </tr>

          </table>
        </div>

      </div>
    </div>

    </div>
  </div>
</template>

<script>
  import api from '../../api/user';
  import { db } from "../../db";

  let eventRefts = db.ref("result");

  export default {
    name: "StaticLedButPha",
    data() {
      return {
        userList : []
      };
    },
  computed: {
  },
  mounted() {
    this.getLisUserChoice();  
    this.updateUserList();
  },
  firebase: {
    events: eventRefts
  },
  methods: {
      async getLisUserChoice(){// eslint-disable-line        
        let obj = await api.getLisUserChoice();
        console.log(obj.data);
        this.userList = obj.data;
      },
      updateUserList(){// eslint-disable-line
        let self = this;
        eventRefts.on('value', function(snapshot) {
          snapshot.forEach(function(childSnapshot) {
                let childData = childSnapshot.val();
                if(childData){   
                  self.getLisUserChoice();
                }
            });
        });
      }
    }
  }
</script>

<style scoped>

</style>
