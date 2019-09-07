<template>
  <div>
    <p class="text-center drs-kq">
      Số người được chọn <br/>
      vào vòng {{process+1}} : <strong>30</strong>
    </p>
    <div>
      <table class="table_view">
        <tr>
          <td>Liên Quân 1</td>
          <td>5</td>
        </tr>
        <tr>
          <td>Liên Quân 1</td>
          <td>5</td>
        </tr>
        <tr>
          <td>Liên Quân 1</td>
          <td>5</td>
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
    data() {
      return {

      }
    },
    computed: {
      ...mapGetters("game", [
        "process"
      ])
    },
    methods: {    
    }
  }
</script>
