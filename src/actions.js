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
