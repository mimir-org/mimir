export const SET_VALIDATION = "SET_VALIDATION";

export interface SetValidation {
  type: typeof SET_VALIDATION;
  payload: {
    valid: boolean;
    message: string;
  };
}

export type ValidationActionTypes = SetValidation;
