import { call, put, takeLatest } from 'redux-saga/effects'
import axios from 'axios';
import { signupSuccess, signupFailure } from './actions';

function SignUpApi(payload) {
    var bodyFormData = new FormData();
    Object.keys(payload).forEach((key)=>{
        bodyFormData.set(key, payload[key])
    });
    return axios.request({
        method: 'post',
        url: 'https://jetcakeapi.azurewebsites.net/users/signup',
        data: bodyFormData,
        headers: {'Content-Type': 'multipart/form-data' }
    });
}

function* signupUser({payload}) {
    try {
        let { signUpResponse } = yield call(SignUpApi, payload);
        yield put (signupSuccess(signUpResponse));

    } catch (e) {
        let { message } = e.response.data;
        yield put(signupFailure(message));
    }
}

function* mySaga() {
    yield takeLatest("INITIATE_SIGNUP", signupUser);
}

export default mySaga;
