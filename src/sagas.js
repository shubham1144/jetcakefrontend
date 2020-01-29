import { call, put, takeLatest } from 'redux-saga/effects'
import axios from 'axios';
import { signupSuccess, signupFailure, signinSuccess, signinFailure } from './actions';

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


function SignInApi(payload) {
    return axios.request({
        method: 'post',
        url: 'https://jetcakeapi.azurewebsites.net/users/signin',
        data: payload,
    });
}

function* signinUser({payload}) {
    try {
        let { signInResponse } = yield call(SignInApi, payload);

        yield put (signinSuccess(signInResponse));

    } catch (e) {
        let { message } = e.response.data;
        yield put(signinFailure(message));
    }
}

function* mySaga() {
    yield takeLatest("INITIATE_SIGNUP", signupUser);
    yield takeLatest("INITIATE_SIGNIN", signinUser);
}

export default mySaga;
