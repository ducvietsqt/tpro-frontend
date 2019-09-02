import api from '../../api/question';
import {getSESSION, SESSION, setSESSION} from "../../utils";
import {COUNT_DOWN_QUESTION} from "../../utils/constant";
import {sleep} from "../../api/base";
// initial state
const state = {
  questions: [],

  process: null,
  processQuestion: null, //0, 1, 2, 3...
  endProcess: false,

  timer: COUNT_DOWN_QUESTION,
  processTimer: COUNT_DOWN_QUESTION,
  startTimer: false,

  isStarted: false, // start game
  isFinishedProcess: false, // finished process || 1, 2, 3...
  isFinished: false, // finished all process

  resultsProcess: [],
  totalTimeAnsweredProcess: 0,
  isShowQuestion : false,
  isShowAnswer :false,
  isShowCountDown : false


};

// getters
const getters = {
  questions: state => state.questions,

  process: state => state.process,
  processQuestion: state => state.processQuestion,
  endProcess: state => state.endProcess,

  timer: state => state.timer,
  processTimer: state => state.processTimer,
  startTimer: state => state.startTimer,

  isStarted: state => state.isStarted,
  isFinishedProcess: state => state.isFinishedProcess,
  isFinished: state => state.isFinished,


  resultsProcess: state => state.resultsProcess,
  totalTimeAnsweredProcess: state => state.totalTimeAnsweredProcess,

  isShowQuestion: state => state.isShowQuestion,
  isShowAnswer: state => state.isShowAnswer,
  isShowCountDown: state => state.isShowCountDown



};

// actions
const actions = {
  async fetchQuestion({commit}) {
    let rs = await api.getQuestions();
    commit("SET_QUESTION", rs)
  },
  startGame({commit}) {
    commit("START_GAME");

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
    commit("START_TIMER");
  },
  answerQuestion({commit}, {index, is_correct}) { // eslint-disable-line
    // todo: answered
    commit("STOP_TIMER", {index, is_correct})

  },

  startProcessTimer({commit}) {  // eslint-disable-line
    commit("START_TIMER")
  },
  async stopTimer({commit, state}) {  // eslint-disable-line
    await commit("STOP_TIMER");
    if(!state.endProcess) {
      // todo: no answered and no end process
      await sleep(1000);
      commit("TICK_QUESTION");
      commit("START_TIMER");
    }

  },

  tickTimer({commit, state}, processTimer) { // eslint-disable-line
    commit("TICK_TIMER", processTimer);
  },

  // result
  getResultProcess({commit}) {
    commit("RESULT_PROCESS");
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
    state.endProcess = false;
    state.processQuestion = null;
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
    } else if (state.processQuestion < state.questions[state.process]['questions'].length - 1) {      
      state.processQuestion += 1;
    } else if (state.processQuestion === state.questions[state.process]['questions'].length - 1) {

      state.startTimer = false;
      state.endProcess = true; // note *

      // alert('DONE QUESTION')
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

  RESULT_PROCESS(state) { // eslint-disable-line
    // console.log(state);
    console.log(state.questions[state.process]['questions'])
    state.resultsProcess = state.questions[state.process]['questions'].filter(i => i.answered.is_correct);

    for(let i = 0; i < state.questions[state.process]['questions'].length; i++) {
      state.totalTimeAnsweredProcess +=  state.questions[state.process]['questions'][i]['answered']['time'];
    }
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
