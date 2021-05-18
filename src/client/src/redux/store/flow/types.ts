import { Connector, ViewType } from "../../../models/project";
export const CHANGE_FLOW_VIEW = "CHANGE_FLOW_VIEW";
export const ADD_SELECTED_CONNECTOR = "ADD_SELECTED_CONNECTOR";

export interface ChangeFlowView {
  type: typeof CHANGE_FLOW_VIEW;
  payload: {
    view: ViewType;
  };
}

export interface AddSelectedConnector {
  type: typeof ADD_SELECTED_CONNECTOR;
  payload: {
    connector: Connector;
  };
}
