import { UPDATE_BLOCK_ELEMENTS } from "./types";

const initialState = {
  elements: null,
};

export function blockElementsReducer(state = initialState, action) {
  if (action.type === UPDATE_BLOCK_ELEMENTS) {
    return {
      ...state,
      elements: action.payload,
    };
  }
  return state;
}
