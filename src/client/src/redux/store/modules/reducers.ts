import { MODULE_TYPE } from "../../../models/project";
import { LoadState } from "../localStorage/localStorage";
import {
  CHANGE_MODULE_VISIBILITY,
  CHANGE_ALL_MODULES_VISIBILITY,
} from "./types";

const initialState = {
  types: [
    {
      type: MODULE_TYPE.INSPECTOR,
      visible: LoadState(MODULE_TYPE.INSPECTOR),
      animate: false,
    },
    {
      type: MODULE_TYPE.LIBRARY,
      visible: LoadState(MODULE_TYPE.LIBRARY),
      animate: false,
    },
    {
      type: MODULE_TYPE.EXPLORER,
      visible: LoadState(MODULE_TYPE.EXPLORER),
      animate: false,
    },
  ],
};

export function moduleReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_MODULE_VISIBILITY:
      return {
        ...state,
        types: state.types.map((x, i) =>
          state.types[i].type === action.payload.key
            ? {
                ...x,
                visible: action.payload.visible,
                animate: action.payload.animate,
              }
            : { ...x }
        ),
      };
    case CHANGE_ALL_MODULES_VISIBILITY:
      return {
        ...state,
        types: state.types.map(
          (x, i) =>
            state && {
              ...x,
              visible: action.payload.visible,
              animate: action.payload.animate,
            }
        ),
      };
    default:
      return state;
  }
}
