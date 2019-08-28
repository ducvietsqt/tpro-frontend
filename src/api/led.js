import {get } from './base';

async function getListGroup() {
    return await get('/api/v1/led/group');
}

async function getListGroupAnswer() {
    return await get('/api/v1/led/group-answer');
}

async function getListGroupGrade() {
    return await get('/api/v1/led/grade');
}

export default {
    getListGroup, 
    getListGroupAnswer,
    getListGroupGrade
  };