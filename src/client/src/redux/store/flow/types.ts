import { ViewType } from "../../../models/project";
export const CHANGE_FLOW_VIEW = "CHANGE_FLOW_VIEW";

export interface ChangeFlowView {
  type: typeof CHANGE_FLOW_VIEW;
  payload: {
    view: ViewType;
  };
}

export type FlowActionTypes = ChangeFlowView;
