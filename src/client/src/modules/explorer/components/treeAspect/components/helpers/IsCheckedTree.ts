import { Node as FlowNode } from "react-flow-renderer";
import { Node } from "../../../../../../models";

export const IsNodeInTreeExplorerChecked = (node: Node, selectedNodes: FlowNode[]) => {
  return selectedNodes && selectedNodes.some((n) => n.id === node.id);
};
