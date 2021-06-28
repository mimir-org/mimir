import {
    CommonActionTypes,
    CommonState,
    FETCHING_CONTRACTORS,
    FETCHING_CONTRACTORS_SUCCESS_OR_ERROR,
    DELETE_COMMON_ERROR,
    FETCHING_STATUSES,
    FETCHING_STATUSES_SUCCESS_OR_ERROR
} from "./types";

const initialState: CommonState = {
    fetching: false,
    contractors: [],
    statuses: [],
    apiError: [],
};

export function commonReducer(state = initialState, action: CommonActionTypes) {
    switch (action.type) {
        case FETCHING_CONTRACTORS:
            return {
                ...state,
                fetching: true,
                contractors: [],
                apiError: state.apiError
                    ? state.apiError.filter((elem) => elem.key !== FETCHING_CONTRACTORS)
                    : state.apiError,
            };

        case FETCHING_CONTRACTORS_SUCCESS_OR_ERROR:
            return {
                ...state,
                fetching: false,
                contractors: action.payload.contractors,
                apiError: action.payload.apiError
                    ? [...state.apiError, action.payload.apiError]
                    : state.apiError,
            };

        case FETCHING_STATUSES:
            return {
                ...state,
                fetching: true,
                statuses: [],
                apiError: state.apiError
                    ? state.apiError.filter((elem) => elem.key !== FETCHING_STATUSES)
                    : state.apiError,
            };

        case FETCHING_STATUSES_SUCCESS_OR_ERROR:
            return {
                ...state,
                fetching: false,
                statuses: action.payload.statuses,
                apiError: action.payload.apiError
                    ? [...state.apiError, action.payload.apiError]
                    : state.apiError,
            };

        case DELETE_COMMON_ERROR:
            return {
                ...state,
                apiError: state.apiError
                    ? state.apiError.filter((elem) => elem.key !== action.payload.key)
                    : state.apiError,
            };
        default:
            return state;
    }
}
