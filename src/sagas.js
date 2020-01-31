import { call, put, takeLatest } from 'redux-saga/effects'
import axios from 'axios';
import {
    signupSuccess, signupFailure,
    signinSuccess, signinFailure,
    getProfileSuccess, getProfileFailure,
    updateProfileSuccess, updateProfileFailure
} from './actions';

const apiBaseUrl = 'https://jetcakeapi.azurewebsites.net';
// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    const token = localStorage.getItem("token");
    if ( token != null ) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

function SignUpApi(payload) {
    var bodyFormData = new FormData();
    Object.keys(payload).forEach((key)=>{
        bodyFormData.set(key, payload[key])
    });
    return axios.request({
        method: 'post',
        url: apiBaseUrl + '/users/signup',
        data: bodyFormData,
        headers: {'Content-Type': 'multipart/form-data' }
    });
}

function* signupUser({payload}) {
    try {
        let { data } = yield call(SignUpApi, payload);
        yield put (signupSuccess(data));

    } catch (e) {
        let { message } = e.response.data;
        yield put(signupFailure(message));
    }
}


function SignInApi(payload) {
    return axios.request({
        method: 'post',
        url: apiBaseUrl + '/users/signin',
        data: payload,
    });
}

function* signinUser({payload}) {
    try {
        let { data } = yield call(SignInApi, payload);
        //Sets the token in localstorage
        localStorage.setItem("loggedIn", true);
        localStorage.setItem("token", data.data.token);
        yield put (signinSuccess(data));

    } catch (e) {
        let { message } = e.response.data;
        yield put(signinFailure(message));
    }
}

function GetProfileApi(payload) {
    return axios.request({
        method: 'get',
        url: apiBaseUrl + '/users/profile'
    }).then(response => response.data);
}

function* getProfile({payload}) {
    try {
        let { data }  = yield call(GetProfileApi, payload);
        yield put (getProfileSuccess(data));

    } catch (e) {
        let { message } = e.response ? e.response.data : "We are facing issues currently";
        yield put(getProfileFailure(message));
    }
}

function UpdateProfileApi(payload) {
    return axios.request({
        method: 'put',
        url: apiBaseUrl + '/users/profile',
        data: payload
    });
}

function* updateProfile({payload}) {
    try {
        let { data } = yield call(UpdateProfileApi, payload);

        yield put (updateProfileSuccess(data));

    } catch (e) {
        let { message } = e.response.data;
        yield put(updateProfileFailure(message));
    }
}

function* mySaga() {
    yield takeLatest("INITIATE_SIGNUP", signupUser);
    yield takeLatest("INITIATE_SIGNIN", signinUser);
    yield takeLatest("INITIATE_GET_PROFILE", getProfile);
    yield takeLatest("INITIATE_UPDATE_PROFILE", updateProfile);
}

export default mySaga;
