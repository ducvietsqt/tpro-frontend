import api from '../../api/question';
import {getSESSION, SESSION, setSESSION} from "../../utils";
import {COUNT_DOWN_QUESTION} from "../../utils/constant";
// initial state
const state = {
  questions: [],

  process: null,
  processQuestion: null, //0, 1, 2, 3...

  timer: COUNT_DOWN_QUESTION,
  processTimer: COUNT_DOWN_QUESTION,
  startTimer: false,

  answered: null,

  isStarted: false, // start game
  isFinishedProcess: false, // finished process || 1, 2, 3...
  isFinished: false, // finished all process



};

// getters
const getters = {
  questions: state => state.questions,

  process: state => state.process,
  processQuestion: state => state.processQuestion,

  timer: state => state.timer,
  processTimer: state => state.processTimer,
  startTimer: state => state.startTimer,

  isStarted: state => state.isStarted,
  isFinishedProcess: state => state.isFinishedProcess,
  isFinished: state => state.isFinished,

};

// actions
const actions = {
  async fetchQuestion({commit}) {
    let rs = await api.getQuestions();
    commit("SET_QUESTION", rs)
  },
  startGame({commit}) {
    commit("START_GAME")
  },
  endGame({commit}) {
    commit("END_GAME")
  },
  resetGame({commit}) {
    commit("RESET_GAME")
  },
  calcGame({commit}) { // eslint-disable-line
    // calculate game

    /*...*/
    // middleware
    /*...*/
  },
  tickQuestion({commit}) {
    commit("TICK_QUESTION");
  },
  answerQuestion({commit}, {index, is_correct}) { // eslint-disable-line
    // answered
    commit("STOP_TIMER", {index, is_correct})

  },
  startTimer({commit}) {  // eslint-disable-line
    commit("START_TIMER")
  },
  stopTimer({commit}) {  // eslint-disable-line
    commit("STOP_TIMER")
  },

  tickTimer({commit, state}, processTimer) { // eslint-disable-line
    commit("TICK_TIMER", processTimer);
  }

};

// mutations
const mutations = {
  SET_QUESTION(state, payload) {
    console.log('SET_QUESTION', payload.data);
    state.questions = payload.data;
    setSESSION(SESSION.QUESTIONS, payload.data);
  },
  START_GAME(state) {
    state.isStarted = true;
    if (state.process === null) {
      state.process = 0;
    } else if (state.process <= state.questions.length - 1) {
      state.process += 1;
    }

  },
  END_GAME(state) {
    state.isStarted = false;
    state.isFinishedProcess = true;
    state.isFinished = true;

  },
  RESET_GAME(state) {
    state.process = null;
    state.processQuestion = null;
    state.isStarted = false;
    state.isFinishedProcess = false;
    state.isFinished = false;
    state.questions = getSESSION(SESSION.QUESTIONS);
  },

  TICK_QUESTION(state) {
    if (state.processQuestion === null) {
      state.processQuestion = 0;
    } else if (state.processQuestion <= state.questions[state.process]['questions'].length - 1) {
      state.processQuestion += 1;
    }
  },
  START_TIMER(state) {
    state.startTimer = true;
    state.timer = COUNT_DOWN_QUESTION;
    state.processTimer = COUNT_DOWN_QUESTION;
  },
  STOP_TIMER(state, data) { // eslint-disable-line
    state.startTimer = false;
    let _state = {...state};
    state.questions[state.process]['questions'][state.processQuestion]['answered'] = {
      is_correct: data ? data['is_correct'] : false,
      time: data ? _state.processTimer : COUNT_DOWN_QUESTION
    };
    // state.timer = COUNT_DOWN_QUESTION;
    // state.processTimer = COUNT_DOWN_QUESTION;
  },
  TICK_TIMER(state, processTimer) {
    state.processTimer = processTimer;
  },

};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
