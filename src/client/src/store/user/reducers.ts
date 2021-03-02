import { FETCHING_USER, FETCHING_USER_SUCCESS_OR_ERROR, UserActionTypes, UserState } from './types';

const initialState: UserState = {
    fetching: false,
    user: null,
    hasError: false,
    errorMsg: null    
}

export function userReducer(state = initialState, action: UserActionTypes) : UserState {
    switch (action.type) {
        case FETCHING_USER:
            return { ...state, fetching: true, user: null, hasError: false, errorMsg: null };
        case FETCHING_USER_SUCCESS_OR_ERROR:
            return { ...state, fetching: action.payload.fetching, user: action.payload.user, hasError: action.payload.hasError, errorMsg: action.payload.errorMsg };
            
        default:
            return state;
    }
}