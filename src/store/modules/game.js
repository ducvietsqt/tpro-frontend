import api from '../../api/question';
import {getSESSION, SESSION, setSESSION} from "../../utils";
import {COUNT_DOWN_QUESTION} from "../../utils/constant";
import {COUNT_DOWN_TOTAL_QUESTION} from "../../utils/constant";
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
  startTimerLed: false,
  isStopTimerLed: false,

  isStarted: false, // start game
  isFinishedProcess: false, // finished process || 1, 2, 3...
  isFinished: false, // finished all process

  resultsProcess: [],
  totalTimeAnsweredProcess: 0,
  isReady: false,
  isStartWelcome: false,

  nextRound: null,
  isSubmitAnswer: false,
  isUpdateGroupList: false,

  userStopGame: false,
  updateStateProcessQuestion: false,

};

// getters
const getters = {
  // questions: state => state.questions,
  questions: state => state.questions || SESSION.QUESTIONS,

  process: state => state.process,
  processQuestion: state => state.processQuestion,
  endProcess: state => state.endProcess,

  timer: state => state.timer,
  processTimer: state => state.processTimer,
  startTimer: state => state.startTimer,
  startTimerLed: state => state.startTimerLed,
  isStopTimerLed: state => state.isStopTimerLed,

  isStarted: state => state.isStarted,
  isFinishedProcess: state => state.isFinishedProcess,
  isFinished: state => state.isFinished,


  resultsProcess: state => state.resultsProcess,
  totalTimeAnsweredProcess: state => state.totalTimeAnsweredProcess,

  finishedCounDown: state => state.finishedCounDown,
  isReady: state => state.isReady,
  isStartWelcome: state => state.isStartWelcome,

  nextRound: state => state.nextRound || getSESSION(SESSION.NEXT_ROUND),
  isSubmitAnswer: state => state.isSubmitAnswer,
  isUpdateGroupList: state => state.isUpdateGroupList,

  userStopGame: state => state.userStopGame,
  updateStateProcessQuestion: state => state.updateStateProcessQuestion,


};

// actions
const actions = {
  async fetchQuestion({commit}) {
    let rs = await api.getQuestions();
    commit("SET_QUESTION", rs);

  },
  async fetchCurrentProcess({commit}) {
    return new Promise(async resolve => {
      let rs = await api.getProcessCurrent();
      commit("UPDATE_CURRENT_PROCESS", rs.data[0]);
      resolve(rs.data[0]);
    })

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
  answerQuestion({commit}, data) { // eslint-disable-line
    // todo: answered
   commit("STOP_TIMER", data)


  },

  startProcessTimer({commit}) {  // eslint-disable-line
    commit("START_TIMER")
  },
  async stopTimer({commit, state}) {  // eslint-disable-line
    await commit("STOP_TIMER");
    if (!state.endProcess) {
      // todo: no answered and no end process
      await sleep(1000);
      commit("TICK_QUESTION");
      commit("START_TIMER");
    }

  },

  async stopTimerRound({commit}) { // eslint-disable-line
    await sleep(1000);
    await commit("STOP_TIMER");
  },

  stopTimerGame({commit}) { // eslint-disable-line
    commit("STOP_TIMER_GAME");
  },
  async startTimerRound({commit}) {
    await sleep(1000);
    await commit("START_TIMER");
  },
  tickTimer({commit, state}, processTimer) { // eslint-disable-line
    commit("TICK_TIMER", processTimer);
  },

//Process Question Led
  setStateReady({commit}, data) {
    commit("UPDATE_STATE_READY", data);
  },
  startTimerLed({commit}) {
    commit("START_TIMER_LED");
  },
  stopTimerLed({commit}) {
    commit("STOP_TIMER_LED");
  },
  updateStateCounDown({commit}, data) {
    commit("UPDATE_COUNT_DOWN", data);
  },
  updateStatusWelcome({commit}, data) {
    commit("UPDATE_STATUS_WELCOME", data);
  },
// result
  getResultProcess({commit}) {
    commit("RESULT_PROCESS");
  },
  submitAnswer({commit},data){
    commit("SUBMIT_ANSWER",data);
  },
  updateGroupList({commit},data){
    commit("UPDATE_GROUP_LIST",data);
  },
  handleUserStopGame({commit}) {
    commit("USER_STOP_GAME");
  },

};

// mutations
const mutations = {
  SET_QUESTION(state, payload) {
    //console.log('SET_QUESTION', payload.data);
    state.questions = payload.data;
    setSESSION(SESSION.QUESTIONS, payload.data);
    setSESSION(SESSION.QUESTIONS_API, payload.data);
  },
  START_GAME(state) {
    // alert(state.processQuestion)
    state.isStarted = true;
    state.endProcess = false;
    /*if(state.updateStateProcessQuestion === false) {
      state.processQuestion =  null;
    }*/
    state.processQuestion =  null;
    state.startTimer = true;
    state.timer = COUNT_DOWN_QUESTION;
    state.isStopTimerLed = false;
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
    state.isUpdateGroupList = false;
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
    state.isStopTimerLed = false;
  },
  STOP_TIMER(state, data) { // eslint-disable-line
    state.startTimer = false;
    let _state = {...state};
    let tem_timer = getSESSION(SESSION.PROCESS_TIMER);

    state.questions[state.process]['questions'][state.processQuestion]['answered'] = {
      is_correct: data ? data['is_correct'] : false,
     // time: data ? COUNT_DOWN_QUESTION - _state.processTimer : COUNT_DOWN_QUESTION,
      time: data ? COUNT_DOWN_QUESTION - tem_timer : COUNT_DOWN_QUESTION
    };

    // state.timer = COUNT_DOWN_QUESTION;
    // state.processTimer = COUNT_DOWN_QUESTION;
  },
  TICK_TIMER(state, processTimer) {
    state.processTimer = processTimer;
  },

  RESULT_PROCESS(state) { // eslint-disable-line
    //let _state = {...state};
    //console.log(_state.questions[_state.process]['questions'].filter(i => i.answered.is_correct));
    let correct_results = state.questions[state.process]['questions'].filter(i => i.answered.is_correct);
    state.resultsProcess = correct_results;
    //state.totalTimeAnsweredProcess = 0;
    for (let i = 0; i < correct_results.length; i++) {
    //console.log(state.questions[state.process]['questions'][i]['answered']) ;
    console.log(correct_results[i]);
      state.totalTimeAnsweredProcess += correct_results[i]['answered']['time'];
    }
    //state = {..._state};
  },
  UPDATE_STATE_READY(state, data) {
    state.isReady = data;
  },
  START_TIMER_LED(state) {
    state.startTimerLed = true;
    return new Promise(async resolve => {
      resolve(true)
    })
  },
  STOP_TIMER_LED(state) {
    state.isStopTimerLed = true;
    state.startTimerLed = false;
  },
  UPDATE_STATUS_WELCOME(state, data) {
    state.isStartWelcome = data;
  },
  UPDATE_COUNT_DOWN(state, data) {
    state.finishedCounDown = data;
  },
  STOP_TIMER_GAME(state) {
    state.startTimer = false;
  },
  setNextRound(state, payload) {
    state.nextRound = payload;
    setSESSION(SESSION.NEXT_ROUND, payload);
  },
  SUBMIT_ANSWER(state,data){
    state.isSubmitAnswer = data;
  },
  UPDATE_GROUP_LIST(state,data){
    state.isUpdateGroupList = data;
  },
  UPDATE_CURRENT_PROCESS(state, data) {
    /*console.log('UPDATE_CURRENT_PROCESS',data);
    try {
      if(data.process === 1 && data.process_question === 1) {
        state.process = null;
        state.processQuestion = null;
      }else if(data.process === 1 ){
        state.process = 0;
        state.processQuestion = data.process_question - 2;
      }else {
        state.process = data.process - 1;
        state.processQuestion = data.process_question - 2;

      }



      state.updateStateProcessQuestion = true;
      if(data.process === 1 && data.process_question === 1) {
        state.process = null;
        state.processQuestion = null;
      }else if(data.process === 1 && data.process_question !== 1) {
        state.process = data.process  - 1;
        state.processQuestion = data.process_question - 3;
      }else if(data.process !== 1 && data.process_question === 1) {
        state.process = data.process - 1;
        state.processQuestion = null;
      } else {
        state.process = data.process - 1;
        // state.process = 0;
        state.processQuestion = data.process_question - 2;
      }
    }catch (e) {
      console.log(e.message)
    }*/
  },
  USER_STOP_GAME(state) {
    state.userStopGame = true;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
export const getQuestionsCount = (process) => {
  return getSESSION(SESSION.QUESTIONS)[process]['questions'].length
}
