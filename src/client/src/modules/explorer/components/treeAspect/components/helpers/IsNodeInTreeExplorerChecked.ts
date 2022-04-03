import { Node as FlowNode } from "react-flow-renderer";

export const IsNodeInTreeExplorerChecked = (nodeId: string, selectedNodes: FlowNode[]) => {
  return selectedNodes?.some((n) => n.id === nodeId);
};
