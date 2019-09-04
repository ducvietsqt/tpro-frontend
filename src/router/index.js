import Vue from 'vue';
import Router from 'vue-router';
import paths from './paths';
import Meta from "vue-meta";
Vue.use(Router);
Vue.use(Meta);


const router = new Router({
  base: '/',
  mode: 'hash',
  linkActiveClass: 'active',
  routes: paths,
  // scrollBehavior: function(to, from, savedPosition) {
  scrollBehavior: function (to) {
    if (to.hash) {
      return { selector: to.hash }
    } else {
      return { x: 0, y: 0 }
    }
  },
});
export default router;
