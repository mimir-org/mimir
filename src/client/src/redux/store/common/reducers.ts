import { CommonActionTypes, CommonState, FETCHING_CONTRACTORS, FETCHING_CONTRACTORS_SUCCESS_OR_ERROR } from "./types";

const initialState: CommonState = {
    fetching: false,
    hasError: false,
    errorMsg: null,
    contractors: []
};

export function commonReducer(
    state = initialState,
    action: CommonActionTypes
) {
    switch (action.type) {
        case FETCHING_CONTRACTORS:
            return {
                ...state,
                fetching: true,
                hasError: false,
                errorMsg: null,
                contractors: []
            };

        case FETCHING_CONTRACTORS_SUCCESS_OR_ERROR:
            return {
                ...state,
                fetching: false,
                hasError: action.payload.hasError,
                errorMsg: action.payload.errorMsg,
                contractors: action.payload.contractors
            };
        default:
            return state;
    }
}
