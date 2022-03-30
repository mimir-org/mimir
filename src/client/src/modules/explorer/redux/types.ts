import { Node as FlowNode } from "react-flow-renderer";

export const UPDATE_BLOCK_NODES = "UPDATE_BLOCK_NODES";

export interface UpdateBlockNodes {
  type: typeof UPDATE_BLOCK_NODES;
  payload: {
    nodes: FlowNode[];
  };
}
