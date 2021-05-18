import { Connector } from "../../../models/project";
import { CHANGE_FLOW_VIEW, ADD_SELECTED_CONNECTOR } from "./types";

export function changeFlowView(view: string) {
  return {
    type: CHANGE_FLOW_VIEW,
    payload: {
      view,
    },
  };
}

export function addSelectedConnector(connector: Connector) {
  return {
    type: ADD_SELECTED_CONNECTOR,
    payload: {
      connector,
    },
  };
}
