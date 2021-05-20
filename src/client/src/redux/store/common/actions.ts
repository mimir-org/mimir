import { CommonActionTypes, FETCHING_CONTRACTORS } from "./types";

export function getContractors(): CommonActionTypes {
    return {
        type: FETCHING_CONTRACTORS,
        payload: null,
    };
}
