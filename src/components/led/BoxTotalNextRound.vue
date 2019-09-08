<template>
  <div>
    <p class="text-center drs-kq">
      Số người được chọn <br/>
      vào vòng {{process+1}} : <strong>30</strong>
    </p>
    <div>
      <table class="table_view">
        <tr v-for="(data, i) in choices" :key="i">
          <td>{{data.name}}</td>
          <td>{{data.total}}</td>
        </tr>
      </table>
    </div>
    <div>

      </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

  export default {
    name: "TotalNextRound",    
    props: ["items"],    
    data() {
      return {

      }
    },
    computed: {
      ...mapGetters("game", [
        "process"
      ]),
      choices() {        
        return this.items;
      }
    },
    methods: {    
    }
  }
</script>
