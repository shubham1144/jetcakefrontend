function reducer(state = {
    isLoading: false,
    loggedIn: false
}, action) {
    switch (action.type) {
        case 'INITIATE_SIGNUP':
            return {...state, isLoading: true, message: null};
        case 'SIGNUP_SUCCESS':
            return {...state, isLoading: false, message: null};
        case 'SIGNUP_FAILURE':
            return {...state, isLoading: false, message: action.message};
        case 'INITIATE_SIGNIN':
            return {...state, isLoading: true, message: null};
        case 'SIGNIN_SUCCESS':
            return {...state, isLoading: false, message: null, loggedIn : true};
        case 'SIGNIN_FAILURE':
            return {...state, isLoading: false, message: action.message};
        default:
            return state
    }
}

export default reducer;
