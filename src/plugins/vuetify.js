import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'md',
  },
  theme: {
    themes: {
      light: {
        primary: "#6d42c7",
        secondary: "#e57373",
        accent: "#8aacff",
        error: "#e85b48",
        warning: "#fbe4a0",
        info: "#626fe6",
        success: "#24b314",
        grey: "#757575"
      },
      dark: {
        primary: "#6d42c7",
        secondary: "#e57373",
        accent: "#8aacff",
        error: "#e85b48",
        warning: "#fbe4a0",
        info: "#626fe6",
        success: "#24b314",
        grey: "#757575"
      }
    }
  }
});
