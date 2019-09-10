import {post, get, patch, sleep} from './base'; // eslint-disable-line
let url_me = "/api/users/me";

async function getMe() {
  return await get(url_me);
}

async function getListUser() {
  return await get('/api/v1/user/list');
}


async function submitAnnswer(data) {
  // {user_id, answer, round_id, question_id, total_time, total_correct}
  // let form = new FormData();
  // form.append("user_id", user_id);
  // form.append("answer", answer);
  // form.append("round_id", round_id);
  // form.append("question_id", question_id);
  // form.append("total_time", total_time);
  // form.append("total_correct", total_correct);
  return await post('/api/v1/user/submit', data);
}

// test
export default {
  getMe,
  getListUser,
  submitAnnswer,

};
