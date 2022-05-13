import { SET_SECONDARY_NODE, REMOVE_SECONDARY_NODE, SecondaryActionTypes } from "./types";

const initialState = { node: null };

export function secondaryReducer(state = initialState, action: SecondaryActionTypes) {
  if (action.type === SET_SECONDARY_NODE) return { ...state, node: action.payload.node };
  if (action.type === REMOVE_SECONDARY_NODE) return { ...state, node: null };
  return state;
}
