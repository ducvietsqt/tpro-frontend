import { get, post } from './base';

async function getQuestions() {
  return await get('/api/v1/question');
}
async function getProcessCurrent() {
  return await get('/api/v1/info/get-process-current');
}
async function checkSubmitAnswer(data) { // user_id
  return await post('/api/v1/user/check-submit-answer', data);
}


export default {
  getQuestions,
  getProcessCurrent,
  checkSubmitAnswer
};
