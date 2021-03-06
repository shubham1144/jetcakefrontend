function reducer(state = {
    isLoading: false,
    loggedIn: false,
    profile: null,
    signUpSuccess: false
}, action) {
    switch (action.type) {
        case 'RESET_SIGNUP':
            return {...state, isLoading: false, message: null, signUpSuccess: false};
        case 'INITIATE_SIGNUP':
            return {...state, isLoading: true, message: null, signUpSuccess: false};
        case 'SIGNUP_SUCCESS':
            return {...state, isLoading: false, message: action.payload.message, signUpSuccess: true};
        case 'SIGNUP_FAILURE':
            return {...state, isLoading: false, message: action.message, signUpSuccess: false};
        case 'INITIATE_SIGNIN':
            return {...state, isLoading: true, message: null};
        case 'SIGNIN_SUCCESS':
            return {...state, isLoading: false, message: null, loggedIn : true};
        case 'SIGNIN_FAILURE':
            return {...state, isLoading: false, message: action.message};
        case 'RESET_PROFILE':
                return {...state, isLoading: false, message: null, profile: null};
        case 'INITIATE_GET_PROFILE':
            return {...state, isLoading: true, message: null};
        case 'GET_PROFILE_SUCCESS':
            return {...state, isLoading: false, message: null, profile: action.user, };
        case 'GET_PROFILE_FAILURE':
            return {...state, isLoading: false, message: action.message};
        case 'INITIATE_UPDATE_PROFILE':
            return {...state, isLoading: true, message: null};
        case 'UPDATE_PROFILE_SUCCESS':
            return {...state, isLoading: false, message: action.message};
        case 'UPDATE_PROFILE_FAILURE':
            return {...state, isLoading: false, message: action.message};
        default:
            return state
    }
}

export default reducer;
