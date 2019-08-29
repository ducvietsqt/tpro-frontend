import { get, patch, sleep } from './base';
import data from "../mock-data/users";
let url_me = "/api/users/me";
async function getMe() {
  return await get(url_me);
}
async function getListUser() {
  return {
    totals: 100,
    dataUser: data.userProject
  };
}
async function updateProfile(data) {
  return await patch(`/api/users/me`, data);
}
async function searchListUser() {
  await sleep();
  return {
    dataUser: data.users
  };
}

async function getDataListUser() {
  await sleep();
  const { userList } = data;
  return userList
}

export default {
  getMe,
  getListUser,
  searchListUser,
  getDataListUser,
  updateProfile
};
