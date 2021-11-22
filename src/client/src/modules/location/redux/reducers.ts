import { Location3DActionTypes, SET_LOCATION_3D } from "./types";

const initialState = {
  active: false,
};

export function location3DReducer(state = initialState, action: Location3DActionTypes) {
  if (action.type === SET_LOCATION_3D) {
    return {
      ...state,
      active: action.payload.active,
    };
  }
  return state;
}
