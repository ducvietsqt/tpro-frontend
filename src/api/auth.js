import {post, get} from './base';

async function login({code}) {
  let form = new FormData();
  form.append("code", code);
  return await post('/api/v1/user/login', form);
}

async function logout(code) {
  let form = new FormData();
  form.append("code", code);
  return await post('/api/v1/user/logout', form);
}

export const updateLogin = async (data) => {
  let _base = '/api/v1/user/update-login';
  return await post(_base, data);
}

async function getList() {
  return await get('/api/v1/question');
}


export default {
  login,
  getList,
  logout,
  updateLogin
};
