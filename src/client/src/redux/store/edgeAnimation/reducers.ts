import { SET_EDGE_ANIMATION } from "../project/types";

const initialState = {
  animated: true,
};

export function edgeAnimationReducer(state = initialState, action) {
  if (action.type === SET_EDGE_ANIMATION) {
    return {
      ...state,
      animated: action.payload.animated,
    };
  }
  return state;
}
