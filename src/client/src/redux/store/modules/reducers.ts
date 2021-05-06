import { MODULE_TYPE } from "../../../models/project";
import { LoadState } from "../localStorage/localStorage";
import { CHANGE_MODULE_VISIBILITY } from "./types";

const initialState = {
  type: [
    {
      type: MODULE_TYPE.INSPECTOR,
      visible: LoadState(MODULE_TYPE.INSPECTOR),
    },
    {
      type: MODULE_TYPE.LIBRARY,
      visible: LoadState(MODULE_TYPE.LIBRARY),
    },
    {
      type: MODULE_TYPE.EXPLORER,
      visible: LoadState(MODULE_TYPE.EXPLORER),
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
