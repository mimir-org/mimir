import { LoadState } from "../localStorage/localStorage";
import { CHANGE_MODULE_VISIBILITY } from "./types";

const initialState = {
  type: [
    {
      type: "inspector",
      visible: LoadState("inspector"),
    },
    {
      type: "library",
      visible: LoadState("library"),
    },
    {
      type: "explorer",
      visible: LoadState("explorer"),
    },
  ],
};

export function moduleReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_MODULE_VISIBILITY:
      return {
        ...state,
        type: state.type.map((x, i) =>
          state.type[i].type === action.payload.key
            ? { ...x, visible: action.payload.visible }
            : { ...x }
        ),
      };
    default:
      return state;
  }
}
