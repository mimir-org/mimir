import {
    FETCHING_PROJECT,
    FETCHING_PROJECT_SUCCESS_OR_ERROR,
    CREATING_PROJECT,
    CREATING_PROJECT_SUCCESS_OR_ERROR,
    ADD_NODE,
    ProjectActionTypes,
    ProjectState
} from "./types";

const initialState: ProjectState = {
    fetching: false,
    creating: false,
    project: null,
    hasError: false,
    errorMsg: null
};

export function projectReducer(
    state = initialState,
    action: ProjectActionTypes
) {
    switch (action.type) {
        case FETCHING_PROJECT:
            return {
                ...state,
                fetching: true,
                creating: false,
                project: null,
                hasError: false,
                errorMsg: null,
            };
        case FETCHING_PROJECT_SUCCESS_OR_ERROR:
            return {
                ...state,
                fetching: action.payload.fetching,
                creating: action.payload.creating,
                project: action.payload.project,
                hasError: action.payload.hasError,
                errorMsg: action.payload.errorMsg,
            };
        case CREATING_PROJECT:
            return {
                ...state,
                fetching: false,
                creating: true,
                project: null,
                hasError: false,
                errorMsg: null,
            };
        case CREATING_PROJECT_SUCCESS_OR_ERROR:
            return {
                ...state,
                fetching: action.payload.fetching,
                creating: action.payload.creating,
                project: action.payload.project,
                hasError: action.payload.hasError,
                errorMsg: action.payload.errorMsg,
            };
        case ADD_NODE:
            console.log(action.payload);
            return state;

        default:
            return state;
    }
}
