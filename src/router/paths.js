// Hi, sign in to your company
// import Index from "../donga/views/Index";
const Index = () => import(/* webpackChunkName: "Index" */ '../views/Index');

// import SignIn from "../donga/views/auth/SignIn";
const SignIn = () => import(/* webpackChunkName: "SignIn" */ '../views/auth/SignIn');

const LedShow = () => import(/* webpackChunkName: "LedShow" */ '../views/LedShow');

const DashBoard = () => import(/* webpackChunkName: "DashBoard" */ '../views/DashBoard');
const XX = () => import(/* webpackChunkName: "XX" */ '../views/XX');

import NotFound from '../components/NotFound';


const LAYOUT = {
  NotLoggedIn: "NotLoggedIn",
  LoggedIn: "LoggedIn"
};
export default [
  {path: "*", component: NotFound},
  {
    path: "/",
    name: "index",
    component: Index,
    // meta: {layout: LAYOUT.NotLoggedIn}
  },

  {
    path: "/signin",
    name: "signin",
    component: SignIn,
    meta: {layout: LAYOUT.NotLoggedIn}
  },
  {
    path: "/dashboard",
    name: "dashboard",
    alias: '/me',
    component: DashBoard,
    meta: {
      layout: LAYOUT.LoggedIn
    }
  },
  {
    path: "/ledShow",
    name: "ledShow",
    component: LedShow,
    meta: {layout: LAYOUT.LoggedIn}
  }

];
