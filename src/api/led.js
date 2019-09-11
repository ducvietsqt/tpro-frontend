import {get, post} from './base';

async function getListGroup() {
    return await get('/api/v1/led/group');
}

async function getListGroupAnswer() {
    return await get('/api/v1/led/group-answer');
}

async function getListGroupGrade() {
    return await get('/api/v1/led/grade');
}

async function resetRound() {
    return await get('/api/v1/user/reset-result');
}

async function updateProcessCurrent(data) {
    return await post('/api/v1/info/update-process-current',data);
}
export default {
    getListGroup, 
    getListGroupAnswer,
    getListGroupGrade,
    resetRound,
    updateProcessCurrent
  };