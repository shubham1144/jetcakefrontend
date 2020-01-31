export function signup(payload) {
    return {
        type : 'INITIATE_SIGNUP',
        payload
    }
}

export function signupReset() {
    return {
        type : 'RESET_SIGNUP',
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

export function getProfile(payload) {
    return {
        type : 'INITIATE_GET_PROFILE',
        payload
    }
}

export function getProfileSuccess(payload) {
    return {
        type : 'GET_PROFILE_SUCCESS',
        user : {...payload.user, profileImage : payload.profileImage}
    }
}

export function getProfileFailure(message) {
    return {
        type : 'GET_PROFILE_FAILURE',
        message
    }
}

export function updateProfile(payload) {
    return {
        type : 'INITIATE_UPDATE_PROFILE',
        payload
    }
}

export function updateProfileSuccess(payload) {
    return {
        type : 'UPDATE_PROFILE_SUCCESS',
        message: payload.message
    }
}

export function updateProfileFailure(message) {
    return {
        type : 'UPDATE_PROFILE_FAILURE',
        message
    }
}


