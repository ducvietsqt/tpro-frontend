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
    console.log('XXX',e);
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
  try {
    store.commit("snackbar/setMessages", e.response.data);
  }catch (e) {
    store.commit("snackbar/setMessages", e);
  }
}

export { get, patch, post, put, remove, sleep };
