import { LoadState } from "../localStorage/localStorage";
import { CHANGE_SPLITVIEW, SET_SPLITVIEW_NODE } from "./types";

const initialState = {
  visible: LoadState("splitview"),
  node: null,
};

export function splitViewReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_SPLITVIEW:
      return {
        ...state,
        visible: action.payload.visible,
      };
    case SET_SPLITVIEW_NODE:
      return {
        ...state,
        node: action.payload.node,
      };
    default:
      return state;
  }
}
