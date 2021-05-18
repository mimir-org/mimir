import { Connector } from "../../../models/project";
import { CHANGE_FLOW_VIEW, ADD_SELECTED_CONNECTOR } from "./types";

export function changeFlowView(key: string, visible: boolean) {
  return {
    type: CHANGE_FLOW_VIEW,
    payload: {
      key,
      visible,
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
