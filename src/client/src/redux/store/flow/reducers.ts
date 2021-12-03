import { CHANGE_FLOW_VIEW, FlowActionTypes, FlowState } from "./types";
import { ViewType, VIEW_TYPE } from "../../../models/project";

const initialState: FlowState = {
  view: VIEW_TYPE.STARTPAGE as ViewType,
};

export function flowReducer(state = initialState, action: FlowActionTypes): FlowState {
  if (action.type === CHANGE_FLOW_VIEW) {
    return {
      ...state,
      view: action.payload.view,
    };
  }
  return state;
}
