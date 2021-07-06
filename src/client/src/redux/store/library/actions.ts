import {
    FETCHING_LIBRARY,
    DELETE_LIBRARY_ERROR,
    EXPORT_LIBRARY,
    LibraryActionTypes,
} from "./types";

export function searchLibrary(searchString: string): LibraryActionTypes {
    return {
        type: FETCHING_LIBRARY,
        payload: searchString,
    };
}

export function deleteLibraryError(key: string) {
    return {
        type: DELETE_LIBRARY_ERROR,
        payload: {
            key,
        },
    };
}

export function exportLibrary(fileName: string): LibraryActionTypes {
    return {
        type: EXPORT_LIBRARY,
        payload: {
            fileName: fileName,
            apiError: null
        },
    };
}

