import { get, patch, sleep } from './base'; // eslint-disable-line
let url_me = "/api/users/me";
async function getMe() {
  return await get(url_me);
}
// test
export default {
  getMe,
};
