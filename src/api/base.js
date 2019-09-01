import axios from 'axios';
import store from "../store/index";
async function get(url, options) {
  try {
    const response = await axios.get(url, options);
    return response.data;
  }
  catch (e) {
    showMessage(e);
    throw e;
  }
}
async function patch(url, data) {
  try {
    const response = await axios.patch(url, data);
    return response.data;
  }
  catch (e) {
    showMessage(e);
    throw e;
  }
}
async function post(url, data) {
  try {
    const response = await axios.post(url, data);
    return response.data;
  }
  catch (e) {
    showMessage(e);
    throw e;
  }
}

async function put(url, data) {
  try {
    const response = await axios.put(url, data);
    return response.data;
  }
  catch (e) {
    showMessage(e);
    throw e;
  }
}

async function remove(url, data) {
  try {
    const response = await axios.delete(url, data);
    return response.data;
  } catch (e) {
    showMessage(e);
    throw e;
  }
}

async function sleep(time = 500) {
  return new Promise(resolve => {
    setTimeout(() => resolve(), time);
  })
}

function showMessage(e) {
  let keys = Object.keys(e.response.data);
  let messages = [];
  for (let index = 0; index < keys.length; index++) {
    const element = keys[index];
    messages = [...messages, ...e.response.data[element]];
  }
  store.commit("snackbar/setMessages", messages);
}

export { get, patch, post, put, remove, sleep };
