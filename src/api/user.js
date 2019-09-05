import { get, patch, sleep } from './base'; // eslint-disable-line
let url_me = "/api/users/me";
async function getMe() {
  return await get(url_me);
}
async function getListUser() {
    return await get('/api/v1/user/list');
}
// test
export default {
  getMe,
  getListUser
};
