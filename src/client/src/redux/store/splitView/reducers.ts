import { LoadState } from "../localStorage/localStorage";
import { CHANGE_SPLITVIEW } from "./types";

const initialState = {
  visible: LoadState("splitview"),
};

export function splitViewReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_SPLITVIEW:
      return {
        ...state,
        visible: action.payload.visible,
      };
    default:
      return state;
  }
}
