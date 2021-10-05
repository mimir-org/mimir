import { CHANGE_INSPECTOR_HEIGHT, InspectorHeightActionTypes } from "./types";
import { Size } from "../../../../compLibrary";

const initialState = {
  height: Size.ModuleOpen,
};

export const inspectorHeightReducer = (state = initialState, action: InspectorHeightActionTypes) => {
  if (action.type === CHANGE_INSPECTOR_HEIGHT) {
    return {
      ...state,
      height: action.payload.height,
    };
  }
  return state;
};

export default inspectorHeightReducer;
