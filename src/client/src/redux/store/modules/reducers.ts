import { MODULE_TYPE } from "../../../models/project";
import {
  SET_MODULE_VISIBILITY,
  SET_MODULES_VISIBILITY,
  ModuleVisibilityActionTypes,
} from "./types";

const initialState = {
  types: [
    {
      type: MODULE_TYPE.INSPECTOR,
      visible: false,
      animate: false,
    },
    {
      type: MODULE_TYPE.LIBRARY,
      visible: false,
      animate: false,
    },
    {
      type: MODULE_TYPE.EXPLORER,
      visible: false,
      animate: false,
    },
    {
      type: MODULE_TYPE.LEGEND,
      visible: false,
      animate: false,
    },
  ],
};

export function moduleReducer(state = initialState, action: ModuleVisibilityActionTypes) {
  switch (action.type) {
    case SET_MODULE_VISIBILITY:
      return {
        ...state,
        types: state.types.map((x) =>
          x.type === action.payload.key
            ? {
                ...x,
                visible: action.payload.visible,
                animate: action.payload.animate,
              }
            : { ...x }
        ),
      };
    case SET_MODULES_VISIBILITY:
      return {
        ...state,
        types: state.types.map(
          (type) =>
            state && {
              ...type,
              visible: action.payload.visible,
              animate: action.payload.animate,
            }
        ),
      };
    default:
      return state;
  }
}
