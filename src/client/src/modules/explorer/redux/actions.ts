import { Node as FlowNode } from "react-flow-renderer";
import { UPDATE_BLOCK_NODES } from "./types";

export function updateBlockNodes(nodes: FlowNode[]) {
  return {
    type: UPDATE_BLOCK_NODES,
    payload: nodes,
  };
}
