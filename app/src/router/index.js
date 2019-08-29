import Vue from 'vue';
import Router from 'vue-router';
import paths from './paths';
import Meta from "vue-meta";
import VueBreadcrumbs from 'vue-2-breadcrumbs';


import store from '../store';

Vue.use(Router);
Vue.use(Meta);
Vue.use(VueBreadcrumbs);


const router = new Router({
  base: '/',
  mode: 'history',
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
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.getters["auth/isLoggedIn"]) {
      next({
        path: "/signin",
        query: { redirect: to.fullPath }
      });
    } else {
      store.dispatch("workspace/appConfigs/getAppConfigs", null, { root: true }).then(() => {
        next();
      })
      // ...mapActions("workspace/appConfigs", ["getAppConfigs"]),
    }
  } else {
    store.dispatch("workspace/appConfigs/getAppConfigs", null, { root: true }).then(() => {
      next(); // make sure to always call next()!
    })
  }
});
router.afterEach((page) => {
  const layoutType = (page.meta || {}).layoutType;
  if (layoutType === 'project-detail') {
    store.commit('layout/setToolbarTypeToBeProjectType');
  }
  else if (layoutType === 'notebook-detail') {
    store.commit('layout/setToolbarTypeToBeNotebookType');
  }
  else if (layoutType === 'setting') {
    store.commit('layout/setToolbarTypeToBeSettingType');
  }
  else {
    store.commit('layout/setToolbarTypeToBeHomeType');
  }
});
export default router;
