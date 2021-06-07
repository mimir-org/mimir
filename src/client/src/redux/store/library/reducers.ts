import {
    FETCHING_LIBRARY,
    FETCHING_LIBRARY_SUCCESS_OR_ERROR,
    DELETE_LIBRARY_ERROR,
    LibraryActionTypes,
    LibraryState,
} from "./types";

const initialState: LibraryState = {
    fetching: false,
    nodes: [],
    apiError: []
};

export function libraryReducer(
    state = initialState,
    action: LibraryActionTypes
): LibraryState {
    switch (action.type) {
        case FETCHING_LIBRARY:
            return {
                ...state,
                fetching: true,
                nodes: [],
                apiError: state.apiError ? state.apiError.filter((elem) => elem.key !== FETCHING_LIBRARY) : state.apiError
            };
        case FETCHING_LIBRARY_SUCCESS_OR_ERROR:
            return {
                ...state,
                fetching: false,
                nodes: action.payload.nodes,
                apiError: action.payload.apiError ? [...state.apiError, action.payload.apiError] : state.apiError
            };

        case DELETE_LIBRARY_ERROR:
            return {
                ...state,
                apiError: state.apiError ? state.apiError.filter((elem) => elem.key !== action.payload.key) : state.apiError
            }
        default:
            return state;
    }
}
