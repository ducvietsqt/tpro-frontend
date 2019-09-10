import { get } from './base';

async function getQuestions() {
  return await get('/api/v1/question');
}
async function getProcessCurrent() {
  return await get('/api/v1/info/get-process-current');
}


export default {
  getQuestions,
  getProcessCurrent
};
