// Hi, sign in to your company
// import Index from "../donga/views/Index";
const Index = () => import(/* webpackChunkName: "Index" */ '../views/Index');

// import SignIn from "../donga/views/auth/SignIn";
const SignIn = () => import(/* webpackChunkName: "SignIn" */ '../views/auth/SignIn');
const CheckDob = () => import(/* webpackChunkName: "CheckDob" */ '../views/auth/CheckDob');

const DashBoard = () => import(/* webpackChunkName: "DashBoard" */ '../views/game/DashBoard');

//Ipad
const DashBoardIpad = () => import(/* webpackChunkName: "DashBoardIpad" */ '../views/ipad/DashBoardIpad');
const IpadShowEvent = () => import(/* webpackChunkName: "IpadShowEvent" */ '../views/ipad/IpadShowEvents');
const IpadShowGrade = () => import(/* webpackChunkName: "IpadShowGrade" */ '../views/ipad/IpadShowGrade');

//Led
const LedShowQuestion = () => import(/* webpackChunkName: "LedShowQuestion" */ '../views/led/LedShowQuestion');
const LedShowGrade = () => import(/* webpackChunkName: "LedShowGrade" */ '../views/led/LedShowGrade');

import NotFound from '../components/NotFound';
const Static = () => import(/* webpackChunkName: "Static" */ '../components/static/Index');
const StaticLed = () => import(/* webpackChunkName: "StaticLed" */ '../components/static/StaticLed');
const StaticLedKhoiDong = () => import(/* webpackChunkName: "StaticLedKhoiDong" */ '../components/static/StaticLedKhoiDong');
const StaticLedCauHoi = () => import(/* webpackChunkName: "StaticLedCauHoi" */ '../components/static/StaticLedCauHoi');
const StaticLedAnimate = () => import(/* webpackChunkName: "StaticLedAnimate" */ '../components/static/StaticLedAnimate');
const StaticLedKetQua = () => import(/* webpackChunkName: "StaticLedKetQua" */ '../components/static/StaticLedKetQua');
const StaticLedButPha = () => import(/* webpackChunkName: "StaticLedButPha" */ '../components/static/StaticLedButPha');
const StaticLedButPha1 = () => import(/* webpackChunkName: "StaticLedButPha1" */ '../components/static/StaticLedButPha1');

const LAYOUT = {
  NotLoggedIn: "NotLoggedIn",
  LoggedIn: "LoggedIn",
  StaticPage: 'StaticPage',
  General :"General",
  Led: "Led",
  LedWhite: "Led-White"
};
export default [
  {path: "*", component: NotFound},
  {
    path: "/",
    name: "index",
    component: Index,
    meta: {layout: LAYOUT.NotLoggedIn}
  },

//Game
  {
    path: "/signin",
    name: "signin",
    component: SignIn,
    meta: {layout: LAYOUT.NotLoggedIn}
  },
  {
    path: "/validate-dob",
    name: "validateDob",
    component: CheckDob,
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

  //Ipad
{
    path: "/ipad/dashboard",
    name: "dashboardIpad",
    component: DashBoardIpad,
    meta: {layout: LAYOUT.General}
  }
  ,
  {
    path: "/ipad/show-event",
    name: "ipadShowEvent",
    component: IpadShowEvent,
    meta: {layout: LAYOUT.LoggedIn}
  }
  ,
  {
    path: "/ipad/show-grade",
    name: "ipadShowGrade",
    component: IpadShowGrade,
    meta: {layout: LAYOUT.General}
  },

  //Led
  {
    path: "/led/show",
    name: "ledShowQuestion",
    component: LedShowQuestion,
    meta: {layout: LAYOUT.Led}
  },
  {
    path: "/led/show-grade",
    name: "ledShowGrade",
    component: LedShowGrade,
    meta: {layout: LAYOUT.LedWhite}
  },

  {
    path: '/static',
    name: 'static',
    meta: {layout: LAYOUT.StaticPage},
    component: Static,
  },
  {
    path: '/static-led',
    name: 'static-led',
    meta: {layout: LAYOUT.StaticPage},
    component: StaticLed,
  },
  {
    path: '/static-led-khoidong',
    name: 'static-led-khoidong',
    meta: {layout: LAYOUT.StaticPage},
    component: StaticLedKhoiDong,
  },
  {
    path: '/static-led-cauhoi',
    name: 'static-led-cauhoi',
    meta: {layout: LAYOUT.StaticPage},
    component: StaticLedCauHoi,
  },
  {
    path: '/static-led-animate',
    name: 'static-led-animate',
    meta: {layout: LAYOUT.StaticPage},
    component: StaticLedAnimate,
  },
  {
    path: '/static-led-ketqua',
    name: 'static-led-ketqua',
    meta: {layout: LAYOUT.StaticPage},
    component: StaticLedKetQua,
  },
  {
    path: '/static-led-butpha',
    name: 'static-led-butpha',
    meta: {layout: LAYOUT.StaticPage},
    component: StaticLedButPha,
  },
  {
    path: '/static-led-butpha1',
    name: 'static-led-butpha1',
    meta: {layout: LAYOUT.StaticPage},
    component: StaticLedButPha1,
  },








];
