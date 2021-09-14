import { SELECT_ENTITY_PARAMETER, ParametersActionTypes } from "./types";

const initialState = {
  selectedParameter: null,
};

export const parametersReducer = (
  state = initialState,
  action: ParametersActionTypes
) => {
  if (action.type === SELECT_ENTITY_PARAMETER) {
    return {
      ...state,
      selectedParameter: action.payload,
    };
  }
  return state;
};

export default parametersReducer;
