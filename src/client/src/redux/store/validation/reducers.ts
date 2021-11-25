import { SET_VALIDATION, ValidationActionTypes } from "./types";

const initialState = {
  valid: true,
  message: "",
};

export function validationReducer(state = initialState, action: ValidationActionTypes) {
  if (action.type === SET_VALIDATION) {
    return {
      ...state,
      valid: action.payload.valid,
      message: action.payload.message,
    };
  }
  return state;
}
