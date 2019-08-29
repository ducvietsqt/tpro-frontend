import { post, get } from './base';

async function login({code}) {
  let form = new FormData();
  form.append("code", code);
  return await post('/api/v1/user/login', form);
}
async function logout() {
  return await post('/api/v1/user/logout');
}

async function getList() {
  return await get('/api/v1/question');
}



export default {
  login,
  getList,
  logout
};