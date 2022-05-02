import { Node as FlowNode } from "react-flow-renderer";

export const IsNodeInTreeExplorerChecked = (nodeId: string, selectedFlowNodes: FlowNode[]) => {
  return selectedFlowNodes?.some((n) => n.id === nodeId);
};
