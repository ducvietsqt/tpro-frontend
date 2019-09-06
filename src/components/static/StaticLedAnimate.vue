<template>
  <div class="main_layout_led">
    <div class="container_led">
      <div class="topbar-led">
        <img class="led_left" src="../../assets/Vuot-Troi-Moi-Ngay_white.png" alt=""/>
        <img class="led_right" src="../../assets/logo_techcombak_white-01.png" alt=""/>
      </div>
      <div class="title_led">
        <strong>Khởi động</strong>
        <p class="timer_title">
          <span>60</span>S
        </p>
      </div>
      <div class="contain_led_show">
        <div class="left_contain">
          <div>
            <div class="progress-bar-container">
              <div class="item">
                <div class="progress-bar stripes">
                  <span :class="{pause: pause, animate: !pause}"
                        :style="{height: pause ? '20%' : ''}"
                        class="progress-bar-inner" style="animation-delay: 1.5s;">
                    <strong v-if="pause">20%</strong>
                  </span>
                </div>
                <p class="index_qs">A</p>
              </div>
              <div class="item">
                <div class="progress-bar stripes animated reverse slower">
                  <span :class="{pause: pause, animate: !pause}"
                        :style="{height: pause ? '80%' : ''}"
                        class="progress-bar-inner" style="animation-delay: 1s;">
                    <strong v-if="pause">80%</strong>
                  </span>
                </div>
                <p class="index_qs">B</p>
              </div>
              <div class="item">
                <div class="progress-bar stripes">
                  <span :class="{pause: pause, animate: !pause}"
                        :style="{height: pause ? '15%' : ''}"
                        class="progress-bar-inner" style="animation-delay: 2s;">
                    <strong v-if="pause">15%</strong>
                  </span>
                </div>
                <p class="index_qs">C</p>
              </div>
              <div class="item">
                <div class="progress-bar stripes animated reverse slower">
                  <span :class="{pause: pause, animate: !pause}"
                        :style="{height: pause ? '35%' : ''}"
                        class="progress-bar-inner" style="animation-delay: 3s;">
                    <strong v-if="pause">35%</strong>
                  </span>
                </div>
                <p class="index_qs">D</p>
              </div>

            </div>
            <button style="margin-bottom: 20px; border: none; background: #fff; color: #000; padding: 10px;"
                    @click.stop="pause = true">Stop</button>
          </div>
          <p class="title-s20">
            CÂU HỎI:
          </p>
          <p class="drs-s20">
            Câu hỏi tối đa 200 ký tự Lorem ipsumam nonummy nibh euismod tincidunt ut laoreet tminim veniam, quis nostrud
            exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequa
          </p>
          <ol class="list_upper_question">
            <li class="answred">
              câu trả lời tối đa 120 ký tự Lorem ipsumam nonummy nibh euismod tincidunt ut laoreet tminim veniam, quis
            </li>
            <li>
              câu trả lời tối đa 120 ký tự Lorem ipsumam nonummy nibh euismod tincidunt ut laoreet tminim veniam, quis
            </li>
            <li>
              câu trả lời tối đa 120 ký tự Lorem ipsumam nonummy nibh euismod tincidunt ut laoreet tminim veniam, quis
            </li>
            <li>
              câu trả lời tối đa 120 ký tự Lorem ipsumam nonummy nibh euismod tincidunt ut laoreet tminim veniam, quis
            </li>
          </ol>
        </div>
        <div class="line_contain">
        </div>
        <div class="right_contain">
          <table class="table_view">
            <tr>
              <th>Đội</th>
              <th>Số lượng</th>
              <th>Điểm</th>
            </tr>
            <tr>
              <td>Liên Quân 1</td>
              <td>20</td>
              <td>
                <div class="box_point">
                  0000
                </div>
              </td>
            </tr>
            <tr>
              <td>Liên Quân 1</td>
              <td>20</td>
              <td>
                <div class="box_point">
                  0000
                </div>
              </td>
            </tr>
            <tr>
              <td>Liên Quân 1</td>
              <td>20</td>
              <td>
                <div class="box_point">
                  0000
                </div>
              </td>
            </tr>
            <tr>
              <td>Liên Quân 1</td>
              <td>20</td>
              <td>
                <div class="box_point">
                  0000
                </div>
              </td>
            </tr>
            <tr>
              <td>Liên Quân 1</td>
              <td>20</td>
              <td>
                <div class="box_point">
                  0000
                </div>
              </td>
            </tr>
            <tr>
              <td>Liên Quân 1</td>
              <td>20</td>
              <td>
                <div class="box_point">
                  0000
                </div>
              </td>
            </tr>
            <tr>
              <td>Liên Quân 1</td>
              <td>20</td>
              <td>
                <div class="box_point">
                  0000
                </div>
              </td>
            </tr>
            <tr>
              <td>Liên Quân 1</td>
              <td>20</td>
              <td>
                <div class="box_point">
                  0000
                </div>
              </td>
            </tr>
            <tr>
              <td>Liên Quân 1</td>
              <td>20</td>
              <td>
                <div class="box_point">
                  0000
                </div>
              </td>
            </tr>
            <tr>
              <td>Liên Quân 1</td>
              <td>20</td>
              <td>
                <div class="box_point">
                  0000
                </div>
              </td>
            </tr>

            <tr>
              <td colspan="3">
                <div class="sum_title">
                  Số người đã đăng nhập: <strong>125</strong>
                </div>
              </td>
            </tr>
          </table>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "StaticLedAnimate",
    data() {
      return {
        pause: false
      }
    }
  }
</script>

<style scoped>

</style>
