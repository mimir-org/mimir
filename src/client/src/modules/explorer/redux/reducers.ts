import { Elements } from "react-flow-renderer";
import { UPDATE_BLOCK_ELEMENTS } from "./types";

const initialState = {
  elements: null,
};

export function blockElementsReducer(state = initialState, action) {
  if (action.type === UPDATE_BLOCK_ELEMENTS) {
    const elements = action.payload as Elements<any>;

    return {
      ...state,
      elements: elements,
    };
  }
  return state;
}
