import { CHANGE_FLOW_VIEW, FlowActionTypes } from "./types";
import { VIEW_TYPE } from "../../../models/project";

const initialState = {
  view: VIEW_TYPE.TREEVIEW,
};

export function flowReducer(state = initialState, action: FlowActionTypes) {
  if (action.type === CHANGE_FLOW_VIEW) {
    return {
      ...state,
      view: action.payload.view,
    };
  }
  return state;
}
