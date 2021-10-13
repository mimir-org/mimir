import { SET_ELECTRO_VIEW, ElectroViewActionTypes } from "./types";

const initialState = {
  visible: false,
};

export function electroViewReducer(state = initialState, action: ElectroViewActionTypes) {
  if (action.type === SET_ELECTRO_VIEW) {
    return {
      ...state,
      visible: action.payload.visible,
    };
  } else return state;
}
