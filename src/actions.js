export function signup(payload) {
    return {
        type : 'INITIATE_SIGNUP',
        payload
    }
}

export function signupSuccess(payload) {
    return {
        type : 'SIGNUP_SUCCESS',
        payload
    }
}

export function signupFailure(message) {
    return {
        type : 'SIGNUP_FAILURE',
        message
    }
}

export function signin(payload) {
    return {
        type : 'INITIATE_SIGNIN',
        payload
    }
}

export function signinSuccess(payload) {
    return {
        type : 'SIGNIN_SUCCESS',
        payload
    }
}

export function signinFailure(message) {
    return {
        type : 'SIGNIN_FAILURE',
        message
    }
}

