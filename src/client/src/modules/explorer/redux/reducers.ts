import { Node as FlowNode } from "react-flow-renderer";
import { UPDATE_BLOCK_NODES } from "./types";

const initialState = {
  nodes: null,
};

export function blockNodesReducer(state = initialState, action) {
  if (action.type === UPDATE_BLOCK_NODES) {
    const flowNodes = action.payload as FlowNode[];

    return {
      ...state,
      flowNodes,
    };
  }
  return state;
}
