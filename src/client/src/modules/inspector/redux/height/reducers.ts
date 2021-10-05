import { CHANGE_INSPECTOR_HEIGHT, InspectorHeightActionTypes } from "./types";

const initialState = {
  height: undefined,
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
