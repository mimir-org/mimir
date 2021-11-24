import { SetValidation, SET_VALIDATION } from "./types";

export function setValidation(valid: boolean, message: string): SetValidation {
  return {
    type: SET_VALIDATION,
    payload: {
      valid,
      message,
    },
  };
}
