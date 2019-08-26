import { get } from './base';

async function getQuestions() {
  return await get('/api/v1/question');
}



export default {
  getQuestions,
};
