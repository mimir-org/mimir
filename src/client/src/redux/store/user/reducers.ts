import {
    FETCHING_USER,
    FETCHING_USER_SUCCESS_OR_ERROR,
    DELETE_USER_ERROR,
    UserActionTypes,
    UserState,
} from "./types";

const initialState: UserState = {
    fetching: false,
    user: null,
    apiError: []
};

export function userReducer(
    state = initialState,
    action: UserActionTypes
): UserState {
    switch (action.type) {
        case FETCHING_USER:
            return {
                ...state,
                fetching: true,
                user: null,
                apiError: state.apiError ? state.apiError.filter((elem) => elem.key !== FETCHING_USER) : state.apiError
            };
        case FETCHING_USER_SUCCESS_OR_ERROR:
            return {
                ...state,
                fetching: false,
                user: action.payload.user,
                apiError: action.payload.apiError ? [...state.apiError, action.payload.apiError] : state.apiError
            };
        case DELETE_USER_ERROR:
            return {
                ...state,
                apiError: state.apiError ? state.apiError.filter((elem) => elem.key !== action.payload.key) : state.apiError
            }
        default:
            return state;
    }
}
