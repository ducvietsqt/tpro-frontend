import {get, post} from './base';

async function getListGroup() {
  return await get('/api/v1/led/group');
}

async function getListGroupAnswer() {
  return await get('/api/v1/led/group-answer');
}

async function getListGroupGrade() {
  return await get('/api/v1/led/grade');
}

async function resetRound() {
  return await get('/api/v1/user/reset-result');
}

async function resetInfoGame() {
  return await get('/api/v1/info/reset-info-game');
}

async function resetTotalLogin() {
  return await get('/api/v1/user/reset-total-login');
}

async function updateProcessCurrent(data) {
  return await post('/api/v1/info/update-process-current', data);
}

export default {
  getListGroup,
  getListGroupAnswer,
  getListGroupGrade,
  resetRound,
  updateProcessCurrent,
  resetInfoGame,
  resetTotalLogin
};
