import { Connector } from "../../../models/project";

export const CHANGE_FLOW_VIEW = "CHANGE_FLOW_VIEW";
export const ADD_SELECTED_CONNECTOR = "ADD_SELECTED_CONNECTOR";

export interface ChangeFlowView {
  type: typeof CHANGE_FLOW_VIEW;
  payload: {
    key: string;
    visible: boolean;
  };
}

export interface AddSelectedConnector {
  type: typeof ADD_SELECTED_CONNECTOR;
  payload: {
    connector: Connector;
  };
}
