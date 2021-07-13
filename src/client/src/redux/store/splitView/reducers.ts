import { SET_SPLITVIEW, SET_SPLIT_NODE } from "./types";

const initialState = {
  visible: false,
  node: null,
};

export function splitViewReducer(action, state = initialState) {
  switch (action.type) {
    case SET_SPLITVIEW:
      return {
        ...state,
        visible: action.payload.visible,
      };
    case SET_SPLIT_NODE:
      return {
        ...state,
        node: action.payload.node,
      };
    default:
      return state;
  }
}
