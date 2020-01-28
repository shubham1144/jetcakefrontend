function reducer(state = {
    isLoading: false
}, action) {
    switch (action.type) {
        case 'INITIATE_SIGNUP':
            return {...state, isLoading: true, message: null};
        case 'SIGNUP_SUCCESS':
            return {...state, isLoading: false, message: null};
        case 'SIGNUP_FAILURE':
            return {...state, isLoading: false, message: action.message};
        default:
            return state
    }
}

export default reducer;
